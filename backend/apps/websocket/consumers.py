import threading 
import json
import environ
from channels.generic.websocket import WebsocketConsumer
import redis
from pymongo import MongoClient
import time
from threading import Thread
from apps.tags.models import tags
from apps.tags.serializers import TagsFieldsSerializer

env = environ.Env(DEBUG=(bool, False))

def retrieve_data(self,start='-',end='+',tag_id=""):
    tag = tags.objects.filter(ROW_ID = tag_id)  
    if tag:
        serializer = TagsFieldsSerializer(tag,many = True).data[0]
        while self.is_active:
            # data = self.rds.ts().mrange(start,end,['tag_name=' +"(Частота турб вращения)"],with_labels = True)
            data = self.rds.ts().mrange(start,end,['tag_name=' +str(serializer.get("NAME"))],with_labels = True)
            filtered_data = []
            max_values = []
            for d in data:
                key = list(d.keys())[0]
                labels, values = d[key]
                if not values:
                    continue
                for item in values:
                    max_values.append(item[0])
                filtered_data.append({key: [labels, values]})

            for items in filtered_data:
                if start == "-":
                    self.send(json.dumps(items,ensure_ascii=False))
                else:
                    key = list(items.keys())[0]
                    labels, values = items[key]
                    for item in values:
                        self.send(json.dumps({key: [labels, values]},ensure_ascii=False))
            
            if max_values:
                start = (max(max_values))+1
                # print(start)
            # print("after sleep ---------->", filtered_data,'  /// start time -----------> ',start)
            time.sleep(5)
    else:
        raise BaseException('error')

class WSLiveConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        try:
            self.rds = redis.StrictRedis('redis-test1',port=6379)
            self.tag_id = self.scope['url_route']['kwargs']['tag_id']
            # (if, else block) written to test that active data is received, will be deleted
            if self.tag_id.split('*')[0] == "add_data":
                columns ={'version': '1', 'id': '2', 'created_by': 'some_device-IMX18ID#1', 'createdtime': '2023-01-20 13:19:27.758', 'message_type': 'live_data', 'fqn': 'Ligeia-Inkai.Sattelite-1.pump 151/1.temperature', 'timestamp': '2025-01-23 01:01:01', 'quality': '66', 'value': '285.14', 'tag_name': 'Tag 1', 'type_value': 'temperature'}
                value = 90
                timestamp = self.tag_id.split('*')[1]
                key = "temperature:20"
                self.rds.ts().add(key, timestamp, value, labels=columns)
                
            else:
                self.is_active = True
                self.thread = threading.Thread(target=retrieve_data,kwargs={"self":self,"tag_id":self.tag_id})
                self.thread.start()

        except Exception as e:
            print(e)

    
    def receive(self, text_data):
        try:
            #I delete the previous thread in every message because filtering the old data while new data is coming in may break the order
            self.is_active = False
            self.thread.join()
            del self.thread
            self.is_active = True
            self.thread = threading.Thread(target=retrieve_data,kwargs={"self":self,"tag_id":self.tag_id,"start":text_data.split(',')[0],"end":text_data.split(',')[1]})
            self.thread.start()
        except Exception as e:
            raise BaseException(e)
                    
    
    def disconnect(self, close_code):
        try:
            self.is_active = False
            self.thread.join()
            self.rds.connection_pool.disconnect()
            del self.thread
            print('disconnect',close_code)
        except BaseException as e:
            print(e)

class AlarmsConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        rds = redis.StrictRedis(env('REDIS_HOST'),port=6379,db=2)
        for i in rds.keys():
            data = rds.get(i)
            data = data.decode('utf-8')
            data = json.loads(data)
            if data.get('LOG_TYPE') == 'ALARMS':
                print(data)
                 # item LAYER match tag_naame
                self.send(json.dumps({'message':data}))

    def disconnect(self, close_code):
        print('disconnect')

    def receive(self, text_data):
        rds = redis.StrictRedis(env('REDIS_HOST'),port=6379,db=2)
        for i in rds.keys():
            data = rds.get(i)
            data = data.decode('utf-8')
            data = json.loads(data)
            if data.get('LOG_TYPE') == 'ALARMS':
                if data.get('CONTENTS').get('quality') > int(text_data): # item LAYER match tag_naame
                    self.send(json.dumps({'message':data.get('CONTENTS')}))
                    


# class WSConsumerBackfill(WebsocketConsumer):
# 	def connect(self):
# 		self.accept()
# 		auth_provider = PlainTextAuthProvider(username ='cassandra', password='cassandra')
# 		cluster=Cluster(['cassandra'], auth_provider=auth_provider)
# 		session = cluster.connect('backfilldata')
# 		session.row_factory = ordered_dict_factory
	
# 		rows = session.execute('SELECT * FROM backfilldata')
# 		for row in rows:
# 			self.send(json.dumps({'message':row}))
    
# 	def disconnect(self,close_code):
#            print('DİSCONNECT')
        
#     def receive(self, text_data):
#         print('data')
def retrieve_last_data(self,tag_id):
    tag = tags.objects.filter(ROW_ID = tag_id)    
    if tag:
        serializer = TagsFieldsSerializer(tag,many = True).data[0]
        old_data = ""
        while self.is_activeLastData:
            data = self.rds.ts().mget(['tag_name='+str(serializer.get("NAME"))], with_labels=True, latest=False)
            if data != old_data:
                self.send(json.dumps(data[0]))
                old_data = data
    else:
        raise BaseException('error')

class WSConsumeOnlyLastData(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.is_activeLastData=True
        self.rds = redis.StrictRedis('redis-test',port=6379)
        self.tag_id = self.scope['url_route']['kwargs']['tag_id']
        self.thread = threading.Thread(target=retrieve_last_data,kwargs={"self":self,"tag_id":self.tag_id})
        self.thread.start()
                    
    
    def disconnect(self, close_code):
        try:
            self.is_activeLastData = False
            self.thread.join()
            self.rds.connection_pool.disconnect()
            del self.thread
            print('disconnect',close_code)
        except BaseException as e:
            print(e)





class WSConsumerBackfill(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
        self.mongo_db = self.client["backfilldata"]
        self.timeseries_collection = self.mongo_db["backfilldata"]
        self.tag_id = self.scope['url_route']['kwargs']['tag_id']
        tag = tags.objects.filter(ROW_ID = self.tag_id)  
        if tag:
            self.serializer = TagsFieldsSerializer(tag,many = True).data[0]
            data = self.timeseries_collection.find({
                        "tag_name":self.serializer.get('NAME')
                        })
            for x in data:
                x.pop('_id')
                self.send(json.dumps(x,ensure_ascii=False))
    
    def receive(self, text_data):
        data = self.timeseries_collection.find({
                '$and': [
                    {"tag_name": self.serializer.get('NAME')},
                    {"timestamp": {"$gte": str(text_data).split(',')[0]}},
                    {"timestamp": {"$lte": str(text_data).split(',')[1]}}
                ]
            })
            
        for x in data:
            x.pop('_id')
            self.send(json.dumps(x,ensure_ascii=False))
                    
    
    def disconnect(self, close_code):
        self.client.close()
        print('disconnect')