from django.urls import include, path, re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf import settings
from django.utils.translation import gettext_lazy as _
from rest_framework.routers import DefaultRouter


from apps.code_list.views import code_list_view
from apps.parsers.views import add_data

# , index, add_data


# from apps.api.views import auth

schema_view = get_schema_view(
    openapi.Info(
        title="Ligeia API",
        default_version="/api/v1",
        description="API docs for Ligeia",
        terms_of_service="https://www.google.com/policies/terms/",
        contact=openapi.Contact(email="info@ligeia.ai"),
        license=openapi.License(name="BSD License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

routers = DefaultRouter()
routers.register("code_list", code_list_view, basename="code_list")

urlpatterns = [
    path("add-data/", add_data),
    # path("temp/", index),
    path('accounts/', include('allauth.urls')),
    path("auth/", include(("apps.users.urls", "apps.users"), namespace="users")),
    re_path(
        r"^swagger(?P<format>\.json|\.yaml)$",
        schema_view.without_ui(cache_timeout=0),
        name="schema-json",
    ),
    re_path(
        r"^swagger/$",
        schema_view.with_ui("swagger", cache_timeout=0),
        name="schema-swagger-ui",
    ),
    re_path(
        r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"
    ),
]

urlpatterns += routers.urls
