
import uuid

from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers, status
from rest_framework.response import Response
# from .models import User
from utils.utils import validate_email as email_is_valid

from .helpers import send_forget_password_mail

User = get_user_model()

from rest_framework.serializers import ModelSerializer


class UserModelSerializer(ModelSerializer):
    class Meta:
        print("in meda")
        exclude = ("password",)
        model = User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ("password",)


class UserRegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField()

    class Meta:
        model = User
        fields = ("id", "email", "first_name", "last_name", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create(**validated_data)
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_email(self, value):
        if not email_is_valid(value):
            raise serializers.ValidationError(
                _("Please use a different email address provider.")
            )
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                _("Email already in use, please use a different email address.")
            )
        return value


class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        if email and password:
            user = authenticate(
                request=self.context.get("request"), username=email, password=password
            )

            if not user:
                msg = _("Unable to log in with provided credentials.")
                raise serializers.ValidationError(msg, code="authorization")

        else:
            msg = _('Must include "username" and "password".')
            raise serializers.ValidationError(msg, code="authorization")

        data["user"] = user
        return data


class ChangePasswordSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    new_password2 = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    old_password = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ("old_password", "new_password1", "new_password2")

    def validate(self, data):
        if data["new_password1"] != data["new_password2"]:
            raise serializers.ValidationError(_("Password fields didn't match."))
        return data

    def validate_old_password(self, value):
        user = self.context["request"].user
        if not user.check_password(value):
            raise serializers.ValidationError(_("Old password is not correct"))
        return value

    def save(self, **kwargs):
        password = self.validated_data["new_password1"]
        user = self.context["request"].user
        user.set_password(password)
        user.save()
        return user



class ForgetPasswordSerializer(serializers.Serializer):

    email = serializers.EmailField(required=True)
    class Meta:
        fields = ['email']
    def save(self):
        email = self.validated_data["email"]
        if User.objects.filter(email=email).exists():
            user_obj = User.objects.get(email=email)
            token = str(uuid.uuid4())
            user_obj.forget_password_token = self.validated_data.get("forget_password_token",token)
            user_obj.save()
            send_forget_password_mail(user_obj, token)
            return user_obj
        else:
            raise serializers.ValidationError(
                {"error": "please enter valid crendentials"}
            )
   
            
class ResetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )
    class Meta:
        model = User
        fields = ['__all__']
    def save(self, instance):
        try:
            # The request sent with the default value has been checked as it may create vulnerability.
            if instance['token'] == 'False':
                raise serializers.ValidationError(
                {"error": "this link has expired please send new request"})
            instance = User.objects.get(forget_password_token=instance["token"])
            password = self.validated_data["password"]
            instance.set_password(password)
             # generate and save new token to deactivate old token
            instance.forget_password_token = self.validated_data.get("forget_password_token",'False')
            instance.save()
            return instance
        except ObjectDoesNotExist:
            raise serializers.ValidationError(
                {"error": "this link has expired please send new request"}
            )
        
       






















from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from django.http import HttpRequest, HttpResponseBadRequest
from django.urls.exceptions import NoReverseMatch
from django.utils.translation import gettext_lazy as _
from requests.exceptions import HTTPError
from rest_framework import serializers
from rest_framework.reverse import reverse

try:
    from allauth.account import app_settings as allauth_settings
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
    from allauth.socialaccount.helpers import complete_social_login
    from allauth.socialaccount.models import SocialAccount
    from allauth.socialaccount.providers.base import AuthProcess
    from allauth.utils import email_address_exists, get_username_max_length
except ImportError:
    raise ImportError('allauth needs to be added to INSTALLED_APPS.')










