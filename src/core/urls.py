from django.conf import settings
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.decorators.cache import cache_page

from app.base import views as base_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('health', include('health_check.urls')),

    path('api/v1/', include(('app.accounts.urls', 'app.accounts'), namespace='accounts')),
    # path(r'api/v1/getdata/', include(('apps.base.urls', 'apps.base'), namespace='base')),

    # catch all others because of how history is handled by react router -
    # cache this page because it will never change
    # path(r'', cache_page(settings.PAGE_CACHE_SECONDS)(base_views.IndexView.as_view()), name='index'),
]

admin.site.site_header = "Ligeia Administration"
admin.site.site_title = "Ligeia"
admin.site.index_title = "Welcome to Ligeia" 
admin.site.site_url= '/admin'