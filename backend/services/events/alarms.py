from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition
from pprint import pprint
import os
import pandas as pd
from ast import literal_eval
import json


host = os.environ.get('Kafka_Host')
topics = ['backfill_data', 'live_data']
bootstrap_servers = host
consumer = KafkaConsumer(
    *topics,
    bootstrap_servers=bootstrap_servers,
    auto_offset_reset='latest'
  )
  
producer = KafkaProducer(bootstrap_servers=os.environ.get('Kafka_Host'),
                                      value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                                    linger_ms=10)
consumer.poll()
def checkEvent(message):
    data = json.loads(message.value.decode('utf-8'))
    if data.get('quality') > 66 or data.get('quality') < 65:
        alarms = {
            "LOG_TYPE":"ALARMS",
            "CONTENTS":data
        }
        producer.send(os.environ.get('Kafka_Topic'),alarms)
for message in consumer:
    checkEvent(message)


