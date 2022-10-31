from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (TypeAndPropertySaveView, TypeDetailView, TypeSaveView,
                    TypeView,TypeDeleteView)

urlpatterns = [
    
    path("save/", TypeSaveView.as_view(),name='typeSave'),
    path("save-property/", TypeAndPropertySaveView.as_view(),name='typeAndPropertySave'),
    path("delete/", TypeDeleteView.as_view(),name='typeDelete'),
    path("scripts/", TypeView.as_view(),name='type'),
    path("details/", TypeDetailView.as_view(),name='typeDetails'),
    
] 