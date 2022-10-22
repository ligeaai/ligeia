from django.urls import include, path, re_path
from django.urls.resolvers import URLPattern

<<<<<<< Updated upstream
from .views import ItemPropertyScriptSaveView, ItemPropertyView

urlpatterns = [
    path("save/", ItemPropertyScriptSaveView.as_view(), name="item-prop-save"),
    path("scripts/", ItemPropertyView.as_view(), name="item-prop-script")
    # path("details/", TypeDetailView.as_view(),name='typeDetails'),
]
=======
from .views import (ItemPropertyScriptSaveView,ItemPropertyView,ItemPropertyDetailsView)

urlpatterns = [
    
    path("save/", ItemPropertyScriptSaveView.as_view(),name='item-prop-save'),
    path('scripts/',ItemPropertyView.as_view(),name='item-prop-script'),
    path("details/", ItemPropertyDetailsView.as_view(),name='typeDetails'),
    
] 
>>>>>>> Stashed changes
