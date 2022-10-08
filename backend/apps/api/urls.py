from django.urls import include, path


urlpatterns = [
    path("auth/", include('apps.users.urls')),
    path("type/", include('apps.type.urls')),
    path("type-property/", include('apps.type_property.urls')),
]