import requests

url = "http://34.125.121.93:8001/api/v1/health"

try:
    response = requests.get(url)
    if response.status_code == 200:
        print("Django health check: OK")
    else:
        print("Django health check failed: HTTP {}".format(response.status_code))

except Exception as e:
    print("Error: Could not connect to Django:", str(e))