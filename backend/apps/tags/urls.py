from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (TagsDetailsView,TagsSaveView,TagsDeleteView)

urlpatterns = [
    
    path("save/", TagsSaveView.as_view(),name='tags save '),
    path("delete/", TagsDeleteView.as_view(),name='tags delete '),
    path("details/",TagsDetailsView.as_view() ,name='tags details'),
    # path("detailsold/",TypeDetailView.as_view() ,name='typeDetails'),#TypeDetailView.as_view()
    
] 