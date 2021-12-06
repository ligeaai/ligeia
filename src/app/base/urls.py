from django.urls import path

from app.base import views as base_views

urlpatterns = [
    path(r'', base_views.ProtectedDataView.as_view(), name='protected_data'),
]
