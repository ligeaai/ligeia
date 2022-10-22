from django.urls import include, path, re_path
<<<<<<< Updated upstream
from .views import LayerView, LayerSaveView
from django.urls.resolvers import URLPattern

urlpatterns = [
    path("save/", LayerSaveView.as_view(), name="code-list-save"),
    path("scripts/", LayerView.as_view(), name="code-list"),
]
=======
from .views import LayerView,LayerSaveView,LayerModelViewSet
from django.urls.resolvers import URLPattern 
urlpatterns = [
    
    path("save/", LayerSaveView.as_view(),name='code-list-save'),
    path("scripts/", LayerView.as_view(),name='code-list'),
    path("details/", LayerModelViewSet.as_view(),name='code-list'),
    
] 
>>>>>>> Stashed changes
