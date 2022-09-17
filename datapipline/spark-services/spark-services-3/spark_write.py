import findspark
findspark.init()
import os
os.environ[
    "PYSPARK_SUBMIT_ARGS"
] = "--packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.3.1 pyspark-shell"
from pyspark.sql import SparkSession
from pyspark.sql.types import *
from pyspark.sql.functions import *

bootstrapserver = "localhost:9092"
topic = "raw-data"
appName = "PySpark Example - JSON file to Spark Data Frame"
master = "local"
time_format = "dd/MM/yyyy HH:mm:ss"

spark = (
    SparkSession.builder.appName("Spark Kafka Streaming").master(master).getOrCreate()
)

spark.sparkContext.setLogLevel("ERROR")

schema = StructType(
    [
        StructField("id", IntegerType(), True),
        StructField("tarih", StringType(), True),
        StructField("time", TimestampType(), True),
        StructField("temperature", FloatType(), True),
        StructField("pressure", FloatType(), True),
        StructField("vibration_X", FloatType(), True),
        StructField("vibration_y", FloatType(), True),
        StructField("vibration_motor", FloatType(), True),
    ]
)


lines = (
    spark.readStream.option("multiLine", True)
    .format("kafka")
    .option("kafka.bootstrap.servers", bootstrapserver)
    .option("subscribe", topic)
    .option("startingOffsets", "earliest")
    .load()
    .select(from_json(col("value").cast("string"), schema).alias("parsed_value"))
    .select(col("parsed_value.*"))
)
df = lines.select("*")

df2 = (
    df.withColumn("org_unit4", split(col("tarih"), ",").getItem(0))
    .withColumn("asset", split(col("tarih"), ",").getItem(1))
    .drop("tarih")
    .select(
        "id",
        "org_unit4",
        "asset",
        "time",
        "temperature",
        "pressure",
        "vibration_x",
        "vibration_y",
        "vibration_motor",
    )
)
