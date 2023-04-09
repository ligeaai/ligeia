from django.urls import include, path, re_path
from .views import RolesTypeSaveView,RolesTypeGetView
from django.urls.resolvers import URLPattern 


urlpatterns = [
    
    path("save/", RolesTypeSaveView.as_view(),name='RolesTypeSaveView'),
    path("get/", RolesTypeGetView.as_view(),name='layert-save'),
    
    
] 
