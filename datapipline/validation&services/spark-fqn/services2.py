from services1 import *

lines = (
    spark.readStream.option("multiLine", True)
    .format("kafka")
    .option("kafka.bootstrap.servers", "broker:29092")
    .option("startingOffsets", "earliest")
    .option("failOnDataLoss", False)
    .option("subscribe", "rawdata")
    .load()
)
df = lines.select("*")
