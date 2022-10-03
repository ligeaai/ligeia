# CREATING SPARKSESSİON AND SETTING THE SCHEMA
from pyspark.context import SparkContext
from pyspark.sql.session import SparkSession
from pyspark.sql import SparkSession
from pyspark.sql.types import *
from pyspark.sql.functions import *

sc = SparkContext('local')
spark = SparkSession(sc)
time_format = "yyyy-mm-dd HH:mm:ss"

# SCHEMA OF INCOMING DATA
schema = StructType([
    StructField('id', IntegerType(), True),
    StructField('tarih', StringType(), True),
    StructField('time', StringType(), True),
    StructField('temperature', FloatType(), True),
    StructField('pressure', FloatType(), True),
    StructField('vibration_x', FloatType(), True),
    StructField('vibration_y', FloatType(), True),
    StructField('vibration_motor', FloatType(), True)
])
