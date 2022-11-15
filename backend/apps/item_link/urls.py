from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import ItemLinkSaveView,ItemLinkDeleteView,ItemLinkDetailsView,ItemLinkUpdateView,ItemLinkDenemesView

urlpatterns = [
    path("save/", ItemLinkSaveView.as_view(), name="itemlinksave"),
    path("update/", ItemLinkUpdateView.as_view(), name="itemlinkupdate"),
    path("delete/", ItemLinkDeleteView.as_view(), name="itemlinkdelete"),
    path("details/", ItemLinkDetailsView.as_view(), name="itemlinkdetails"),
   path("deneme/", ItemLinkDenemesView.as_view(), name="deneme"),
]
