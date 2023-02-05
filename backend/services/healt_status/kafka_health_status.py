from kafka import KafkaConsumer
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

host = os.environ.get("Kafka_Host_DP")

try:
    consumer = KafkaConsumer(
        bootstrap_servers=host,
        enable_auto_commit=False,
        auto_offset_reset="earliest",
    )
    consumer.topics()
    print("ok")
except Exception as e:
    error_message = f"Kafka health check failed: {e}"
    data = {
        "LOG_TYPE": "Alarm",
        "date": created_time,
        "layer_name": "KNOC",
        "error_message": error_message,
        "container": "Apache-kafka",
    }
    producer.send("alarms", value=data)
    producer.flush()
