from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (UomUnitSaveView,UomUnitScriptView,UomUnitDetialsView)

urlpatterns = [
    
    path("save/", UomUnitSaveView.as_view(),name='UomSave'),
    path("details/", UomUnitDetialsView.as_view(),name='details'),
    path("scripts/", UomUnitScriptView.as_view(),name='Scripts'),

    
] 