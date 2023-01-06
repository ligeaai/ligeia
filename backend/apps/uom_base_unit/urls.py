from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (UomUnitSaveView,UomUnitScriptView)

urlpatterns = [
    
    path("save/", UomUnitSaveView.as_view(),name='UomSave'),

    path("scripts/", UomUnitScriptView.as_view(),name='Scripts'),

    
] 