from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (
    UomSaveView,
    UOMScriptView,
    UomDetialsView,
    UomEditorSaveUpdateView,
    UomDeleteView,
)

urlpatterns = [
    path("save/", UomSaveView.as_view(), name="UomSave"),
    path("scripts/", UOMScriptView.as_view(), name="Scripts"),
    path("details/", UomDetialsView.as_view(), name="details"),
    path("save-update/", UomEditorSaveUpdateView.as_view(), name="save-update"),
    path("delete/", UomDeleteView.as_view(), name="delete"),
]
