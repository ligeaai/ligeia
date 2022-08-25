from django.urls import include, path, re_path
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from rest_framework import permissions

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

urlpatterns = [
    path(
        "parsers/", include(("apps.parsers.urls", "apps.parsers"), namespace="parsers")
    ),
    path(
        "code_list/",
        include(("apps.code_list.urls", "apps.code_list"), namespace="code_list"),
    ),
    path("auth/", include(("apps.users.urls", "apps.users"), namespace="auth")),
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
