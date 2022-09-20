from django.urls import include, path, re_path
from knox import views as knox_views

from rest_framework.routers import DefaultRouter

from .views import (
    ResetPassword,
    UserDetail,
    UserList,
    UserLoginView,
    UserRegisterView,
    UserChangePassword,
    ResetPassword,
    UserConfirmEmailView,
    UserEmailConfirmationStatusView,
    UserModelViewSet,
    UserDetails,
<<<<<<< HEAD
    FacebookLogin,
    GoogleLogin,
=======
    ResetNewPassword,
>>>>>>> b2648357483638074c8b6e1e17e87bdf83b25cc8
)
routers = DefaultRouter()
routers.register("users", UserModelViewSet, basename="users")
# routers.register("users-details", UserDetails, basename="users-details")

urlpatterns = [
   
    # path("", include("knox.urls")),
    path('google/', GoogleLogin.as_view(),name="google"),
    path("facebook/", FacebookLogin.as_view(), name="facebook"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    path("logoutall/", knox_views.LogoutAllView.as_view(), name="logoutall"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("change-password/", UserChangePassword.as_view(), name="change_password"),
    path("api-auth/", include("rest_framework.urls")),
    path("reset-password/", ResetPassword.as_view(), name="resetpassword"),
    path("reset-new-password/<token>/", ResetNewPassword.as_view(), name="resetnewpassword"),
    # re_path(r"^user/$", UserList.as_view(), name="user"),
    # re_path(r"^user-detail/([0-9])$", UserDetail.as_view(), name="user-detail"),
    # re_path(_(r'confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    # re_path(_(r'status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]

urlpatterns += routers.urls
