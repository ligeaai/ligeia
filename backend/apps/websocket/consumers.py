import threading 
import json
import environ
from channels.generic.websocket import WebsocketConsumer
import redis
from cassandra.cluster import Cluster	
from cassandra.auth import PlainTextAuthProvider
from cassandra.query import ordered_dict_factory
import time
from cassandra.cluster import Cluster	
from cassandra.auth import PlainTextAuthProvider
from cassandra.query import ordered_dict_factory
from multiprocessing import Process
from threading import Thread
from apps.tags.models import tags
from apps.tags.serializers import TagsFieldsSerializer

env = environ.Env(DEBUG=(bool, False))

def retrieve_data(self,start='-',end='+',tag_id=""):
    lastItem = ""
    tag = tags.objects.filter(ROW_ID = tag_id)    
    if tag:
        serializer = TagsFieldsSerializer(tag,many = True).data[0]
        while self.is_active:
            # data = self.rds.ts().mrange(start,end,['tag_name=' +"(KNOC.Temperature-1,Tag 1)"],with_labels = True)
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
                    self.send(json.dumps(items))
                else:
                    key = list(items.keys())[0]
                    labels, values = items[key]
                    for item in values:
                        self.send(json.dumps({key: [labels, values]}))
            
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
        # self.rds = redis.StrictRedis(env('REDIS_HOST'),port=6379,db=1)
        try:
            self.rds = redis.StrictRedis('redis-test',port=6379)
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
class WSConsumerBackfill(WebsocketConsumer):
    def connect(self):
        self.accept()
        auth_provider = PlainTextAuthProvider(username ='cassandra', password='cassandra')
        cluster=Cluster(['cassandra'], auth_provider=auth_provider)
        session = cluster.connect('backfilldata')
        session.row_factory = ordered_dict_factory
        self.rows = session.execute('SELECT * FROM backfilldata')
    
    def receive(self, text_data):
        print(self.rows[0])
        for row in self.rows:
            print(row)
            filterTagName(self,row,text_data)

                    
    
    def disconnect(self, close_code):
        print('disconnect')