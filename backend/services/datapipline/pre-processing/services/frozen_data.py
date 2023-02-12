from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from pprint import pprint
import os
import pandas as pd
from ast import literal_eval
import json

host = os.environ.get("Kafka_Host_DP")
topic = "frozen_data"
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
old_data = []
type_value_data = []


def get_value_type(df2, get_value):
    data = get_value
    print(data)
    print("--------------**************---------------------")
    # try:
    incomingData = df2 + " " + str(data)
    type_value_data.append(incomingData)
    return data
    # except:
    #     print("No defined data is coming")


def frozen_data_check(data_check):
    print(
        "\n VALUE -1 = ",
        type_value_data[-1],
        "----------->",
        "VALUE -2= ",
        type_value_data[-2],
        "\n",
    )
    if type_value_data[-1] == type_value_data[-2]:
        if len(type_value_data) > 3:
            print(
                "----------------------------THE DATA IS COMING SAME PLEASE CHECK----------------------------"
            )
            data["payload"]["insert"][0]["vqts"][0]["q"] = (
                data["payload"]["insert"][0]["vqts"][0]["q"] - 125
            )
    else:
        type_value_data.clear()
    return type_value_data


for message in consumer:
    old_data.append(message.value.decode("utf-8"))
    # print(message.value.decode('utf-8'))
    df = message.value
    data = literal_eval(df.decode("utf8"))
    df2 = dict(data)
    data_check = get_value_type(
        data["payload"]["insert"][0]["fqn"],
        data["payload"]["insert"][0]["vqts"][0]["v"],
    )
    print(len(type_value_data))
    if len(type_value_data) > 3:
        frozen_data_check(data_check)
    data["step-status"] = "frozen-data"
    producer.send("scaling_data", value=data)
    producer.flush()
