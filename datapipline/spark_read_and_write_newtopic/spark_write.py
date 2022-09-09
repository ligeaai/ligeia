import findspark

findspark.init()
import os

os.environ[
    "PYSPARK_SUBMIT_ARGS"
] = "--packages org.apache.spark:spark-sql-kafka-0-10_2.11:2.3.1 pyspark-shell"
from pyspark.sql import SparkSession
from pyspark.sql.types import *
from pyspark.sql.functions import *


appName = "PySpark Example - JSON file to Spark Data Frame"
master = "local"
time_format = "dd/MM/yyyy HH:mm:ss"

spark = (
    SparkSession.builder.appName("Spark Kafka Streaming").master(master).getOrCreate()
)

spark.sparkContext.setLogLevel("ERROR")

schema = StructType(
    [
        StructField("Tarih", StringType(), True),
        StructField("Time", TimestampType(), True),
        StructField("Temperature:", FloatType(), True),
        StructField("Pressure:", FloatType(), True),
        StructField("Vibration_X", FloatType(), True),
        StructField("Vibration_Y", FloatType(), True),
        StructField("Vibration_motor", FloatType(), True),
    ]
)

lines = (
    spark.readStream.option("multiLine", True)
    .format("kafka")
    .option("kafka.bootstrap.servers", "localhost:9092")
    .option("subscribe", "raw-data")
    .option("startingOffsets", "earliest")
    .load()
    .select(from_json(col("value").cast("string"), schema).alias("parsed_value"))
    .select(col("parsed_value.*"))
)
df = lines.select("*")

df2 = (
    df.withColumn("org_unit4", split(col("Tarih"), ",").getItem(0))
    .withColumn("asset", split(col("Tarih"), ",").getItem(1))
    .drop("Tarih")
    .withColumn("Time", date_format(col("Time"), time_format))
    .select(
        "org_unit4",
        "asset",
        "Time",
        "Temperature:",
        "Pressure:",
        "Vibration_X",
        "Vibration_Y",
        "Vibration_motor",
    )
)

query = (
    df2.selectExpr("to_json(struct(*)) AS value")
    .writeStream.format("kafka")
    .option("kafka.bootstrap.servers", "localhost:9092")
    .option("topic", "live_data")
    .option(
        "checkpointLocation",
        "C:\\Users\\alper\\OneDrive\\Masaüstü\\Nordal Proje\\atılacaklar\\spark_read_and_write_newtopic\\checkpoint",
    )
    .start()
)

query.awaitTermination()
