import requests
import json
import os
from helper import send_alarm
from kafka import KafkaProducer

IP_ADRESS = os.environ["ALLOWED_HOSTS"]
AIRFLOW_PORT = 8080


def check_airflow_health():
    try:
        response = requests.get("http://" + IP_ADRESS + ":8080/health")
        healt_status = json.loads(response.text)
        if healt_status["metadatabase"]["status"] == "healthy":
            print("AirFlow health check succeeded")
    except Exception as e:
        error_message = f"AirFlow health check failed: {e}"
        send_alarm(error_message, "AirFlow")


check_airflow_health()
