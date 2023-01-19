from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from ast import literal_eval
import json
import pip._vendor.requests as requests
import os
from request import req


requ = os.environ.get("TAG_NAME_ENDPOINT")
host = "localhost:9092"
topic = "out_of_range"
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


def tag_name_check(data_tag_name, incoming_tag_name):
    min_max_values = []
    for i in range(len(incoming_tag_name)):
        if data_tag_name == incoming_tag_name[i]["NAME"]:
            min_max_values.append(incoming_tag_name[i]["NORMAL_MINIMUM"])
            min_max_values.append(incoming_tag_name[i]["NORMAL_MAXIMUM"])
            return min_max_values


def data_range_check(data, min_max_values):
    try:
        quality = data["quality"]
        data_value = float(data["value"])
        min_values = float(min_max_values[0])
        max_values = float(min_max_values[1])
        print(max_values)
        print(min_values)
        if data_value < min_values:
            quality = quality - 127
        elif data_value > max_values:
            quality = quality - 126
        data["quality"] = quality
    except:
        data["tag_name"] = "no such tag value found"
    return data


for message in consumer:
    r = requests.get(req)
    incoming_tag_name = r.json()
    df = message.value
    data = literal_eval(df.decode("utf8"))
    df2 = dict(data)
    if data["quality"] == 192:
        data_range_check(data, tag_name_check(data["tag_name"], incoming_tag_name))
    key = data["id"].encode("utf-8")
    del data["step-status"]
    del data["uom"]
    print(data["tag_name"])
    producer.send(data["message_type"], value=data, key=key)
    producer.flush()
