import imp
from rest_framework.response import Response
from rest_framework import status
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ObjectDoesNotExist
from django.utils.translation import gettext_lazy as _
import uuid
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
        
       
