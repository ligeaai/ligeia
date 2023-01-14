from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (UomUnitSaveView,
UomUnitScriptView,
UomUnitDetailsView,
UomUnitDetailView,
UomUnitsNameView,
UomQuantityTypeDetailView)

urlpatterns = [
    
    path("save/", UomUnitSaveView.as_view(),name='UomSave'),
    path("detail/", UomUnitDetailView.as_view(),name='detail'),
    path("details/", UomUnitDetailsView.as_view(),name='details'),
    path("scripts/", UomUnitScriptView.as_view(),name='Scripts'),
    path("type/", UomQuantityTypeDetailView.as_view(),name='details'),
    path("name/", UomUnitsNameView.as_view(),name='details'),
    
] 