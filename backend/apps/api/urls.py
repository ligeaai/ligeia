from django.urls import include, path

urlpatterns = [
    path("auth/", include("apps.users.urls")),
    path("type/", include("apps.type.urls")),
    path("type-link/", include("apps.type_link.urls")),
    path("type-property/", include("apps.type_property.urls")),
    path("code-list/", include("apps.code_list.urls")),
    path("resource-list/", include("apps.resource_list.urls")),
]
