from django.urls import path
from .consumers import WSConsumer

websocket_urlpatterns = [
	path('ws/tags/', WSConsumer.as_asgi()),
]