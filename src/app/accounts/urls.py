from django.urls import include, path, re_path
from django.utils.translation import ugettext_lazy as _
from knox import views as knox_views

from .views import (
    UserView, UserDetails,
    UserLoginView, UserRegisterView, 
    UserConfirmEmailView, UserEmailConfirmationStatusView
)

urlpatterns = [
    # path(_(''), include('knox.urls')),
    re_path(_(r'^user/$'), UserView.as_view(), name="user"),
    re_path(_(r'^user-details/(?P<pk>[^/]+)/$'), UserDetails.as_view(), name="user-details"),
    path(_('register'), UserRegisterView.as_view(), name='register'),
    path(_('login'), UserLoginView.as_view(), name='login'),
    path(_('logout'),knox_views.LogoutView.as_view(), name="knox-logout"),

    re_path(_(r'confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    re_path(_(r'status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]
