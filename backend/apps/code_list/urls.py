from .views import code_list_view
from rest_framework.routers import DefaultRouter


routers = DefaultRouter()
routers.register("code_list", code_list_view, basename="code_list")

urlpatterns = []
urlpatterns += routers.urls
