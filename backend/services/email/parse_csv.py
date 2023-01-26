import pandas as pd
from datetime import datetime
import json
from datetime import datetime
from dateutil import parser
import os
from kafka import KafkaProducer

producer = KafkaProducer(bootstrap_servers=os.environ.get('Kafka_Host'),
                                      value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                                    linger_ms=10)
file_name = ""
with os.scandir(os.getcwd()) as find:
    for file in find:
        if file.name.endswith("csv"):
            file_name = (file.name)
data = pd.read_csv(file_name,sep = ';',encoding='latin-1')

keys = data.keys()
temp = []
for row_index in range(len(data)):
    for keys_index in range(6,len(keys)):
        raw_data = {}
        raw_data["completion"] = data[keys[1]][row_index]
        raw_data["created_by"] = data[keys[4]][row_index]
        raw_data["date"] = data[keys[5]][row_index]
        raw_data['tag_name'] = keys[keys_index].split(',')[0]
        try:
            datetime_object = parser.parse(raw_data.get('date'))
        except:
            continue
        if len(keys[keys_index].split(',')) > 1:
            raw_data['uom'] = keys[keys_index].split(',')[1]
        else:
            raw_data['uom'] = "blank"
        
        if data[keys[keys_index]][row_index] is not None:
            raw_data["tag_value"] = float(data[keys[keys_index]][row_index])
            producer.send(os.environ.get('Kafka_Topic_Raw_Data'), value = raw_data)
        else:
            continue

# os.remove(file_name)
# print('first -->',temp[0])
# data_json = json.dumps(temp[0]).encode('utf-8')
# print('\n\nencoded  -->', data_json)

# original_dict = json.loads(data_json.decode('utf-8'))
# print('\n\ndecoded  -->', original_dict)
