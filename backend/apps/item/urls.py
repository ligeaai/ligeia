from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import ItemScriptSaveView, ItemView

urlpatterns = [
    path("save/", ItemScriptSaveView.as_view(), name="itemsave"),
    path("scripts/", ItemView.as_view(), name="itemscript")
    # path("details/", TypeDetailView.as_view(),name='typeDetails'),
]
