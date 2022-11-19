from django.urls import include, path, re_path
from .views import LayerView,LayerSaveView,LayerModelViewSet,LayerDropDownView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", LayerSaveView.as_view(),name='layert-save'),
    path("scripts/", LayerView.as_view(),name='layer-scripts'),
    path("details/", LayerModelViewSet.as_view(),name='layer-list'),
    path('layer-dropdown/',LayerDropDownView.as_view(),name='layer-dropdown')
    
] 
