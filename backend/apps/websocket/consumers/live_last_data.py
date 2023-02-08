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


def retrieve_last_data(self,tag_id):
    tag = tags.objects.filter(TAG_ID = tag_id)
    if tag:
        serializer = TagsFieldsSerializer(tag,many = True).data[0]
        old_data = ""
        while self.is_activeLastData:
            data = self.rds.ts().mget(['tag_name='+str(serializer.get('NAME').split('.')[1]),"asset="+str(serializer.get('NAME').split('.')[0])], with_labels=True, latest=False)
            self.send(json.dumps(data[-1],ensure_ascii=False)) if data[-1] != old_data else old_data
            old_data = data[-1]
    else:
        raise BaseException('error')

class WSConsumeOnlyLastData(WebsocketConsumer):
    def connect(self):
        self.accept()
        self.is_activeLastData=True
        self.rds = redis.StrictRedis('redis-test1',port=6379,db=2)
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