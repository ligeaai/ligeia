from django.urls import include, path, re_path
from .views import CodeListSaveView,CodeListView,CodeListDetailView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", CodeListSaveView.as_view(),name='code-list-save'),
    path("scripts/", CodeListView.as_view(),name='code-list'),
    path("details/", CodeListDetailView.as_view(),name='clDetails'),
    
] 