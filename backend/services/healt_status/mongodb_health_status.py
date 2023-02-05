from pymongo import MongoClient
import os
import datetime
from kafka import KafkaProducer
import json

host = os.environ.get("Kafka_Host_DP")
producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)
created_time = datetime.datetime.now()
try:
    client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
    # Connect to the database and count the number of documents in a collection
    db = client["test_database"]
    coll = db["test_collection"]
    count = coll.count_documents({})

    print("MongoDB health check: OK")

except Exception as e:
    error_message = ("Error: Could not connect to MongoDB:", str(e))
    data = {
        "LOG_TYPE": "Alarm",
        "date": created_time,
        "layer_name": "KNOC",
        "error_message": error_message,
        "container": "Mongo-db",
    }
    producer.send("alarms", value=data)
    producer.flush()
