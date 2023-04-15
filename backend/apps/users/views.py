import email
from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.github.views import GitHubOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth import login
from django.contrib.auth.models import update_last_login
from django.http import JsonResponse
from django.shortcuts import get_object_or_404, redirect

#### REST-AUTH
from django.urls import include, path, reverse
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer

# from knox.auth import AuthToken, TokenAuthentication
from rest_framework.decorators import api_view
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from services.logging.Handlers import KafkaLogger
from utils.utils import AtomicMixin

from apps.roles.models import roles
from .models import *
from .models import User
from .serializers import (
    ChangePasswordSerializer,
    ForgetPasswordSerializer,
    ResetNewPasswordSerializer,
    UserLoginSerializer,
    UserModelSerializer,
    UserRegistrationSerializer,
    UserSerializer,
    UserModelDepthSerializer
)

logger = KafkaLogger()


class UserModelViewSet(ModelViewSet):
    """
    Endpiont for user model, It accept all operations except for user creation.
    It will be enabled or disabled based upon the product requirements.
    """

    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("head", "option", "get")


class UserDetails(generics.ListAPIView):
    queryset = User.objects.none()
    serializer_class = UserModelDepthSerializer
    authentication_classes = [
        TokenAuthentication,
    ]

    def list(self, request):
        queryset = User.objects.get(email=request.user)
        serializer = self.serializer_class(queryset)
        try:
            logger.info(request=request, message="User details listed")
            if request.role:
                serializer.data["role"]['PROPERTY_ID'] = request.role
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(
                request=request, message="user details could not be listed", warning=e
            )
            return Response(e)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelDepthSerializer
    authentication_classes = [
        TokenAuthentication,
    ]
    permission_classes = []

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        try:
            queryset = self.get_queryset()
            serializer = UserModelDepthSerializer(queryset, many=True)
            logger.info(request=request, message="All users listed")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(
                request=request, message="All Users could not be listed", warning=e
            )
            return Response(e)


class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = Token.objects.create(user=user)
            logger.info(message="Created a Profile ", request=request)
            return Response(
                {
                    "token": token.key,
                }
            )
        logger.warning(
            request=request, message="Register Failed", warning=serializer.errors
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLayerUpdate(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            for value in request.data.get('users'):
                layers = value.pop("layer_name")
                user = User.objects.get(email=value.get('email'))
                user.layer_name.set([])
                user.layer_name.set(layers)
                if value.get('role'):
                    role = roles.objects.filter(ROLES_ID = value.get('role')).first()
                    user.role = role
                user.save()
            return Response({"Message":"Succsessful"})
        except Exception as e:
            print(e)
            return Response({"Message":str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(generics.GenericAPIView):

    serializer_class = UserLoginSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            user = serializer.validated_data["user"]
            update_last_login(None, user)
            token = Token.objects.get_or_create(user=user)
            logger.info(request=request, message="Successful Login")
            return Response(
                {
                    "token": str(token[0]),
                },
                status=status.HTTP_200_OK,
            )
        logger.warning(
            request=request, message="Login Failed", warning=serializer.errors
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class logout(generics.ListAPIView):
    authentication_classes = [
        TokenAuthentication,
    ]

    def get(self, request, *args, **kwargs):
        logger.info(request=request, message="user logout")
        return Response({"message": "successful logout"}, status=status.HTTP_200_OK)


class UserChangePassword(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    authentication_classes = [
        TokenAuthentication,
    ]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        is_valid = serializer.is_valid()

        if request.data.get("old_password") == request.data.get("new_password1"):
            is_valid = False
            error_message = "The old password cannot be the same as the new password."
            logger.warning(
                request=request, message="Password Change Failed", warning=error_message
            )
            return Response(
                {"Error": error_message}, status=status.HTTP_400_BAD_REQUEST
            )
        elif serializer.is_valid():
            user = serializer.save()
            logger.info(request=request, message="Password Change Successful")
            return Response(
                {
                    "status": status.HTTP_200_OK,
                    "detail": "Password has been successfully changed.",
                    "data": [],
                }
            )

        logger.warning(
            request=request, message="Password Change Failed", warning=serializer.errors
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class ForgetPasswordChange(generics.GenericAPIView):
#     """
#     if forgot_logged is valid and account exists then only pass otp, phone and password to reset the password. All three should match.APIView
#     """

#     def post(self, request, *args, **kwargs):
#         phone = request.data.get("phone", False)
#         otp = request.data.get("otp", False)
#         password = request.data.get("password", False)


class ForgetPassword(generics.GenericAPIView):
    serializer_class = ForgetPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            logger.info(request=request, message="Email sending to user is successful")
            return Response(serializer.data, status=status.HTTP_200_OK)
        logger.warning(
            request=request,
            message="Email sending to user is failed",
            warning=serializer.errors,
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ResetForgetPassword(generics.GenericAPIView):
    serializer_class = ResetNewPasswordSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(kwargs)
            logger.info(request=request, message="Password reset successful")
            return Response(serializer.data, status=status.HTTP_200_OK)
        logger.warning(
            request=request, message="Password reser failed", warning=serializer.errors
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        user = self.request.user
        return Response({"status": user.confirmed_email}, status=status.HTTP_200_OK)



class UserRoleUpdate(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            role_id = request.data.get('role_id')
            for value in request.data.get('users'):
                data ={}
                data["email"] = value
                data['role_id'] = role_id
                user = User.objects.filter(email=data.get('email')).update(**data)
            return Response({"Message":"Succsessful"})
        except Exception as e:
            return Response({"Message":str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserRoleDeleteView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = {}
            data["email"] = request.data.get('email')
            data['role_id'] = None
            user = User.objects.filter(email=data.get('email')).update(**data)
            return Response({"Message":"Succsessful"})
        except Exception as e:
            return Response({"Message":str(e)}, status=status.HTTP_400_BAD_REQUEST)



class GetUserRolesView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            qs = User.objects.filter(role = None,layer_name = "OG_STD")
            serializer = UserSerializer(qs,many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"Message":str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetUserByRoleIdView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            qs = User.objects.filter(role = request.data.get('ROLES_ID'),layer_name = "OG_STD")
            serializer = UserSerializer(qs,many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"Message":str(e)}, status=status.HTTP_400_BAD_REQUEST)
