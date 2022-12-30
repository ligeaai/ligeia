from django.urls import path
from .consumers import WSConsumer,WSConsumerBackfill

websocket_urlpatterns = [
	path('ws/tags/', WSConsumer.as_asgi()),
	path('ws/tags/backfill/', WSConsumerBackfill.as_asgi()),
]