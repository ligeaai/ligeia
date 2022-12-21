from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from ast import literal_eval
import json
import pip._vendor.requests as requests

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
r = requests.get(
    "http://34.125.220.112:8000/api/v1/tags/details/"
)  # I will fix it soon

incoming_tag_name = r.json()

tp = TopicPartition(topic, 0)
consumer.assign([tp])
consumer.poll()
consumer.seek_to_end()
old_data = []
type_value_data = []
temperature_list = []
pressure_list = []
vibration_x_list = []
vibration_y_list = []
vibration_motor_list = []
data_dict = {
    "temperature": temperature_list,
    "pressure": pressure_list,
    "vibration_x": vibration_x_list,
    "vibration_y": vibration_y_list,
    "vibration_motor": vibration_motor_list,
}


def get_value_type(df2):
    type_of_value = [
        "temperature",
        "pressure",
        "vibration_x",
        "vibration_y",
        "vibration_motor",
    ]
    for data in type_of_value:
        try:
            list(df2.keys()).index(data)
            incomingData = str(df2.get(data)) + " " + str(data)
            data_dict.get(data).append(incomingData)
            return data
        except:
            print("No defined data is coming")


def tag_name_check(data_tag_name, incoming_tag_name):
    min_max_values = []
    try:
        for i in range(len(incoming_tag_name)):
            if data_tag_name == incoming_tag_name[i]["NAME"]:
                min_max_values.append(incoming_tag_name[i]["NORMAL_MINIMUM"])
                min_max_values.append(incoming_tag_name[i]["NORMAL_MAXIMUM"])
                return min_max_values
    except:
        pass


def data_range_check(data, min_max_values):
    quality = data["quality"]
    data_value = float(data["value"])
    min_values = float(min_max_values[0])
    max_values = float(min_max_values[1])
    print(max_values)
    print(min_values)
    try:
        if data_value < min_values:
            quality = quality - 127
        elif data_value > max_values:
            quality = quality - 126
        data["quality"] = quality
    except:
        data["TAG_NAME"] == "no such tag value found"
    return data


for message in consumer:
    # print(message.value.decode('utf-8'))
    df = message.value
    data = literal_eval(df.decode("utf8"))
    df2 = dict(data)
    data_check = get_value_type(df2)
    print(data_check)
    if data["quality"] == 192:
        del data["step-status"]
        data_check = get_value_type(df2)
        data_range_check(data, tag_name_check(data["TAG_NAME"], incoming_tag_name))
        # print(data)
        # print(data_check)
        del data["TAG_NAME"]
        del data[data_check]
        # print(data)
        key = data["id"].encode("utf-8")
        producer.send(data["message_type"], value=data, key=key)
        producer.flush()
    else:
        pass
