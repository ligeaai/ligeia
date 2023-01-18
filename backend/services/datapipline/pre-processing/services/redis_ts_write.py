import redis
import json
import time as timelibrary
import datetime
from kafka import KafkaConsumer

# Create a Redis Connection
rds = redis.StrictRedis("redis-test", port=6379)
# Create Kafka Consumer
consumer = KafkaConsumer("live_data", bootstrap_servers=["broker:29092"])


def created_redis_db(key, columns):
    try:
        created_databases = rds.ts().create(key, labels=columns)
        return created_databases
    except:
        print("This database name already exist.")


def add_to_created_database(key, timestamp, value, columns):
    try:
        rds.ts().add(key, timestamp, value, labels=columns)
        return 1
    except:
        print("This timestamp already exist.")


def convert_to_time(time):
    timestamp_for_redis = int(
        timelibrary.mktime(
            datetime.datetime.strptime(time, "%Y-%m-%d %H:%M:%S").timetuple()
        )
    )
    return timestamp_for_redis


for msg in consumer:
    data = json.loads(msg.value)
    print(data["createdtime"][0:19])
    time_for_redis = convert_to_time(data["createdtime"][0:19])
    # ----------------- VALUES -----------------
    columns = {
        "version": data["version"],
        "id": data["id"],
        "created_by": data["created_by"],
        "createdtime": data["createdtime"],
        "message_type": data["message_type"],
        "fqn": data["fqn"],
        "timestamp": data["timestamp"],
        "quality": data["quality"],
        "value": data["value"],
        "tag_name": data["tag_name"],
        "type_value": data["type_value"],
    }
    timestamp = time_for_redis
    value = str(data["value"])
    key_times = str(data["createdtime"][8]) + str(data["createdtime"][9])
    print(key_times)
    key = data["type_value"] + ":" + key_times
    # ------------------------------------------
    # Create Redis Db
    created_redis_db(key, columns)
    # ------------------------------------------
    # Add Value to Created Redis Db
    add_to_created_database(key, timestamp, value, columns)
    print("Complete")
    # ------------------------------------------
    mget_filters = ["id=1"]
    mget_reply = rds.ts().mget(mget_filters, with_labels=True)
    print(json.dumps(mget_reply, indent=4) + "\n")
    # Redis Cli Command --> TS.MGET WITHLABELS FILTER area_id=20
