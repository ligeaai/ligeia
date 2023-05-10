from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (
    TagsDetailsView,
    TagsSaveView,
    TagsDeleteView,
    TagsPropertysView,
    TagsTypeLinkView,
    TagsNameViews,
    TagsSpesificDetailsView,
    TagsUomConversionView,
    TagsImportView,
    TagsImportDeleteView,
    TagsImportHistoryListView,
    TagsImportHistoryView,
)

from .elasticsearch.es_view import ESBlogViewSet

urlpatterns = [
    path("save/", TagsSaveView.as_view(), name="tags save "),
    path("import/", TagsImportView.as_view(), name="tags save "),
    path(
        "import/history/list/",
        TagsImportHistoryListView.as_view(),
        name="import/histroy/list/",
    ),
    path("import/delete/", TagsImportDeleteView.as_view(), name="tags save "),
    path(
        "import/history/<str:keys>/",
        TagsImportHistoryView.as_view(),
        name="tags delete ",
    ),
    path("delete/", TagsDeleteView.as_view(), name="tags delete "),
    path("details/", TagsDetailsView.as_view(), name="tags details"),
    path("tags-property/", TagsPropertysView.as_view(), name="tags property"),
    # path("detailsold/",TypeDetailView.as_view() ,name='typeDetails'),#TypeDetailView.as_view()
    path("links/", TagsTypeLinkView.as_view(), name="tags link"),
    path("item/", TagsSpesificDetailsView.as_view(), name="tags link"),
    path("name/", TagsNameViews.as_view(), name="tags name"),
    path("uom-converison/", TagsUomConversionView.as_view(), name="tags name"),
    path("es/<str:name>", ESBlogViewSet.as_view({"get": "list"}), name=""),
]
