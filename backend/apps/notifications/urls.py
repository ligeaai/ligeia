from django.urls import include, path, re_path
from .views import FaultsOrAlertView
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("event/", FaultsOrAlertView.as_view(),name='alerts or notifications'),
   
    
] 
