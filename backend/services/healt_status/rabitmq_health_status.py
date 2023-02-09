import requests
import os
import json
from kafka import KafkaProducer
from datetime import datetime
from helper import send_alarm
base_url = os.environ.get("BASE_URL")


def HealthCheckForRabbitMQ():
    try:
        response = requests.get(
            base_url + ":15672/api/aliveness-test/%2F", auth=("guest", "guest")
        )
        if response.status_code == 200 and response.json()["status"] == "ok":
            print("RabbitMQ is up and running!")
        else:
            raise Exception(f"RabbitMQ health check failed: {response.status_code}")
    except Exception as e:
        error_message = f"RabbitMQ health check failed: {e}"
        send_alarm(error_message,"Rabbit-MQ")


# HELPER FUNC BW
# host = os.environ.get("Kafka_Host_DP")
# producer = KafkaProducer(
#     bootstrap_servers=host,
#     value_serializer=lambda v: json.dumps(v).encode("ascii"),
# )
# base_url = os.environ.get("BASE_URL")


# def HealthCheckForRabbitMQ():
#     try:
#         response = requests.get(
#             base_url + ":15672/api/aliveness-test/%2F", auth=("guest", "guest")
#         )
#         if response.status_code == 200 and response.json()["status"] == "ok":
#             print("RabbitMQ is up and running!")
#         else:
#             raise Exception(f"RabbitMQ health check failed: {response.status_code}")
#     except Exception as e:
#         error_message = f"RabbitMQ health check failed: {e}"
#         data = {
#             "LOG_TYPE": "Alarm",
#             "date": str(datetime.now()),
#             "layer_name": "KNOC",
#             "error_message": error_message,
#             "container": "Rabbit-MQ",
#         }
#         producer.send("alarms", value=data)
#         producer.flush()


# import requests
# import os
# import datetime
# from kafka import KafkaProducer
# import json

# host = os.environ.get("Kafka_Host_DP")
# producer = KafkaProducer(
#     bootstrap_servers=host,
#     value_serializer=lambda v: json.dumps(v).encode("ascii"),
# )
# base_url = os.environ.get("BASE_URL")
# created_time = datetime.datetime.now()

# try:
#     response = requests.get(
#         base_url + ":15672/api/aliveness-test/%2F", auth=("guest", "guest")
#     )
#     if response.status_code == 200 and response.json()["status"] == "ok":
#         print("ok")
#     else:
#         print(f"RabbitMQ health check failed:", response.status_code)
# except Exception as e:
#     error_message = f"RabbitMQ health check failed: {e}"
#     data = {
#         "LOG_TYPE": "Alarm",
#         "date": created_time,
#         "layer_name": "KNOC",
#         "error_message": error_message,
#         "container": "Rabbit-MQ",
#     }
#     producer.send("alarms", value=data)
#     producer.flush()
