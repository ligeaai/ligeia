from django.urls import include, path, re_path
from .views import CodeListSaveScriptView,CodeListView,CodeListDetailView,CodeListSaveView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    path("deneme/",CodeListSaveView.as_view(),name='dee'),
    path("save/", CodeListSaveScriptView.as_view(),name='code-list-save'),
    path("scripts/", CodeListView.as_view(),name='code-list'),
    path("details/", CodeListDetailView.as_view(),name='clDetails'),
    
] 