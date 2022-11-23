from services3 import *

query = (
    dffqn.writeStream.format("json")
    .option("path", "app/fqn")
    .option("checkpointLocation", "app/check1")
    .option("maxRecordsPerFile", 1)
    .start()
)
df19.printSchema()
query2 = (
    df19.selectExpr("CAST(id AS STRING) AS key", "to_json(struct(*)) AS value")
    .writeStream.format("kafka")
    .option("kafka.bootstrap.servers", "broker:29092")
    .option("topic", "frozendata")
    .option(
        "checkpointLocation",
        "app/check2",
    )
    .start()
)

query.awaitTermination()

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
