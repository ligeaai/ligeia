from django.urls import include, path, re_path
from .views import ResourceListSaveView,ResourceListView,ResourceListDetailView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", ResourceListSaveView.as_view(),name='code-list-save'),
    path("scripts/", ResourceListView.as_view(),name='code-list'),
    path("details/", ResourceListDetailView.as_view(),name='clDetails'),
    
] 