FROM apache/nifi:latest
USER root

RUN apt-get update 

# Install Python3
RUN apt-get install -y python3 python3-pip

# Install libraries 

RUN pip3 install xlrd

RUN pip3 install unicodecsv
RUN python3 -m pip install pandas
RUN python3 -m pip install kafka-python
RUN python3 -m pip install requests
RUN python3 -m pip install confluent_kafka
RUN python3 -m pip install redis
RUN python3 -m pip install pymongo
RUN python3 -m pip install paho-mqtt python-etcd
# RUN pip3 install <additional library>