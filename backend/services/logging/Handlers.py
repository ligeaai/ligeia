
import os
import logging
from venv import create
from kafka import KafkaProducer
import json
from datetime import datetime


class KafkaLogger():
    def __init__(self):
        self.producer = None
        self.loggingTemplates =dict()
        self.json_message = {
            "Datetime":str(datetime.now()),
            "Message":"",
            "Level":"No Level",
            "User":"None",
        }
       

    def _update_json(self,message=None,request=None,level=None):
        
        self.json_message['Level'] = level
        self.json_message['Message'] = message
        self.json_message['Path'] = str(request.path)
        self.json_message['Data'] = str(request.data)
        self.json_message['Method'] = str(request.method)
        if str(request.user) == "AnonymousUser":
            request.user = request.data.get('email')
        self.json_message['User'] = str(request.user)
        return self.json_message
    
    def _base_logger(self,message,request,level):
        self.producer = KafkaProducer(bootstrap_servers=os.environ.get('Kafka_Host'),
                                      value_serializer=lambda v: json.dumps(v).encode('utf-8'),
                                    linger_ms=10)
        
        self.json_message = self._update_json(message,request,level)
    
    def _logging_template(self,message,request,level,logType):
        self._base_logger(message=message,request = request,level=level)
        self.loggingTemplates ={
            "LOG_TYPE":logType,
            "CONTENTS":self.json_message
        }
    
    def info(self,message=None,request = None,logType="logging"):
        try:
            self._logging_template(message=message,request = request,level="INFO",logType = logType)
        except Exception as e: 
            self.json_message['ERROR'] = e
        
        self.producer.send(os.environ.get('Kafka_Topic'), self.loggingTemplates)
            

    def warning(self,message=None,request = None, warning = None,logType = "logging"):
        try:
            self.json_message['WARNING'] = warning
            self._logging_template(message=message,request = request,level="WARNING",logType = logType)
        except Exception as e:
            self.json_message['ERROR'] = e
        
        self.producer.send(os.environ.get('Kafka_Topic'), self.loggingTemplates)
    
    def debug(self,message=None,request = None, debug = None,logType = "FAULTS"):
        try:
            self.json_message['debug'] = debug
            self._logging_template(message=message,request = request,level="DEBUG",logType = logType)
        except Exception as e:
            self.json_message['ERROR'] = e
        self.producer.send(os.environ.get('Kafka_Topic'), self.loggingTemplates)

    def error(self,message=None,request = None, error = None,logType = "FAULTS"):
        try:
            self.json_message['ERROR'] = error
            self._logging_template(message=message,request = request,level="ERROR",logType = logType)
        except Exception as e:
            self.json_message['ERROR'] = e
        self.producer.send(os.environ.get('Kafka_Topic'), self.loggingTemplates)


