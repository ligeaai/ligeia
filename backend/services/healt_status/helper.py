from kafka import KafkaProducer
import os
import json
import datetime
host = os.environ["Kafka_Host_DP"]
producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)

def send_alarm(error_message,container):
    created_time = datetime.datetime.now()
    data = {
        "LOG_TYPE": "Alarm",
        "date": str(created_time),
        "layer_name": "KNOC",
        "error_message": error_message,
        "container": container,
    }
    producer.send("alarms", value=data)
    producer.flush()

