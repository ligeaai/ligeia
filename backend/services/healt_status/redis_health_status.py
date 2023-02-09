import redis
import os
import datetime
from kafka import KafkaProducer
import json
from helper import send_alarm

def check_ts_redis():
    try:
        redis_conn = redis.StrictRedis("redis-test1", port=6379)
        redis_conn.ping()
        print("ok")
    except Exception as e:
        error_message = f"Redis health check failed: {e}"
        send_alarm(error_message,"Redis-TS")


def check_cache_redis():
    try:
        redis_conn = redis.StrictRedis("ligeiaai-redis-1", port=6379)
        redis_conn.ping()
        print("ok")
    except Exception as e:
        error_message = f"Redis health check failed: {e}"
        send_alarm(error_message,"Redis")


check_ts_redis()
check_cache_redis()


# host = os.environ.get("Kafka_Host_DP")
# producer = KafkaProducer(
#     bootstrap_servers=host,
#     value_serializer=lambda v: json.dumps(v).encode("ascii"),
# )
# created_time = datetime.datetime.now()


# def check_ts_redis():
#     try:
#         redis_conn = redis.StrictRedis("redis-test1", port=6379)
#         redis_conn.ping()
#         print("ok")
#     except Exception as e:
#         error_message = f"Redis health check failed: {e}"
#         data = {
#             "LOG_TYPE": "Alarm",
#             "date": created_time,
#             "layer_name": "KNOC",
#             "error_message": error_message,
#             "container": "Redis",
#         }
#         producer.send("alarms", value=data)
#         producer.flush()


# def check_cache_redis():
#     try:
#         redis_conn = redis.StrictRedis("ligeiaai-redis-1", port=6379)
#         redis_conn.ping()
#         print("ok")
#     except Exception as e:
#         error_message = f"Redis health check failed: {e}"
#         data = {
#             "LOG_TYPE": "Alarm",
#             "date": created_time,
#             "layer_name": "KNOC",
#             "error_message": error_message,
#             "container": "Redis",
#         }
#         producer.send("alarms", value=data)
#         producer.flush()


# check_ts_redis()
# check_cache_redis()
