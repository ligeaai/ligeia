import json
from time import sleep
from channels.generic.websocket import WebsocketConsumer
import redis
import environ
env = environ.Env(DEBUG=(bool, False))


class WSConsumer(WebsocketConsumer):
	def connect(self):
		self.accept()
		rds = redis.StrictRedis(env('REDIS_HOST'),port=6379,db=1)
		count = 0
		for i in rds.keys():
			data = rds.get(i)
			data = data.decode('utf-8')
			data = json.loads(data)
			self.send(json.dumps({'message':data}))