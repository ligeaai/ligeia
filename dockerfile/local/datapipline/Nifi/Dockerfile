FROM apache/nifi:latest
USER root

RUN apt-get update 

# Install Python3
RUN apt-get install -y python3 python3-pip

# Install libraries 
# Note: the following list can be extended by libraries specific to your needs.

RUN pip3 install xlrd

RUN pip3 install unicodecsv
RUN python3 -m pip install pandas
RUN python3 -m pip install kafka-python
RUN python3 -m pip install requests

# RUN pip3 install <additional library>