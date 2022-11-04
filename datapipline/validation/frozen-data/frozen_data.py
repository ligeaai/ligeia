from kafka import KafkaConsumer,TopicPartition
from pprint import pprint
import os
import pandas as pd
from ast import literal_eval
import json
host = 'localhost:9092'
topic = 'rawData'
consumer = KafkaConsumer(group_id = topic,bootstrap_servers = host,
                             enable_auto_commit=False, auto_offset_reset="earliest")

tp = TopicPartition(topic, 0)
consumer.assign([tp])
consumer.poll()
consumer.seek_to_end()
kontrol = 0
old_data = []
type_value_data = []
temperature_list = []
pressure_list = []
vibration_x_list = []
vibration_y_list = []
vibration_motor_list = []
data_dict = {
            "temperature": temperature_list,
            "pressure":pressure_list,
            "vibration_x":vibration_x_list,
            "vibration_y":vibration_y_list,
            "vibration_motor":vibration_motor_list,
            "NONE":"No"
            }

def get_value_type(df2):
    type_of_value = ['temperature',"pressure","vibration_x","vibration_y","vibration_motor"]
    
    for data in type_of_value:
        try:
            list(df2.keys()).index(data)
            incomingData = str(df2.get(data)) + " " + str(data)
            data_dict.get(data).append(incomingData)
            return data
        except:
            pass

def frozen_data_check(data_check):
    valueType = data_dict.get(data_check)
    print('\n VALUE -1 = ',valueType[-1],'----------->','VALUE -2= ', valueType[-2],"\n")
    if valueType[-1] == valueType[-2]:
        if len(valueType) > 3:
                print("----------------YANLIŞ GİDEN BİŞELER VAR----------------------------")
    else:
        data_dict.get(data_check).clear()
    return valueType

for message in consumer:
    old_data.append(message.value.decode('utf-8'))
    # print(message.value.decode('utf-8'))
    df = message.value
    data = literal_eval(df.decode('utf8'))
    df2 = dict(data)
    data_check = get_value_type(df2)
    if len(data_dict.get(data_check)) > 1:
        frozen_data_check(data_check)