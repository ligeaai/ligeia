from django.urls import path
from .consumers import WSLiveConsumer,WSConsumerBackfill,AlarmsConsumer,WSConsumeOnlyLastData,ImportTagConsumer
#DataConsumer

websocket_urlpatterns = [
	path('ws/tags/<str:tag_id>', WSLiveConsumer.as_asgi()),
	path('ws/import/', ImportTagConsumer.as_asgi()),
	path('ws/alarms/<str:layer_name>', AlarmsConsumer.as_asgi()),
    path('ws/live/last_data/<str:tag_id>', WSConsumeOnlyLastData.as_asgi()),
	path('ws/tags/backfill/<str:tag_id>', WSConsumerBackfill.as_asgi()),
]