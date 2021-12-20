from rest_framework.routers import DefaultRouter

from .views import (
    CompanyView,
    FieldView,
    BatteryView,
)

routers = DefaultRouter()

routers.register("company", CompanyView, basename="company")
routers.register("field", FieldView, basename="field")
routers.register("battery", BatteryView, basename="battery")

urlpatterns = []

urlpatterns += routers.urls
