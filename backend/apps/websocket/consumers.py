import json
import environ
from channels.generic.websocket import WebsocketConsumer
import redis
from cassandra.cluster import Cluster	
from cassandra.auth import PlainTextAuthProvider
from cassandra.query import ordered_dict_factory



env = environ.Env(DEBUG=(bool, False))

class WSLiveConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        rds = redis.StrictRedis(env('REDIS_HOST'),port=6379,db=1)
        count = 0
        for i in rds.keys():
            data = rds.get(i)
            data = data.decode('utf-8')
            data = json.loads(data)
            self.send(json.dumps({'message':data}))
    
    def disconnect(self, close_code):
        print('disconnect')

class AlarmsConsumer(WebsocketConsumer):
    def connect(self):
        self.accept()
        print('CONNECT')

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
                    


class WSConsumerBackfill(WebsocketConsumer):
	def connect(self):
		self.accept()
		from cassandra.cluster import Cluster	
		from cassandra.auth import PlainTextAuthProvider
		from cassandra.query import ordered_dict_factory


		auth_provider = PlainTextAuthProvider(username ='cassandra', password='cassandra')
		cluster=Cluster(['cassandra'], auth_provider=auth_provider)
		session = cluster.connect('backfilldata')
		session.row_factory = ordered_dict_factory
	
		rows = session.execute('SELECT * FROM backfilldata')
		for row in rows:
			self.send(json.dumps({'message':row}))

	def disconnect(self,close_code):
           print('DİSCONNECT')