from django.urls import include, path, re_path
from .views import (CodeListSaveScriptView,
                    CodeListView,CodeListDetailView,
                    CodeListDeleteView,
                    CodeListDeepDetailView,CodeListParentDeleteView,
                    CodeListSaveAndUpdateView,
                    CodeListDeleteChildView,
                    CodeListSaveAndUpdateNewView,
                    CodeListCultureView,
                    CodeListParentView,
                    CodeListTypeDetailView,)
from django.urls.resolvers import URLPattern 
urlpatterns = [
    # path("codelistchild/",CodeListSaveView.as_view(),name='code-list-and-child-create'),
    path("save/", CodeListSaveScriptView.as_view(),name='code-list-save'),
    path("culture/", CodeListCultureView.as_view(),name='code-list-culture'),
    path("save-update/", CodeListSaveAndUpdateView.as_view(),name='code-list-save-update'),
    path("save-update-new/", CodeListSaveAndUpdateNewView.as_view(),name='code-list-save-update'),
    path("scripts/", CodeListView.as_view(),name='code-list'),
    path("details/", CodeListDetailView.as_view(),name='clDetails'),
    path("details/parent/", CodeListParentView.as_view(),name='clDetailsParent'),
    path("deep-details/", CodeListDeepDetailView.as_view(),name='clDetails'),
    path("delete-child/", CodeListDeleteChildView.as_view(),name='code-list-delete-child'),
    path("delete/", CodeListDeleteView.as_view(),name='code-list-delete-child'),
    path("delete-parent/", CodeListParentDeleteView.as_view(),name='code-list-delete-parent'),
    path("property-code/", CodeListTypeDetailView.as_view(),name='PropertyCode'),
    
    
] 