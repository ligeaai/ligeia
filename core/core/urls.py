from django.contrib import admin
from django.urls import include, path, re_path
from django.conf import settings
from django.conf.urls.static import static
from smart_selects import urls as smart_selects_urls
from admin import (
                # uom_set, 
                # item_company, item_field, item_battery, item_pump,
                # typeProduct, typeBattery, typePump, typeStatus,
                test
                )
from rest_framework import permissions

# admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include('restapi.urls')),
    # path(r'o/', include('oauth2_provider.urls', namespace='oauth2_provider')),


    # path('product/', include('altair_product.urls')),
    # path(r'api/', include('api.urls'), name='api'),
    # path('api-auth/', include('rest_framework.urls')),
    # path('auth/', obtain_auth_token),
    # path('ckeditor/', include('ckeditor_uploader.urls')),
] 

admin.site.site_header = "Nordal Administration"
admin.site.site_title = "Nordal Administration Portal"
admin.site.index_title = "Welcome to Nordal Administration Portal" 
admin.site.site_url= '/admin'