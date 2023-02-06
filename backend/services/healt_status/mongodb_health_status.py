from pymongo import MongoClient
import os
import datetime
from kafka import KafkaProducer
import json

host = os.environ.get("Kafka_Host_DP")
created_time = datetime.datetime.now()

try:
    client = MongoClient("mongodb://root:admin@mongodb-timescale:27017/")
    db = client["test_database"]
    coll = db["test_collection"]
    count = coll.count_documents({})

    print("MongoDB health check: OK")

except Exception as e:
    error_message = f"Error: Could not connect to MongoDB: {e}"
    data = {
        "LOG_TYPE": "Alarm",
        "date": created_time,
        "layer_name": "KNOC",
        "error_message": error_message,
        "container": "Mongo-db",
    }

    producer = KafkaProducer(
        bootstrap_servers=host,
        value_serializer=lambda v: json.dumps(v).encode("ascii"),
    )
    producer.send("alarms", value=data)
    producer.flush()
    producer.close()