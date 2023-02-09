from pymongo import MongoClient
from kafka import KafkaConsumer
from ast import literal_eval
import json
import time as timelibrary
import datetime
import os 

topic = "alarms"
host = os.environ.get("Kafka_Host_DP")
consumer = KafkaConsumer(topic, bootstrap_servers=host)

client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
mongo_db = client["alarms"]
timeseries_collection = mongo_db["alarms"]

def convert_to_time(time):
    date_format = "%Y-%m-%d %H:%M:%S.%f"
    date_obj = datetime.datetime.strptime(time, date_format)
    timestamp = int(date_obj.timestamp())
    return timestamp


for message in consumer:
    df = message.value.decode('utf-8')
    data = json.loads(df)
    time_for_mongo = convert_to_time(data['date'])
    timestamp = str(time_for_mongo)
    data["timestamp"] = timestamp
    timeseries_collection.insert_one(data)