class SocialLoginSerializer(serializers.Serializer):
    access_token = serializers.CharField(required=False, allow_blank=True)
    code = serializers.CharField(required=False, allow_blank=True)
    id_token = serializers.CharField(required=False, allow_blank=True)

    def _get_request(self):
        request = self.context.get('request')
        if not isinstance(request, HttpRequest):
            request = request._request
        return request

    def get_social_login(self, adapter, app, token, response):
        """
        :param adapter: allauth.socialaccount Adapter subclass.
            Usually OAuthAdapter or Auth2Adapter
        :param app: `allauth.socialaccount.SocialApp` instance
        :param token: `allauth.socialaccount.SocialToken` instance
        :param response: Provider's response for OAuth1. Not used in the
        :returns: A populated instance of the
            `allauth.socialaccount.SocialLoginView` instance
        """
        request = self._get_request()
        print('----------------------------------------->',str(request))
        social_login = adapter.complete_login(request, app, token, response=response)
        social_login.token = token
        return social_login

    def set_callback_url(self, view, adapter_class):
        # first set url from view
        self.callback_url = getattr(view, 'callback_url', None)
        if not self.callback_url:
            # auto generate base on adapter and request
            try:
                self.callback_url = reverse(
                    viewname=adapter_class.provider_id + '_callback',
                    request=self._get_request(),
                )
            except NoReverseMatch:
                raise serializers.ValidationError(
                    _('Define callback_url in view'),
                )

    def validate(self, attrs):
        view = self.context.get('view')
        request = self._get_request()

        if not view:
            raise serializers.ValidationError(
                _('View is not defined, pass it as a context variable'),
            )

        adapter_class = getattr(view, 'adapter_class', None)
        if not adapter_class:
            raise serializers.ValidationError(_('Define adapter_class in view'))

        adapter = adapter_class(request)
        app = adapter.get_provider().get_app(request)

        # More info on code vs access_token
        # http://stackoverflow.com/questions/8666316/facebook-oauth-2-0-code-and-token

        access_token = attrs.get('access_token')
        code = attrs.get('code')
        # Case 1: We received the access_token
        if access_token:
            tokens_to_parse = {'access_token': access_token}
            token = access_token
            # For sign in with apple
            id_token = attrs.get('id_token')
            if id_token:
                tokens_to_parse['id_token'] = id_token

        # Case 2: We received the authorization code
        elif code:
            self.set_callback_url(view=view, adapter_class=adapter_class)
            self.client_class = getattr(view, 'client_class', None)

            if not self.client_class:
                raise serializers.ValidationError(
                    _('Define client_class in view'),
                )

            provider = adapter.get_provider()
            scope = provider.get_scope(request)
            client = self.client_class(
                request,
                app.client_id,
                app.secret,
                adapter.access_token_method,
                adapter.access_token_url,
                self.callback_url,
                scope,
                scope_delimiter=adapter.scope_delimiter,
                headers=adapter.headers,
                basic_auth=adapter.basic_auth,
            )
            token = client.get_access_token(code)
            access_token = token['access_token']
            tokens_to_parse = {'access_token': access_token}

            # If available we add additional data to the dictionary
            for key in ['refresh_token', 'id_token', adapter.expires_in_key]:
                if key in token:
                    tokens_to_parse[key] = token[key]
        else:
            raise serializers.ValidationError(
                _('Incorrect input. access_token or code is required.'),
            )

        social_token = adapter.parse_token(tokens_to_parse)
        social_token.app = app

        try:
            login = self.get_social_login(adapter, app, social_token, token)
            ret = complete_social_login(request, login)
        except HTTPError:
            raise serializers.ValidationError(_('Incorrect value'))

        if isinstance(ret, HttpResponseBadRequest):
            raise serializers.ValidationError(ret.content)

        if not login.is_existing:
            # We have an account already signed up in a different flow
            # with the same email address: raise an exception.
            # This needs to be handled in the frontend. We can not just
            # link up the accounts due to security constraints
            if allauth_settings.UNIQUE_EMAIL:
                # Do we have an account already with this email address?
                print('---------------------------> SERİLİAZER')
                account_exists = get_user_model().objects.filter(
                    email=login.user.email,
                ).exists()
                if account_exists:
                    raise serializers.ValidationError(
                        _('User is already registered with this e-mail address.'),
                    )

            login.lookup()
            #login.save(request, connect=True)
            raise serializers.ValidationError(ret.content)

        attrs['user'] = login.account.user

        return attrs


























