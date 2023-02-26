from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import DashBoardsView, DashBoardsSaveView

urlpatterns = [
    path("get/", DashBoardsView.as_view(), name="dashBoardList"),
    path("save/", DashBoardsSaveView.as_view(), name="dashBoardSave"),
]
