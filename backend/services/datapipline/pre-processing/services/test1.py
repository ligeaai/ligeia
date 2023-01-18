from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from pprint import pprint
import os
import pandas as pd
from ast import literal_eval
import json

host = "broker:29092"
topic = "test"
consumer = KafkaConsumer(
    group_id=topic,
    bootstrap_servers=host,
    enable_auto_commit=False,
    auto_offset_reset="earliest",
)

producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)

tp = TopicPartition(topic, 0)
consumer.assign([tp])
consumer.poll()
consumer.seek_to_end()

for message in consumer:
    df = message.value
    data = literal_eval(df.decode("utf8"))
    print(data)
    # print(data1)
    data["step-status"] = "nifi_is_working"
    producer.send("deneme2", value=data)
    producer.flush()
