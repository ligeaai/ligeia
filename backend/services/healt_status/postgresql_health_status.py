import psycopg2
import os
import json
from kafka import KafkaProducer
from datetime import datetime

host = os.environ.get("Kafka_Host_DP")
producer = KafkaProducer(
    bootstrap_servers=host,
    value_serializer=lambda v: json.dumps(v).encode("ascii"),
)

def HealthCheckForPostgre():
    try:
        conn = psycopg2.connect(
            host="postgres", database="postgres", user="postgres", password="manager"
        )
        cur = conn.cursor()
        cur.execute("SELECT 1")
        result = cur.fetchone()
        if result == (1,):
            print("PostgreSQL is up and running!")
        else:
            print("PostgreSQL is not running.")
    except (psycopg2.OperationalError, psycopg2.DatabaseError) as e:
        error_message = ("Error connecting to PostgreSQL:", str(e))
        data = {
            "LOG_TYPE": "Alarm",
            "date": str(datetime.now()),
            "layer_name": "KNOC",
            "error_message": error_message,
            "container": "Postgre-SQL",
        }
        producer.send("alarms", value=data)
        producer.flush()
    finally:
        cur.close()
        conn.close()
    print("finally")


# import psycopg2
# import os
# import datetime
# from kafka import KafkaProducer
# import json

# host = os.environ.get("Kafka_Host_DP")
# producer = KafkaProducer(
#     bootstrap_servers=host,
#     value_serializer=lambda v: json.dumps(v).encode("ascii"),
# )
# created_time = datetime.datetime.now()


# def HealthCheckForPostgre():
#     try:
#         conn = psycopg2.connect(
#             host="postgres", database="postgres", user="postgres", password="manager"
#         )
#         cur = conn.cursor()
#         cur.execute("SELECT 1")
#         result = cur.fetchone()
#         if result == (1,):
#             print("PostgreSQL is up and running!")
#         else:
#             print("PostgreSQL is not running.")

#     except Exception as e:
#         error_message = ("Error connecting to PostgreSQL:", str(e))
#         data = {
#             "LOG_TYPE": "Alarm",
#             "date": created_time,
#             "layer_name": "KNOC",
#             "error_message": error_message,
#             "container": "Postgre-SQL",
#         }
#         producer.send("alarms", value=data)
#         producer.flush()
#     finally:
#         conn.close()
#         print("finally")
