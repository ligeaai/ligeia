
import os
import logging
from venv import create
from kafka import KafkaProducer
import json
from datetime import datetime


class KafkaLogger():
    def __init__(self):
        self.producer = None
        self.json_message = {
            "datetime":str(datetime.now()),
            "Level":"No Level",
            "User":"None",
            "Event":"None",
        }

    def _update_json(self,message=None,request=None,level=None):
        self.json_message['Level'] = level
        self.json_message['Event'] = message + str(request.data)
        if str(request.user) == "AnonymousUser":
            request.user = request.data.get('email')
        self.json_message['User'] = str(request.user)
        self.json_message["Request"] = str(request)
        return self.json_message
    
    def _base_logger(self,message,request,level):
        self.producer = KafkaProducer(bootstrap_servers=os.environ.get('Kafka_Host'),
                                      value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                                    linger_ms=10)
        self.json_message = self._update_json(message,request,level)
    
    def info(self,message=None,request = None):
        try:
            self._base_logger(message=message,request = request,level="INFO")
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)
        except Exception as e: 
            self.json_message['ERROR'] = e
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)

    def warning(self,message=None,request = None, warning = None):
        try:
            self._base_logger(message=message,request = request,level="WARNING")
            self.json_message['WARNING'] = warning
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)
        except Exception as e:
            self.json_message['ERROR'] = e
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)
    
    def debug(self,message=None,request = None, debug = None):
        try:
            self._base_logger(message=message,request = request,level="DEBUG")
            self.json_message['debug'] = debug
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)
        except Exception as e:
            self.json_message['ERROR'] = e
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)

    def error(self,message=None,request = None, error = None):
        try:
            self._base_logger(message=message,request = request,level="ERROR")
            self.json_message['ERROR'] = error
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)
        except Exception as e:
            self.json_message['ERROR'] = e
            self.producer.send(os.environ.get('Kafka_Topic'), self.json_message)


