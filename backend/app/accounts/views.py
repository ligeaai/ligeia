import logging

from django.shortcuts import get_object_or_404
from knox.auth import TokenAuthentication
from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView
from rest_framework import status, generics, permissions
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth import login

from .models import *
from .serializers import (UserRegistrationSerializer, UserSerializer, LoginSerializer, 
        ChangePasswordSerializer, ForgetPasswordSerializer)

from utils import AtomicMixin

logger = logging.getLogger(__name__)


class UserView(generics.RetrieveUpdateDestroyAPIView):
    queryset=User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]
  
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
            return Response({
                "status": status.HTTP_201_CREATED,
                "users": UserSerializer(user, context=self.get_serializer_context()).data,
                "token": token[1]
            })
        logger.warning(f'User Register Error {serializer.errors}')
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserLoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    permission_classes = [
        permissions.AllowAny,
    ]

    def post(self, request, format = None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)[1]
        })

class ChangePassword(generics.UpdateAPIView):
    """
    Change password endpoint view
    """
    authentication_classes = (TokenAuthentication, )
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated, ]

    def get_object(self, queryset=None):
        """
        Returns current logged in user instance
        """
        obj = self.request.user
        return obj

    def patch(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        # if serializer.is_valid():
        #     # Check old password
        #     if not self.object.check_password(serializer.data.get("old_password")):
        #         return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        #     # set_password also hashes the password that the user will get
        #     self.object.set_password(serializer.data.get("new_password"))
        #     self.object.save()
        #     response = {
        #         'status': 'success',
        #         'code': status.HTTP_200_OK,
        #         'message': 'Password updated successfully',
        #         'data': []
        #     }

        #     return Response(response)


        if serializer.is_valid():
            if not self.object.check_password(serializer.data.get('old_password')):
                return Response({
                    'status': False,
                    'current_password': 'Does not match with our data',
                }, status=status.HTTP_400_BAD_REQUEST)

            self.object.set_password(serializer.data.get('password_2'))
            self.object.password_changed = True
            self.object.save()
            return Response({
                "status": True,
                "detail": "Password has been successfully changed.",
            })

        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

class ForgetPasswordChange(generics.GenericAPIView):
    '''
    if forgot_logged is valid and account exists then only pass otp, phone and password to reset the password. All three should match.APIView
    '''

    def post(self, request, *args, **kwargs):
        phone = request.data.get('phone', False)
        otp   = request.data.get("otp", False)
        password = request.data.get('password', False)

# class ResetPassword(generics.GenericAPIView):
#     def post(self,request):
#         serializer=ForgetPasswordSerializer(data=request.data)
#         alldatas={}
#         if serializer.is_valid(raise_exception=True):
#             mname=serializer.save()
#             # alldatas[‘data’]=’successfully registered’
#             # print(alldatas)
#             return Response(alldatas)
#         return Response(‘failed retry after some time’)
#         class logout(APIView):
    
#     def get(self,request):
#         request.user.auth_token.delete()
#         auth.logout(request)
#         return Response(“successfully deleted”)



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
