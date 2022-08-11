from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
bootstrap_servers='localhost:9092',
value_deserializer = lambda v: json.loads(v.decode('ascii')),
)

consumer.subscribe(topics='deneme1')
for message in consumer:
  print ("%d:%d: v=%s" % (message.partition,
                          message.offset,
                          message.value))

