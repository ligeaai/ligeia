from django.urls import include, path, re_path
from .views import RolesSaveView,RolesGetView,RolesDeleteView
from django.urls.resolvers import URLPattern 


urlpatterns = [
    
    path("save/", RolesSaveView.as_view(),name='RolesSaveView'),
    path("get/", RolesGetView.as_view(),name='RolesGetView'),
    path("delete/", RolesDeleteView.as_view(),name='RolesDeleteView'),

    
] 
