from django.urls import include, path, re_path
from django.utils.translation import ugettext_lazy as _
from knox import views as knox_views

from .views import (
    UserLoginView, UserRegisterView, UserConfirmEmailView,
    UserEmailConfirmationStatusView
)

urlpatterns = [
    path(_('accounts/'), include('knox.urls')),
    path(_('accounts/register'), UserRegisterView.as_view(), name='register'),
    path(_('accounts/login'), UserLoginView.as_view(), name='login'),
    path(_('accounts/logout'),knox_views.LogoutView.as_view(), name="knox-logout"),

    re_path(_(r'^accounts/accounts/confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    re_path(_(r'^accounts/status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]
