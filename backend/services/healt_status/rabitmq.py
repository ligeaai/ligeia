import requests

try:
    response = requests.get(
                            'http://34.125.121.93:15672/api/aliveness-test/%2F',
                            auth=('guest', 'guest'))
    if response.status_code == 200 and response.json()['status'] == 'ok':
        print('ok')
    else:
        print(f"RabbitMQ health check failed:",response.status_code)
except Exception as e:
    print(f"RabbitMQ health check failed: {e}")