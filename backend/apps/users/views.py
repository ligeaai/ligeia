import email
from lib2to3.pgen2 import token
import logging
import profile
from urllib import response
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from knox.auth import AuthToken, TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework import status, generics, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import login
from django.contrib.auth.models import update_last_login
from rest_framework.views import APIView
from .models import *
from .serializers import (
    UserRegistrationSerializer,
    UserSerializer,
    UserLoginSerializer,
    ChangePasswordSerializer,
    ForgetPasswordSerializer,
    UserModelSerializer,
    ResetNewPasswordSerializer,
)

from utils import AtomicMixin
from rest_framework.viewsets import ModelViewSet

from .models import User

logger = logging.getLogger(__name__)


class UserModelViewSet(ModelViewSet):
    """
    Endpiont for user model, It accept all operations except for user creation.
    It will be enabled or disabled based upon the product requirements.
    """

    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("head", "option", "get")


class UserDetails(ModelViewSet):
    queryset = User.objects.none()
    serializer_class = UserModelSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("head", "option", "get")

    def list(self, request):
        queryset = User.objects.get(email=request.user)
        serializer = self.serializer_class(queryset)

        return Response(serializer.data)


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated,
        # permissions.IsAdminUser
    ]

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)


class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = AuthToken.objects.create(user)
            return Response(
                {
                    "status": status.HTTP_201_CREATED,
                    "users": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                    "token": token[1],
                }
            )
        logger.warning(f"User Register Error {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(generics.GenericAPIView):
    serializer_class = UserLoginSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            update_last_login(None, user)
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "user": UserSerializer(
                        user, context=self.get_serializer_context()
                    ).data,
                    "token": AuthToken.objects.create(user)[1],
                }
            )
        logger.warning(f"User Login Error {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserChangePassword(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    
    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "detail": "Password has been successfully changed.",
                    "data": [],
                }
            )
        logger.warning(f"User Change Password Error {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ForgetPasswordChange(generics.GenericAPIView):
#     """
#     if forgot_logged is valid and account exists then only pass otp, phone and password to reset the password. All three should match.APIView
#     """

#     def post(self, request, *args, **kwargs):
#         phone = request.data.get("phone", False)
#         otp = request.data.get("otp", False)
#         password = request.data.get("password", False)


class ResetPassword(generics.GenericAPIView):
    serializer_class = ForgetPasswordSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetNewPassword(generics.GenericAPIView):
    serializer_class = ResetNewPasswordSerializer

    def post(self,request, *args, **kwargs):
        
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(kwargs)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# class logout(APIView):
#     def get(self, request):
#         request.user.auth_token.delete()
#         auth.logout(request)
#         return Response("successfully deleted")


class UserConfirmEmailView(AtomicMixin, GenericAPIView):
    serializer_class = None
    authentication_classes = ()

    def get(self, request, activation_key):
        """
        View for confirm email.

        Receive an activation key as parameter and confirm email.
        """
        user = get_object_or_404(User, activation_key=str(activation_key))
        if user.confirm_email():
            return Response(status=status.HTTP_200_OK)

        logger.warning("Email confirmation key not found.")
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserEmailConfirmationStatusView(generics.GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        user = self.request.user
        return Response({"status": user.confirmed_email}, status=status.HTTP_200_OK)
