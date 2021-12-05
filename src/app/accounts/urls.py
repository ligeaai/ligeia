from django.urls import path, re_path
from django.utils.translation import ugettext_lazy as _

from .views import (
    UserLoginView, UserRegisterView, UserConfirmEmailView,
    UserEmailConfirmationStatusView
)

urlpatterns = [
    re_path(_(r'^register/$'), UserRegisterView.as_view(), name='register'),
    re_path(_(r'^login/$'), UserLoginView.as_view(), name='login'),
    re_path(_(r'^confirm/email/(?P<activation_key>.*)/$'), UserConfirmEmailView.as_view(), name='confirm_email'),
    re_path(_(r'^status/email/$'), UserEmailConfirmationStatusView.as_view(), name='status'),
]
