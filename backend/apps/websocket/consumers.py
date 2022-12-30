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





class WSConsumerBackfill(WebsocketConsumer):
	def connect(self):
		self.accept()
		import environ
		import prometheus_client as prom
		import random
		import json
		import time
		from prometheus_client import start_http_server
		# Create a metric to track time spent and requests made.
		from cassandra.cluster import Cluster
		from cassandra.auth import PlainTextAuthProvider
		from cassandra.query import ordered_dict_factory

		env = environ.Env(DEBUG=(bool, False))
		cassandra_host = "34.70.46.54"
		cassandra_port = 9092

		counter = prom.Counter('python_my_counter', 'This is my counter')
		gauge = prom.Gauge('python_my_gauge', 'This is my gauge')
		histogram = prom.Histogram('python_my_histogram', 'This is my histogram')
		summary = prom.Summary('python_my_summary', 'This is my summary')

		auth_provider = PlainTextAuthProvider(username ='cassandra', password='cassandra')
		cluster=Cluster(['cassandra'], auth_provider=auth_provider)

		session = cluster.connect('backfilldata')
		session.row_factory = ordered_dict_factory
		rows = session.execute('SELECT * FROM backfilldata')
		for row in rows:
			data = json.dumps(row)
			self.send(json.dumps({'message':data}))