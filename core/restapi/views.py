# -*- coding: utf-8 -*-

import base64

from rest_framework.viewsets import ModelViewSet
from restapi.serializers import (UserModelSerializer, LoginSerializer, LogoutSerializer,
                                   LoginModelSerializer, LogoutModelSerializer)
from core.oauth.models import IEFPlUser
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, generics, permissions
from knox.models import AuthToken
from django.contrib.auth import authenticate


class UserModelViewSet(ModelViewSet):
        """
    Endpiont for user model, It accept all operations except for user creation.
    It will be enabled or disabled based upon the product requirements.
    """
        queryset = IEFPPUser.objects.all()
        serializer_class = UserModelSerializer
        permission_classes = (IsAuthenticated, )
        http_method_names = ('head', 'option', 'get')



class UserDetails(ModelViewSet):
    queryset = IEFPPUser.objects.none()
    serializer_class = UserModelSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ('head', 'option', 'get')

    def list(self, request):
        queryset = IEFPPUser.objects.get(username=request.user)
        serializer = self.serializer_class(queryset)

        return Response(serializer.data)


class LoginModelViewSet(ModelViewSet):
        queryset = IEFPPUser.objects.all()
        serializer_class = LoginModelSerializer
        permission_classes = (IsAuthenticated, )
        http_method_names = ('head', 'option', 'get')


class LogoutModelViewSet(ModelViewSet):
        queryset = IEFPPUser.objects.all()
        serializer_class = LogoutModelSerializer
        permission_casses = (IsAuthenticated, )
        http_method_names = ('head', 'option', 'get')


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginSerializer
    queryset = IEFPPUser.objects.none()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid()
        user = serializer.validated_data
        if user:
                return Response({
                        "token": AuthToken.objects.create(user)[1]
                })
        else:
                return Response({"Error": "User credentials are invalid!"}, status=status.HTTP_400_BAD_REQUEST)

