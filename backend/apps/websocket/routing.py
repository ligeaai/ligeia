from django.urls import path
from .consumers import WSLiveConsumer,WSConsumerBackfill,AlarmsConsumer
#DataConsumer

websocket_urlpatterns = [
	path('ws/tags/<str:tag_id>', WSLiveConsumer.as_asgi()),
	path('ws/alarms/', AlarmsConsumer.as_asgi()),
	path('ws/tags/backfill/', WSConsumerBackfill.as_asgi()),
]