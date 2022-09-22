from __future__ import absolute_import, unicode_literals
import os
from celery import Celery


if os.environ.get('DJANGO_SETTINGS_MODULE', None) is None:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

app = Celery("core")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()

@app.task(bind=True)
def debug_task_with_request(self):
    print('Request: {0!r}'.format(self.request))

@app.task(bind=True)
def debug_task(self):
    print(f'Request: {self.request!r}')

@app.task(bind=True)
def debug_task_from_shell(self):
    print("debug_task_from_shell executed")
