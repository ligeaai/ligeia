from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import ItemLinkSaveView,ItemLinkDeleteView,ItemLinkDetailsView,ItemLinkUpdateView,ItemLinkHierarchyView,ItemLinkCardinaltyView,TagsLinksView

urlpatterns = [
    path("save/", ItemLinkSaveView.as_view(), name="itemlinksave"),
    path("update/", ItemLinkUpdateView.as_view(), name="itemlinkupdate"),
    path("delete/", ItemLinkDeleteView.as_view(), name="itemlinkdelete"),
    path("details/", ItemLinkDetailsView.as_view(), name="itemlinkdetails"),
    path("hierarchy/", ItemLinkHierarchyView.as_view(), name="hierarchy"),
    path("cardinalty/", ItemLinkCardinaltyView.as_view(), name="cardinalty"),
    path("tags/", TagsLinksView.as_view(), name="cardinalty"),
   
]
