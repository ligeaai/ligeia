from django.urls import include, path, re_path
from .views import PageResourceListView,PageResourceListCreateView,PageResourceListDetailsView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("scripts/", PageResourceListView.as_view(),name='page_resource_list_script'),
    path("details/", PageResourceListDetailsView.as_view(),name='page_resource_list_details'),
    path("save/", PageResourceListCreateView.as_view(),name='page_resource_list_save'),
    
] 
