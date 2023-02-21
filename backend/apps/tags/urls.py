from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (
    TagsDetailsView,
    TagsSaveView,
    TagsDeleteView,
    TagsPropertysView,
    TagsTypeLinkView,
    TagsNameViews,
    TagsSearchViews,
    TagsSpesificDetailsView,
)
from .elasticsearch.es_view import ESBlogViewSet

urlpatterns = [
    path("save/", TagsSaveView.as_view(), name="tags save "),
    path("delete/", TagsDeleteView.as_view(), name="tags delete "),
    path("details/", TagsDetailsView.as_view(), name="tags details"),
    path("tags-property/", TagsPropertysView.as_view(), name="tags property"),
    # path("detailsold/",TypeDetailView.as_view() ,name='typeDetails'),#TypeDetailView.as_view()
    path("links/", TagsTypeLinkView.as_view(), name="tags link"),
    path("item/", TagsSpesificDetailsView.as_view(), name="tags link"),
    path("name/", TagsNameViews.as_view(), name="tags name"),
    path("es/<str:name>", ESBlogViewSet.as_view({"get": "list"}), name=""),
]
