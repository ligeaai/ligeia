from pymongo import MongoClient
from kafka import KafkaConsumer
import json

topic = "backfill_data"
consumer = KafkaConsumer(topic, bootstrap_servers="broker:29092")

client = MongoClient("mongodb://root:admin@34.125.121.93:27017/")
mongo_db = client["backfilldata"]
timeseries_collection = mongo_db["backfilldata"]

for message in consumer:
    data = message.value.decode("utf-8")
    json_data = json.loads(data)
    timeseries_collection.insert_one(json_data)
