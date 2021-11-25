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
    # path('post-admin/', test.urls),
    path('chaining/', include('smart_selects.urls')),
    # path('api-auth/', include('rest_framework.urls')),
    path('rest-auth/', include('rest_auth.urls')),        
    path('rest-auth/registration/', include('rest_auth.registration.urls')),
    # path('rest-auth/google/$', FacebookLogin.as_view(), name='fb_login'),
    path('api/v1/', include('restapi.urls')),
    # path(r'o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path('accounts/', include('allauth.urls')),

    # path('get-auth-token/', views.LoginAPI.as_view(), name='api_token_auth'),
    # path('knox-logout/', knox_views.LogoutView.as_view()),
    # re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    # re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    # re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),


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