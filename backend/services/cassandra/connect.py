
import environ
env = environ.Env(DEBUG=(bool, False))
cassandra_host = "34.70.46.54"
cassandra_port = 9092
from cassandra.cluster import Cluster

from cassandra.auth import PlainTextAuthProvider

auth_provider = PlainTextAuthProvider(username ='cassandra', password='cassandra')

cluster=Cluster(['cassandra'], auth_provider=auth_provider)
session = cluster.connect('backfilldata')
rows = session.execute('SELECT * FROM backfilldata')
for row in rows:
    print([row.id,row.created_by,row.createdtime,row.fqn,row.message_type,row.quality,row.timestamp,row.value,row.version]) 