from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from ast import literal_eval
import json
import pip._vendor.requests as requests
import os
import request

requ = os.environ.get("TAG_NAME_ENDPOINT")
host = "broker:29092"
topic = "uom_conversion"
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


def findTagName(tag_name, incomin_tag_name):
    for tags in incomin_tag_name:
        if tag_name == tags.get("NAME"):
            return tags


def matchUomSymbol(data, formules):
    for tag_uom in formules:
        if data["uom"] == tag_uom.get("CATALOG_SYMBOL"):
            formule = tag_uom.get("RESULT")
            A = float(tag_uom.get("A"))
            B = float(tag_uom.get("B"))
            C = float(tag_uom.get("C"))
            D = float(tag_uom.get("D"))
            X = data.get("value")
            result = eval(formule)
            print(result, "--------->")
            return result
        else:
            print("girmedi")


def matchUomAndTagUom(data, tags, formules):
    print(data.get("uom"), "------->", tags.get("UOM"))
    if data.get("uom") != tags.get("UOM"):
        return matchUomSymbol(data, formules)


for message in consumer:
    df = message.value
    data = literal_eval(df.decode("utf8"))
    incoming_tag_name = request.getTagNameData()
    # print(data)
    tags = findTagName(data["tag_name"], incoming_tag_name)
    formules = request.getFormule(tags.get("UOM_QUANTITY_TYPE"))
    new_value = matchUomAndTagUom(data, tags, formules)
    if new_value:
        data["tag_value"] = new_value
    df2 = dict(data)
    print(data["tag_value"], new_value)
    # uom_check("F", data["UOM"])
    producer.send("out_of_range", value=data)
    producer.flush()
