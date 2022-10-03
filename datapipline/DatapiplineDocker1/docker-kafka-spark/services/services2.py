# READING FROM KAFKA WITH READSTREAM AND CREATING DATAFRAMES
from services1 import *

lines = spark \
    .readStream \
    .option('multiLine', True) \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "broker:29092") \
    .option("startingOffsets", "earliest") \
    .option("failOnDataLoss", False)\
    .option("subscribe", "rawdata") \
    .load()\
    .select(from_json(col("value").cast("string"), schema).alias("parsed_value"))\
    .select(col("parsed_value.*"))
df = lines.select('*')