from django.urls import include, path, re_path
from .views import RolesPropSaveView,RolesPropGetView
from django.urls.resolvers import URLPattern 


urlpatterns = [
    
    path("save/", RolesPropSaveView.as_view(),name='RolesPropSaveView'),
    path("get/", RolesPropGetView.as_view(),name='RolesPropGetView'),

    
] 
