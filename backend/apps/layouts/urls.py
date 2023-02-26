from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import LayoutsSaveView

urlpatterns = [
    path("save/", LayoutsSaveView.as_view(), name="widgetSave"),
]
