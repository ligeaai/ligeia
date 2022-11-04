from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

from .views import (ItemPropertyScriptSaveView,
                    ItemPropertyView,
                    ItemPropertyDetailsView,
                    ItemPropertyDeleteView
                    )

urlpatterns = [
    
    path("save/", ItemPropertyScriptSaveView.as_view(),name='item-prop-save'),
    path('scripts/',ItemPropertyView.as_view(),name='item-prop-script'),
    path("details/", ItemPropertyDetailsView.as_view(),name='typeDetails'),
    path("delete/", ItemPropertyDeleteView.as_view(),name='typeDelete'),
    
] 
