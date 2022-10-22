from django.urls import include, path, re_path
from .views import LayerView,LayerSaveView,LayerModelViewSet
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", LayerSaveView.as_view(),name='code-list-save'),
    path("scripts/", LayerView.as_view(),name='code-list'),
    path("details/", LayerModelViewSet.as_view(),name='code-list'),
    
] 
