from django.urls import include, path
from .views import DjangoHealthView

urlpatterns = [
    path("auth/", include("apps.users.urls")),
    path("layer/", include("apps.layer.urls")),
    path("type/", include("apps.type.urls")),
    path("type-link/", include("apps.type_link.urls")),
    path("type-property/", include("apps.type_property.urls")),
    path("item/", include("apps.item.urls")),
    path("item-property/", include("apps.item_property.urls")),
    path("code-list/", include("apps.code_list.urls")),
    path("resource-drawer/", include("apps.resources_drawer.urls")),
    path("item-link/", include("apps.item_link.urls")),
    path("tags/", include("apps.tags.urls")),
    path("uoms/", include("apps.uoms.urls")),
    path("uom_unit/", include("apps.uom_base_unit.urls")),
    path("notifications/", include("apps.notifications.urls")),
    path("widget-property/", include("apps.bi_widget_property.urls")),
    path("dashboard/", include("apps.bi_dashbord.urls")),
    path("layouts/", include("apps.bi_layouts.urls")),
    path("widgets/", include("apps.bi_widgets.urls")),
    path("roles-property/", include("apps.roles_property.urls")),
    path("roles/", include("apps.roles.urls")),
    path("roles-type/", include("apps.roles_type.urls")),
    path("resources-types/", include("apps.resources_types.urls")),
    
    path("health", DjangoHealthView.as_view(), name="healt status"),
]
