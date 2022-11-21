from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import ItemScriptSaveView, ItemView,ItemSaveView,ItemDetailsView,ItemDeleteView

urlpatterns = [
    path("save/", ItemSaveView.as_view(), name="itemsave"),
    path("item-and-property/", ItemScriptSaveView.as_view(), name="itemsave"),
    path("delete/", ItemDeleteView.as_view(), name="itemsave"),
    path("scripts/", ItemView.as_view(), name="itemscript"),
    path("details/<str:item>", ItemDetailsView.as_view(),name='typeDetails'),

]
