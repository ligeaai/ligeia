from __future__ import absolute_import, unicode_literals
import os
from celery import Celery


if os.environ.get('DJANGO_SETTINGS_MODULE', None) is None:
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

app = Celery("core")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
