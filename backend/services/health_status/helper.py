from kafka import KafkaProducer
import os
import json
import datetime

host = os.environ["Kafka_Host_DP"]
topic = os.environ["Kafka_Alarms_Topic"]
producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)


def send_alarm(
    alarms_type="Warrning",
    error_message="error_message",
    source="source",
    layer_name="KNOC",
):
    created_time = datetime.datetime.now()
    priority = {"Alarm": 1, "Warning": 2, "Info": 3}
    data = {
        "LOG_TYPE": alarms_type,
        "priority": priority.get(alarms_type),
        "date": str(created_time),
        "layer_name": layer_name,
        "error_message": error_message,
        "source": source,
    }
    producer.send(topic, value=data)
    producer.flush()
