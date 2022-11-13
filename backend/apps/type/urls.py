from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (TypeAndPropertySaveView,TypeSaveView,TypeDetailNewView,
                    TypeView,TypeDeleteView)

urlpatterns = [
    
    path("save/", TypeSaveView.as_view(),name='typeSave'),
    path("save-property/", TypeAndPropertySaveView.as_view(),name='typeAndPropertySave'),
    path("delete/", TypeDeleteView.as_view(),name='typeDelete'),
    path("scripts/", TypeView.as_view(),name='type'),
    path("details/",TypeDetailNewView.as_view() ,name='typeDetails'),
    # path("detailsold/",TypeDetailView.as_view() ,name='typeDetails'),#TypeDetailView.as_view()
    
] 