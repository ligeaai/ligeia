from django.urls import include, path, re_path

# from knox import views as knox_views

from rest_framework.routers import DefaultRouter

from .views import (

    UserList,
    UserLoginView,
    UserRegisterView,
    UserChangePassword,
    ForgetPassword,
    UserConfirmEmailView,
    UserEmailConfirmationStatusView,
    UserModelViewSet,
    UserDetails,
    ResetForgetPassword,
    logout,
    UserLayerUpdate,
    UserRoleUpdate,
    GetUserRolesView,
    GetUserByRoleIdView,
    UserRoleDeleteView,
    UserCheckView
)
from .social_views import (
    FacebookLogin,
    GoogleLogin,
    GoogleRegister,
    FacebookRegister,
    GitHubLogin,
    github_callback,
)

from allauth.socialaccount.providers.github import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register("user-detail", UserDetails, basename="user-detail")
# routers.register("users-details", UserDetails, basename="users-details")

urlpatterns = [
    path("logout/", logout.as_view(), name="logout"),
    path("github/", GitHubLogin.as_view()),
    path("github/callback/", github_callback, name="github_callback"),
    path("github/url/", views.oauth2_login, name="github-url"),
    path("google/register", GoogleRegister.as_view(), name="google-register"),
    path("google/login", GoogleLogin.as_view(), name="google-login"),
    path("facebook/register", FacebookRegister.as_view(), name="google-register"),
    path("facebook/login", FacebookLogin.as_view(), name="google-login"),
    path("login/", UserLoginView.as_view(), name="login"),
    # path("", include("knox.urls")),
    # path('github/', GithubLogin.as_view(),name="github"),
    # path("logout/", knox_views.LogoutView.as_view(), name="logout"),
    # path("logoutall/", knox_views.LogoutAllView.as_view(), name="logoutall"),
    path("register/", UserRegisterView.as_view(), name="register"),
    path("change-password/", UserChangePassword.as_view(), name="change_password"),
    path("api-auth/", include("rest_framework.urls")),
    path("Forget-password/", ForgetPassword.as_view(), name="resetpassword"),
    path(
        "reset-new-password/<token>/",
        ResetForgetPassword.as_view(),
        name="resetnewpassword",
    ),
    
    path("user/check/", UserCheckView.as_view(), name="UserCheckView"),
    path("users/get/roleid/", GetUserByRoleIdView.as_view(), name="GetUserByRoleIdView"),
    path("users/roles/", GetUserRolesView.as_view(), name="GetUserRolesView"),
    path("user/layer/update/", UserLayerUpdate.as_view(), name="UserLayerUpdate"),
    path("user/role/update/", UserRoleUpdate.as_view(), name="UserRoleUpdate"),
    path("user/role/delete/", UserRoleDeleteView.as_view(), name="UserRoleDeleteView"),
    path("user-list/", UserList.as_view(), name="userlist"),
    path("user-detail/", UserDetails.as_view(), name="UserDetails")
    # re_path(r"^user/$", UserList.as_view(), name="user"),
    # re_path(r"^user-detail/([0-9])$", UserDetail.as_view(), name="user-detail"),
    # re_path(_(r'confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    # re_path(_(r'status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]
