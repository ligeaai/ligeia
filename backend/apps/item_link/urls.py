from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import ItemLinkSaveView,ItemLinkDeleteView,ItemLinkDetailsView

urlpatterns = [
    path("save/", ItemLinkSaveView.as_view(), name="itemlinksave"),
    path("delete/", ItemLinkDeleteView.as_view(), name="itemlinkdelete"),
    path("details/", ItemLinkDetailsView.as_view(), name="itemlinkdetails"),
   
]
