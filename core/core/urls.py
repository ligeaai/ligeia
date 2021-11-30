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
from rest_framework.authtoken import views
from rest_framework_swagger.views import get_swagger_view


# admin.autodiscover()

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    re_path(r'^$', schema_view),
    path('admin/', admin.site.urls),
    path('api/v1/', include('restapi.urls')),
    path('api-auth/', include('rest_framework.urls')),
    path('api-token-auth/', views.obtain_auth_token),
    path('rest-auth/', include('rest_auth.urls')),        
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    
    path('chaining/', include('smart_selects.urls')),
    path('accounts/', include('allauth.urls')),


    # path('rest-auth/google/$', FacebookLogin.as_view(), name='fb_login'),

    # path('product/', include('altair_product.urls')),
    # path(r'api/', include('api.urls'), name='api'),
    # path('api-auth/', include('rest_framework.urls')),
    # path('auth/', obtain_auth_token),
    # path('ckeditor/', include('ckeditor_uploader.urls')),
] 

admin.site.site_header = "Ligeia Administration"
admin.site.site_title = "Ligeia"
admin.site.index_title = "Welcome to Ligeia" 
admin.site.site_url= '/admin'