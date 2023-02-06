import requests
import os
from kafka import KafkaProducer
import json
from kafka import KafkaConsumer, TopicPartition

nifi_api_url = os.environ.get("NIFI_API_URL")
host = os.environ.get("Kafka_Host_DP")
producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)

process_group_url = f"{nifi_api_url}/process-groups/root/process-groups"
response = requests.get(process_group_url)

if response.status_code == 200:
    data = response.json()
    knoc_process_group = next(
        (pg for pg in data["processGroups"] if pg["component"]["name"] == "KNOC"), None
    )
    if knoc_process_group:
        data_pre_process_id = knoc_process_group["component"]["id"]

if data_pre_process_id:
    processors_url = f"{nifi_api_url}/process-groups/{data_pre_process_id}/processors"
    response = requests.get(processors_url)

# nifi_api_url = os.environ.get("NIFI_API_URL")
# host = os.environ.get("Kafka_Host_DP")
# producer = KafkaProducer(
#     bootstrap_servers=host,
#     value_serializer=lambda v: json.dumps(v).encode("ascii"),
# )


# data_pre_process_id = ""
# list_for_all_process_group = []
# process_group = "/process-groups/root/process-groups"


# def process_group_processor(data_pre_process_id):
#     request = "/process-groups/" + data_pre_process_id + "/processors"
#     return request


# response = requests.get(nifi_api_url + process_group)

# if response.status_code == 200:
#     data = response.json()
#     for i in range(0, len(data["processGroups"])):
#         list_for_all_process_group.append(data["processGroups"][i]["component"]["name"])
#         if list_for_all_process_group[i] == "KNOC":
#             print("meraba")
#             data_pre_process_id = data["processGroups"][i]["component"]["id"]

# request_process_with_id = process_group_processor(data_pre_process_id)
# response = requests.get(nifi_api_url + request_process_with_id)

# if response.status_code == 200:
#     data = response.json()
#     for i in range(0, len(data["processors"])):
#         if len(data["processors"][i]["bulletins"]) != 0:
#             print("Girdi")
#             error_message = (
#                 "There is an error in process"
#                 + data["processors"][i]["component"]["name"]
#                 + ". The error is : "
#                 + str(data["processors"][i]["bulletins"][0]["bulletin"]["message"])
#             )
#             print(error_message)
#             # producer.send("backorlivee", value=error_message)
#             # producer.flush()

# http://localhost:8080/nifi-api/process-groups/root/process-groups --> all process_group

# http://localhost:8080/nifi-api/process-groups/root/processors --> All process

# http://localhost:8080/nifi-api/process-groups/{process_group_id[0]}/processors -- > all process in process_group

# http://localhost:8080/nifi-api/processors/036d739c-0186-1000-0000-000010b72ce2/diagnostics --> Error process
