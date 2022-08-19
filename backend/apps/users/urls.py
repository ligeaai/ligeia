from django.urls import include, path, re_path
from knox import views as knox_views

from .views import (
    UserDetail,
    UserList,
    UserLoginView,
    UserRegisterView,
    UserChangePassword,
    # ResetPassword,
    UserConfirmEmailView,
    UserEmailConfirmationStatusView,
)

urlpatterns = [
    # path("", include("knox.urls")),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
    # path("register/", UserRegisterView.as_view(), name="register"),
    # path("change-password/", UserChangePassword.as_view(), name="changepassword"),
    # path(_('reset-password'), ResetPassword.as_view(), name='resetpassword'),
    re_path(r"^users/$", UserList.as_view(), name="users"),
    re_path(r"^user-details/([0-9])$", UserDetail.as_view(), name="user-details"),
    # re_path(_(r'confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    # re_path(_(r'status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]
