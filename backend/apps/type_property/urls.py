from django.urls import include, path, re_path
from .views import TypePropertyView,TypePropertySaveView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", TypePropertySaveView.as_view(),name='PropertySave'),
    path("scripts/", TypePropertyView.as_view(),name='Property'),
    
] 