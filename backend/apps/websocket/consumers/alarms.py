import json
import environ
from channels.generic.websocket import WebsocketConsumer
import redis

env = environ.Env(DEBUG=(bool, False))

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
                    

