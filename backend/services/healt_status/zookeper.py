from kazoo.client import KazooClient

# pip install kazoo
try:
    zk = KazooClient(hosts='zookeeper:2181')
    zk.start()
    zk.ensure_path("/")
    zk.stop()
    print('ok')
except Exception as e:
    print(f"ZooKeeper health check failed: {e}")
