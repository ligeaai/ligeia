from kafka import KafkaConsumer
import os
from ast import literal_eval
from kafka import KafkaConsumer, TopicPartition
topic = os.environ.get('Kafka_Topic'),
host = os.environ.get('Kafka_Host')
consumer = KafkaConsumer(bootstrap_servers=host,
                                 auto_offset_reset='earliest',
                                 consumer_timeout_ms=1000)
consumer.subscribe(topic)
print('BAŞLADI')

def consumerData(eventType,User):
    data = []
    for message in consumer:
        try:
            value = (message.value)
            df = literal_eval(value.decode("utf8"))
            if df.get('LOG_TYPE') ==eventType and df.get('USER') == User:
                data.append(df)
        except:
            pass
    return data

