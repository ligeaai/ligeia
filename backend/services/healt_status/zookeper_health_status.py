from kazoo.client import KazooClient
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
    zk = KazooClient(hosts="zookeeper:2181")
    zk.start()
    zk.ensure_path("/")
    zk.stop()
    print("ok")
except Exception as e:
    error_message = f"ZooKeeper health check failed: {e}"
    data = {
        "LOG_TYPE": "Alarm",
        "date": created_time,
        "layer_name": "KNOC",
        "error_message": error_message,
        "container": "Zookeeper",
    }
    producer.send("alarms", value=data)
    producer.flush()
