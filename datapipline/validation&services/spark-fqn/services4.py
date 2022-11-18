from services3 import *

query = df17\
    .writeStream\
    .format("json") \
    .option("path", "C:\\Users\\alper\\OneDrive\\Masaüstü\\spark-fqn\\fqn") \
    .option("checkpointLocation", "C:\\Users\\alper\\OneDrive\\Masaüstü\\spark-fqn\\fqn")\
    .option("maxRecordsPerFile", 1)\
    .start()

query2 = df19.selectExpr("CAST(id AS STRING) AS key", "to_json(struct(*)) AS value") \
    .writeStream.format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092")\
    .option("topic", "test1")\
    .option(
        "checkpointLocation",
        "C:\\Users\\alper\\OneDrive\\Masaüstü\\spark-fqn\\checkpoint3",
    )\
    .start()

query3 = (
    df19.writeStream.option("truncate", False)
    .outputMode("Append")
    .format("console")
    .start()
)

query3.awaitTermination()

# query9 = df7.selectExpr("CAST(id AS STRING) AS key", "to_json(struct(*)) AS value") \
#     .writeStream.format("kafka") \
#     .option("kafka.bootstrap.servers", "localhost:9092")\
#     .option("topic", "backfill_topic")\
#     .option(
#         "checkpointLocation",
#         "C:\\Users\\alper\\OneDrive\\Masaüstü\\spark-fqn\\checkpoint3",
#     )\
#     .start()

# query2 = df11.selectExpr("CAST(id AS STRING) AS key", "to_json(struct(*)) AS value") \
#     .writeStream.format("kafka") \
#     .option("kafka.bootstrap.servers", "localhost:9092")\
#     .option("topic", "backfill_data")\
#     .option(
#         "checkpointLocation",
#         "C:\\Users\\alper\\OneDrive\\Masaüstü\\spark-fqn\\checkpoint",
#     )\
#     .start()

# query3 = df15.selectExpr("CAST(id AS STRING) AS key", "to_json(struct(*)) AS value") \
#     .writeStream.format("kafka") \
#     .option("kafka.bootstrap.servers", "localhost:9092")\
#     .option("topic", "live_data")\
#     .option(
#         "checkpointLocation",
#         "C:\\Users\\alper\\OneDrive\\Masaüstü\\spark-fqn\\checkpoint2",
#     )\
#     .start()