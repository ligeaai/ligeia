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

from apps.base import views as base_views

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


urlpatterns = i18n_patterns (
    path(_("admin/"), admin.site.urls),
    path("health", include("health_check.urls")),
    path("rosetta/", include("rosetta.urls")),
    path("api/v1/users/", include(("apps.users.urls", "apps.users"), namespace="users")),
    path("api/v1/citylight/", include(("apps.citylight.urls", "apps.citylight"), namespace="citylight")),
    path("api/v1/models/", include(("apps.db_models.urls", "apps.db_models"), namespace="models")),
    # path('api/v1/getdata/', include(('app.base.urls', 'app.base'), namespace='base')),
    # catch all others because of how history is handled by react router -
    # cache this page because it will never change
    # path('', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r"^swagger/$", schema_view.with_ui("swagger", cache_timeout=0), name="schema-swagger-ui"),
    re_path(r"^redoc/$", schema_view.with_ui("redoc", cache_timeout=0), name="schema-redoc"),
) + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = _("Ligeia Administration")
admin.site.site_title = _("Ligeia")
admin.site.index_title = _("Welcome to Ligeia")
admin.site.site_url = "/admin"
