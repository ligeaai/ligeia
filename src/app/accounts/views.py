import logging

from django.shortcuts import get_object_or_404
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from rest_framework import status, generics, permissions
from rest_framework.authentication import BasicAuthentication
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import CreateModelMixin
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import User
from .serializers import (
    UserRegistrationSerializer, UserSerializer, LoginSerializer
)
from utils import AtomicMixin

logger = logging.getLogger(__name__)


class UserView(generics.RetrieveAPIView):
  permission_classes = [
      permissions.IsAuthenticated
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user


class UserDetails(generics.ListAPIView):
    queryset = User.objects.none()
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated, )
    http_method_names = ('head', 'option', 'delete', 'get')

    def list(self, request):
        queryset = User.objects.get(email=request.user)
        serializer = self.serializer_class(queryset)

        return Response(serializer.data)
class UserRegisterView(generics.GenericAPIView):
    serializer_class = UserRegistrationSerializer
    permission_classes = ()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            token = AuthToken.objects.create(user)
            return Response({
                "status": status.HTTP_201_CREATED,
                "users": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token[1]
            })
        logger.warning(f'User Register Error {serializer.errors}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })


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

        logger.warning('Email confirmation key not found.')
        return Response(status=status.HTTP_404_NOT_FOUND)


class UserEmailConfirmationStatusView(generics.GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        user = self.request.user
        return Response(
            {
                'status': user.confirmed_email
            }, status=status.HTTP_200_OK
        )
