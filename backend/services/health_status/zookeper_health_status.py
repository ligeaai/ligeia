import os
import datetime
import json
from kazoo.client import KazooClient
from kafka import KafkaProducer
from helper import send_alarm

host = os.environ["ZooKeeper_HOST"]
port = os.environ["ZooKeeper_PORT"]
zk_hosts = f"{host}:{port}"
zk_path = os.environ["ZooKeeper_PATH"]


def check_zk_health():
    try:
        with KazooClient(hosts=zk_hosts) as zk:
            zk.start()
            zk.ensure_path(zk_path)
    except Exception as e:
        error_message = f"ZooKeeper health check failed: {e}"
        send_alarm(error_message, "Zookeeper")
    else:
        print("ZooKeeper health check succeeded")


check_zk_health()


# host = os.environ.get("Kafka_Host_DP")
# producer = KafkaProducer(
#     bootstrap_servers=host,
#     value_serializer=lambda v: json.dumps(v).encode("ascii"),
# )
# created_time = datetime.datetime.now()

# try:
#     zk = KazooClient(hosts="zookeeper:2181")
#     zk.start()
#     zk.ensure_path("/")
#     zk.stop()
#     print("ok")
# except Exception as e:
#     error_message = f"ZooKeeper health check failed: {e}"
#     data = {
#         "LOG_TYPE": "Alarm",
#         "date": created_time,
#         "layer_name": "KNOC",
#         "error_message": error_message,
#         "container": "Zookeeper",
#     }
#     producer.send("alarms", value=data)
#     producer.flush()
