from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import WidgetSaveView

urlpatterns = [
    path("save/", WidgetSaveView.as_view(), name="widgetSave"),
]
