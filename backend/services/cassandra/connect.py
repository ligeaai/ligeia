
import environ
env = environ.Env(DEBUG=(bool, False))
from cassandra.cluster import Cluster
cassandra_host = env('CASSANDRA_HOST')
cassandra_port = env('CASSANDRA_PORT')
CASSANDRA_TABLENAME = env(CASSANDRA_TABLENAME)
cluster = Cluster(host = cassandra_host,port=cassandra_port)
session = cluster.connect(CASSANDRA_TABLENAME) # ,wait_for_all_pools=True
session.execute()
rows = session.execute('SELECT * FROM users')
for row in rows:
    print(row.age,row.name,row.username)