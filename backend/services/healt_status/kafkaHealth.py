from kafka import KafkaConsumer

try:
    host = "broker:29092"
    consumer = KafkaConsumer(
            bootstrap_servers=host,
            enable_auto_commit=False,
            auto_offset_reset="earliest",
        )
    consumer.topics()
    print('ok')
except Exception as e:
    print(f"Kafka health check failed: {e}")

