from django.urls import path
from .consumers import WSLiveConsumer,WSConsumerBackfill,AlarmsConsumer,WSConsumeOnlyLastData
#DataConsumer

websocket_urlpatterns = [
	path('ws/tags/<str:tag_id>', WSLiveConsumer.as_asgi()),
	path('ws/alarms/', AlarmsConsumer.as_asgi()),
    path('ws/last_data/<str:tag_id>', WSConsumeOnlyLastData.as_asgi()),
	path('ws/tags/backfill/', WSConsumerBackfill.as_asgi()),
]