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
    path("resource-list/", include("apps.resource_list.urls")),
    path("item-link/", include("apps.item_link.urls")),
    path("tags/", include("apps.tags.urls")),
    path("uoms/", include("apps.uoms.urls")),
    path("uom_unit/", include("apps.uom_base_unit.urls")),
    path("notifications/", include("apps.notifications.urls")),
    path("widget-property/", include("apps.widget_property.urls")),
    path("dashboard/", include("apps.dashbord.urls")),
    path("layouts/", include("apps.layouts.urls")),
    path("widgets/", include("apps.widgets.urls")),
    path("roles/", include("apps.roles_type.urls")),
    path("health", DjangoHealthView.as_view(), name="healt status"),
]
