from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from pprint import pprint
import os
import pandas as pd
from ast import literal_eval
import json

host = "localhost:9092"
topic = "backorlive"
consumer = KafkaConsumer(
    group_id=topic,
    bootstrap_servers=host,
    enable_auto_commit=False,
    auto_offset_reset="earliest",
)

producer = KafkaProducer(
    bootstrap_servers="localhost:9092",
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)

tp = TopicPartition(topic, 0)
consumer.assign([tp])
consumer.poll()
consumer.seek_to_end()


def checkBackData(message_type, time_difference):
    if time_difference > 5:
        print("Incoming data is backfill data")
        message_type = "backfill_data"
        key1 = str.encode(data["id"])
        try:
            del data["DiffInHours"]
            producer.send("backfill_data", value=data, key=key1)
            producer.flush()
        except:
            pass
    else:
        print("Incoming data is live data")
        message_type = "live_data"
        key1 = str.encode(data["id"])
        try:
            del data["DiffInHours"]
            producer.send("live_data", value=data, key=key1)
            producer.flush()
        except:
            pass
    pass


for message in consumer:
    df = message.value
    data = literal_eval(df.decode("utf8"))
    # print(data1)
    checkBackData(data["message_type"], data["DiffInHours"])
    # print(data)
