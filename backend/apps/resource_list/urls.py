from django.urls import include, path, re_path
from .views import (
    ResourceListSaveView,
    ResourceListView,
    ResourceListDetailView,
    ResourceListDrawerMenutView,
    ResourceListEditorTreeMenuView,
    ResourceListEditorHierarchyView,
)
from django.urls.resolvers import URLPattern
from .elasticsearch.es_view import ESResourceListViewSet
from .userViews import ResourceListUserDrawerMenutView,DrawerView


urlpatterns = [
    path("save/", ResourceListSaveView.as_view(), name="code-list-save"),
    path("scripts/", ResourceListView.as_view(), name="code-list"),
    path("details/", ResourceListDetailView.as_view(), name="clDetails"),
    path("menu/", ResourceListDrawerMenutView.as_view(), name="clDetails"),
    path("menu/user/", ResourceListUserDrawerMenutView.as_view(), name="clDetails"),
    path("parent/", ResourceListEditorTreeMenuView.as_view(), name="parent"),
    path("hierarchy/", ResourceListEditorHierarchyView.as_view(), name="hierarchy"),
    path("es/", ESResourceListViewSet.as_view({"get": "list"}), name=""),
    
    path("test/", DrawerView.as_view(), name="test"),
]
