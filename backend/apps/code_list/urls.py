from django.urls import include, path, re_path
from .views import CodeListSaveScriptView,CodeListView,CodeListDetailView,CodeListDeleteView,CodeListDeepDetailView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    # path("codelistchild/",CodeListSaveView.as_view(),name='code-list-and-child-create'),
    path("save/", CodeListSaveScriptView.as_view(),name='code-list-save'),
    path("scripts/", CodeListView.as_view(),name='code-list'),
    path("details/", CodeListDetailView.as_view(),name='clDetails'),
    path("deep-details/", CodeListDeepDetailView.as_view(),name='clDetails'),
    path("delete/", CodeListDeleteView.as_view(),name='code-list-delete'),
    
] 