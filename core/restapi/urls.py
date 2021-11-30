from rest_framework.routers import DefaultRouter
from django.urls import include, path, re_path
from rest_framework import permissions

# Application imports
from restapi.views import (
    # UserList, UserDetails,
    # LoginAPI, 
    CompanyList, typeProductList, typeProductDetail,
    CityList, CityDetail, SubRegionList, SubRegionDetail, RegionList, RegionDetail, CountryList, CountryDetail
    )
from restapi import views

# Third party imoprts
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from knox import views as knox_views


schema_view = get_schema_view(
        openapi.Info(
                    title="Ligeia API",
                    default_version='/api/v1',
                    description="API docs for Ligeia backend",
                    terms_of_service="https://www.google.com/policies/terms/",
                    contact=openapi.Contact(email="cio@exiverprojects.com"),
                    license=openapi.License(name="BSD License"),
                ),
        public=True,
        permission_classes=(permissions.AllowAny,),
    )

# Routers definitions
routers = DefaultRouter()
# routers.register("user", UserModelViewSet, basename="user_endpoint")
# routers.register('user-details', UserDetails, basename='user_details')
# routers.register('sites', SiteModelViewSet, basename='sites')
# routers.register('wells', WellModelViewSet, basename='wells')
routers.register('companies', CompanyList, basename='companies')
# routers.register('typeproduct', typeProductViewSet, basename='typeproducts')
# routers.register('well-control', WellControllerModelViewSet, basename='well_control')

# URLpatterns definitions

urlpatterns = [
    # city_lights_path
    re_path(r'^cities/$', CityList.as_view(), name='cities_light_api_city_list'),
    re_path(r'^cities/(?P<pk>[^/]+)/$', CityDetail.as_view(), name='cities_light_api_city_detail'),
    re_path(r'^subregions/$', SubRegionList.as_view(), name='cities_light_api_subregion_list'),
    re_path(r'^subregions/(?P<pk>[^/]+)/$', SubRegionDetail.as_view(), name='cities_light_api_subregion_detail'),
    re_path(r'^regions/$', RegionList.as_view(), name='cities_light_api_region_list'),
    re_path(r'^regions/(?P<pk>[^/]+)/$', RegionDetail.as_view(), name='cities_light_api_region_detail'),
    re_path(r'^countries/$', CountryList.as_view(), name='cities_light_api_country_list'),
    re_path(r'^countries/(?P<pk>[^/]+)/$', CountryDetail.as_view(), name='cities_light_api_country_detail'),

    # db_dictionaries path
    re_path(r'^typeproduct/$', typeProductList.as_view(), name='typep_product_list'),
    re_path(r'^typeproduct/(?P<pk>[^/]+)/$', typeProductDetail.as_view(), name='typep_product_detail'),

    # path('companies/(?P<pk>[^/.]+)/$', CompanyList.as_view()),
    # path('get-auth-token/', views.LoginAPI.as_view(), name='api_token_auth'),
    path('knox-logout/', knox_views.LogoutView.as_view()),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),    
]

urlpatterns += routers.urls