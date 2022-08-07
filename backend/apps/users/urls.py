from django.urls import include, path, re_path
from django.utils.translation import gettext_lazy as _
from knox import views as knox_views

from .views import (
    UserDetail, UserList,
    UserLoginView, UserRegisterView, 
    UserChangePassword, 
    # ResetPassword,
    UserConfirmEmailView, UserEmailConfirmationStatusView
)

urlpatterns = [
    # path(_(''), include('knox.urls')),   
    path(_('login/'), UserLoginView.as_view(), name='login'),
    path(_('logout/'), knox_views.LogoutView.as_view(), name="knox-logout"),
    path(_('register/'), UserRegisterView.as_view(), name='register'),
    path(_('change-password/'), UserChangePassword.as_view(), name='changepassword'),
    # path(_('reset-password'), ResetPassword.as_view(), name='resetpassword'),
    re_path(_(r'^users/$'), UserList.as_view(), name='users'),
    re_path(_(r'^user-details/([0-9])$'), UserDetail.as_view(), name="user-details"),

    # re_path(_(r'confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    # re_path(_(r'status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]
