from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from smart_selects import urls as smart_selects_urls
# from rest_framework.authtoken.views import obtain_auth_token


urlpatterns = [
    path('admin/', admin.site.urls),
    path(r'chaining/', include('smart_selects.urls')),
    path(r'api-auth/', include('rest_framework.urls')),
    # path(r'o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
    path(r'accounts/', include('allauth.urls')),

    # path('product/', include('altair_product.urls')),
    # path(r'api/', include('api.urls'), name='api'),
    # path('api-auth/', include('rest_framework.urls')),
    # path('auth/', obtain_auth_token),
    # path('ckeditor/', include('ckeditor_uploader.urls')),
] 
# + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL,
                          document_root=settings.MEDIA_ROOT)

admin.site.site_header = "Nordal Administration"
admin.site.site_title = "Nordal Administration Portal"
admin.site.index_title = "Welcome to Nordal Administration Portal"                          
