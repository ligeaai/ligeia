import requests
import os
import datetime
from kafka import KafkaProducer
import json

host = os.environ.get("Kafka_Host_DP")
producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)

base_url = os.environ.get("BASE_URL")
url = base_url + ":8000/api/v1/health"
created_time = datetime.datetime.now()
try:
    response = requests.get(url)
    if response.status_code == 200:
        print("Django health check: OK")
    else:
        print("Django health check failed: HTTP {}".format(response.status_code))

except Exception as e:
    error_message = "Error: Could not connect to Django:", str(e)
    data = {
        "LOG_TYPE": "Alarm",
        "date": created_time,
        "layer_name": "KNOC",
        "error_message": error_message,
        "container": "Django",
    }
    producer.send("alarms", value=data)
    producer.flush()
