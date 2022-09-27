import pika
import sys
import json

if len(sys.argv) != 3:
   print("Usage: " + sys.argv[0] + " <queueName> <count>")
   sys.exit(1)

queue  = sys.argv[1]
count = int(sys.argv[2])

print("count:\t%d\nqueue:\t%s" % (count, queue) )

msgBody = {
        "id" : 0 ,
        "body" :  "010101010101010101010101010101010101010101010101010101010101010101010"
        }

connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
channel = connection.channel()
channel.queue_declare(queue = queue)

properties = pika.BasicProperties(content_type='application/json', delivery_mode=1, priority=1, content_encoding='utf-8')
for i in range(count):
    msgBody["id"] = i
    jsonStr = json.dumps(msgBody)
    properties.message_id = str(i)
    channel.basic_publish(exchange = '', routing_key = queue, body = jsonStr, properties = properties)
    print("Send\t%r" % msgBody)

connection.close()
print('Exiting')


curl -i -X POST -H "Accept:application/json" -H  "Content-Type:application/json" http://connect:8088/connectors/ -d  '{"name":"RabbitMqSource","config":{"connector.class" : "io.confluent.connect.rabbitmq.RabbitMQSourceConnector","kafka.topic" : "deneme41","rabbitmq.queue" : "myqueue","rabbitmq.username": "guest","rabbitmq.password": "guest","rabbitmq.host": "localhost","rabbitmq.port": "5672","rabbitmq.virtual.host": "/","confluent.license":"","confluent.topic.bootstrap.servers":"broker:29092","confluent.topic.replication.factor":1,"value.converter": "org.apache.kafka.connect.converters.ByteArrayConverter","key.converter": "org.apache.kafka.connect.storage.StringConverter"}}'
