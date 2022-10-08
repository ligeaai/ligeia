from django.urls import include, path, re_path
from .views import TypeSaveView,TypeView,TypeDetailView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", TypeSaveView.as_view(),name='typeSave'),
    path("scripts/", TypeView.as_view(),name='type'),
    path("details/", TypeDetailView.as_view(),name='typeDetails'),
    
] 