from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import WidgetPropertySaveView

urlpatterns = [
    path("save/", WidgetPropertySaveView.as_view(), name="widgetPropertySave"),
]
