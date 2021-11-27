# coding: utf-8 -*-
from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from rest_framework.serializers import SerializerMethodField
from django.contrib.auth import authenticate
# from nordalclient.models import Device, Site, Well, WellControl

from db_oauth.models import platform_User


class UserModelSerializer(ModelSerializer):

    class Meta:
        print("in meda")
        exclude = ('password', )
        model = platform_User


class LoginModelSerializer(ModelSerializer):

    class Meta:
        exclude = ('password',)
        model = platform_User


class LogoutModelSerializer(ModelSerializer):

    class Meta:
        exclude = ('password',)
        model = platform_User



# Login Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")


class LogoutSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_inactive:
            return user
        else:
            return False


