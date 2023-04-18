from django.urls import include, path, re_path
from .views import (
    ResourceTypesSaveView,
    ResourceTypesView,
    ResourceTypesDetailView,
    ResourceTypesDrawerMenutView,
    ResourceTypesEditorTreeMenuView,
    ResourceTypesEditorHierarchyView,
)
from django.urls.resolvers import URLPattern
from .elasticsearch.es_view import ESResourceTypesViewSet
# from .userViews import ResourceTypesUserDrawerMenutView,DrawerView


urlpatterns = [
    path("save/", ResourceTypesSaveView.as_view(), name="code-list-save"),
    path("scripts/", ResourceTypesView.as_view(), name="code-list"),
    # path("details/", ResourceTypesDetailView.as_view(), name="clDetails"),
    # # path("menu/", ResourceTypesDrawerMenutView.as_view(), name="clDetails"),
    # # path("menu/user/", ResourceTypesUserDrawerMenutView.as_view(), name="clDetails"),
    # path("parent/", ResourceTypesEditorTreeMenuView.as_view(), name="parent"),
    # path("hierarchy/", ResourceTypesEditorHierarchyView.as_view(), name="hierarchy"),
    # path("es/", ESResourceTypesViewSet.as_view({"get": "list"}), name=""),
    
    # path("menu/", DrawerView.as_view(), name="test"),
]
