import psycopg2

def HealthCheckForPostgre():
    try:
        conn = psycopg2.connect(
            host="postgres",
            database="postgres",
            user="postgres",
            password="manager"
        )
        cur = conn.cursor()
        cur.execute("SELECT 1")
        result = cur.fetchone()
        if result == (1, ):
            print("PostgreSQL is up and running!")
        else:
            print("PostgreSQL is not running.")

    except Exception as e:
        print("Error connecting to PostgreSQL:", str(e))

    finally:
        conn.close()
        print('finally')