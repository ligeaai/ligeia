from rest_framework.routers import DefaultRouter
from django.urls import include, path, re_path
from rest_framework import permissions

# Application imports
from restapi.views import (UserModelViewSet, UserDetails,
                             LoginAPI, DeviceModelViewSet, WellModelViewSet,
                             SiteModelViewSet, WellControllerModelViewSet)
from restapi import views

# Third party imoprts
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from knox import views as knox_views


schema_view = get_schema_view(
        openapi.Info(
                    title="Nordal API",
                    default_version='/api/v1',
                    description="API docs for Nordal backend",
                    terms_of_service="https://www.google.com/policies/terms/",
                    contact=openapi.Contact(email="cio@exiverprojects.com"),
                    license=openapi.License(name="BSD License"),
                ),
        public=True,
        permission_classes=(permissions.AllowAny,),
    )

# Routers definitions
routers = DefaultRouter()
routers.register("user", UserModelViewSet, basename="user_endpoint")
routers.register('user-details', UserDetails, basename='user_details')
# routers.register('sites', SiteModelViewSet, basename='sites')
# routers.register('wells', WellModelViewSet, basename='wells')
# routers.register('devices', DeviceModelViewSet, basename='devices')
# routers.register('well-control', WellControllerModelViewSet, basename='well_control')

# URLpatterns definitions

urlpatterns = [
    path('get-auth-token/', views.LoginAPI.as_view(), name='api_token_auth'),
    path('knox-logout/', knox_views.LogoutView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    
]

urlpatterns += routers.urls