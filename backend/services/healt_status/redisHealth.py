import redis

def chechk_ts_redis():
    try:
        redis_conn = redis.StrictRedis('redis-test1',port=6379)
        redis_conn.ping()
        print('ok')
    except Exception as e:
        print(f"Redis health check failed: {e}")


def chechk_cache_redis():
    try:
        redis_conn = redis.StrictRedis('ligeiaai-redis-1',port=6379)
        redis_conn.ping()
        print('ok')
    except Exception as e:
        print(f"Redis health check failed: {e}")
