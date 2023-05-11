from django.urls import include, path
from .views import DjangoHealthView

urlpatterns = [
    # base
    path("layer/", include("apps.layer.urls")),
    path("code-list/", include("apps.code_list.urls")),
    # items
    path("item/", include("apps.item.urls")),
    path("item-link/", include("apps.item_link.urls")),
    path("item-property/", include("apps.item_property.urls")),
    # types
    path("type/", include("apps.type.urls")),
    path("type-link/", include("apps.type_link.urls")),
    path("type-property/", include("apps.type_property.urls")),
    # tags
    path("tags/", include("apps.tags.urls")),
    path("tags_calcuated/", include("apps.tags_calculated.urls")),
    # resources
    path("resources-types/", include("apps.resources_types.urls")),
    path("resource-drawer/", include("apps.resources_drawer.urls")),
    # uom
    path("uom/", include("apps.uom.urls")),
    path("uom-unit/", include("apps.uom_base_unit.urls")),
    # bi related
    path("layouts/", include("apps.bi_layouts.urls")),
    path("dashboard/", include("apps.bi_dashbord.urls")),
    path("widgets/", include("apps.bi_widgets.urls")),
    path("widgets-type/", include("apps.bi_widget_type.urls")),
    path("widget-property/", include("apps.bi_widget_property.urls")),
    # authorization
    path("auth/", include("apps.users.urls")),
    path("roles/", include("apps.roles.urls")),
    path("roles-type/", include("apps.roles_type.urls")),
    path("roles-property/", include("apps.roles_property.urls")),
    # other
    path("workflows/", include("apps.workflows.urls"), name="workflows"),
    path("health/", DjangoHealthView.as_view(), name="healt status"),
    path("notifications/", include("apps.notifications.urls")),
]
