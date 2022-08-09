from django.urls import path

from .views import *

urlpatterns = [
    path('', index),
    path('add-data/', add_data)
]
