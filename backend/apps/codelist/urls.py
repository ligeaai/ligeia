from django.urls import path

from apps.codelist.views import add_data

urlpatterns = [
    path('', index),
    path('add-data/', add_data)
]
