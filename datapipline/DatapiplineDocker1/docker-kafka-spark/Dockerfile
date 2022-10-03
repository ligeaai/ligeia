FROM confluentinc/cp-kafka-connect-base:5.3.1
RUN  confluent-hub install --no-prompt jcustenborder/kafka-connect-redis:0.0.2.9
RUN  confluent-hub install --no-prompt confluentinc/kafka-connect-rabbitmq:1.1.1
RUN  confluent-hub install --no-prompt confluentinc/kafka-connect-mqtt:latest