from django.conf import settings
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.decorators.cache import cache_page

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

from django.conf.urls.static import static
from django.conf import settings
from django.conf.urls.i18n import i18n_patterns
from django.utils.translation import gettext_lazy as _

from apps.code_list.views import code_list_view

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

urlpatterns = [
    path("code_list/", code_list_view.as_view()),
    # path('api/v1/code_list/', include("apps.codelist.urls")),
    # path("add-data/", add_data),
    # path("temp/", index),
    # path("", include("social_django.urls", namespace="social")),
    # path("auth/", auth),
    path("users/", include(("apps.users.urls", "apps.users"), namespace="users")),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
]
