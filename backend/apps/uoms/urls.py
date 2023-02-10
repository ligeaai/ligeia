from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

<<<<<<< HEAD
from .views import (UomSaveView,
                    UOMScriptView,
                    UomDetialsView,
                    UomEditorSaveUpdateView,
                    UomDeleteView)

urlpatterns = [
    
    path("save/", UomSaveView.as_view(),name='UomSave'),
    path("scripts/", UOMScriptView.as_view(),name='Scripts'),
    path("details/", UomDetialsView.as_view(),name='details'),
    path("save-update/", UomEditorSaveUpdateView.as_view(),name='save-update'),
    path("delete/", UomDeleteView.as_view(),name='delete'),
    
] 
=======
from .views import UomSaveView, UOMScriptView, UomDetialsView

urlpatterns = [
    path("save/", UomSaveView.as_view(), name="UomSave"),
    path("scripts/", UOMScriptView.as_view(), name="Scripts"),
    path("details/", UomDetialsView.as_view(), name="details"),
]
>>>>>>> 64c185013f31d36413e41c9056b6647808f37526
