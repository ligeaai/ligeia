from .views import code_list_chema_view,code_list_listtype_view
from rest_framework.routers import DefaultRouter
from django.urls import path

routers = DefaultRouter()
routers.register("code_list_listtype", code_list_listtype_view, basename="kitap-list-listtype")

urlpatterns = [
  path('code_list_schema/',code_list_chema_view.as_view({"get":"list"}), name='code-list'),
]
urlpatterns += routers.urls
