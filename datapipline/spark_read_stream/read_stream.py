import findspark
findspark.init()
import os
os.environ['PYSPARK_SUBMIT_ARGS'] = '--packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.3.1 pyspark-shell'
from pyspark.sql import SparkSession
from pyspark.sql.types import *
from pyspark.sql.functions import *


appName = "PySpark Example - JSON file to Spark Data Frame"
master = "local"

spark = SparkSession \
    .builder \
    .appName("Spark Kafka Streaming") \
    .master(master) \
    .getOrCreate()

spark.sparkContext.setLogLevel("ERROR")

schema = StructType([
    StructField('date1', StringType(), True),
    StructField('Temperature:', StringType(), True),
    StructField('Pressure:', StringType(), True),
    StructField('Vibration_X', StringType(), True),
    StructField('Vibration_Y', StringType(), True),
    StructField('Vibration_motor', StringType(), True)
])

lines = spark \
    .readStream \
    .option('multiLine', True) \
    .format("kafka") \
    .option("kafka.bootstrap.servers", "localhost:9092") \
    .option("subscribe", "spark-kafka") \
    .option("startingOffsets", "earliest") \
    .load()\
    .select(from_json(col("value").cast("string"), schema).alias("parsed_value"))\
    .select(col("parsed_value.*"))
df = lines.select('*')



query = df \
    .writeStream \
    .outputMode("Append") \
    .format("console") \
    .start()

# raw = spark.sql("select * from `kafka-streaming-messages`")
# raw.show()

query.awaitTermination()
