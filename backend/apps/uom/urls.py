from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (UomSaveView,UOMScriptView)

urlpatterns = [
    
    path("save/", UomSaveView.as_view(),name='UomSave'),

    path("scripts/", UOMScriptView.as_view(),name='Scripts'),

    
] 