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

# from apps.base import views as base_views


urlpatterns = (
    i18n_patterns(
        path(_("admin/"), admin.site.urls),
        path("health/", include("health_check.urls")),
        path("rosetta/", include("rosetta.urls")),
        # API urls
        path("api/v1/", include('apps.api.urls')),
    )
    + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
)

admin.site.site_header = _("Ligeia Administration")
admin.site.site_title = _("Ligeia")
admin.site.index_title = _("Welcome to Ligeia")
admin.site.site_url = "/admin"
