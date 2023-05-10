from .library import *


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



class UserChangePassword(generics.CreateAPIView):
    serializer_class = ChangePasswordSerializer
    authentication_classes = [
        TokenAuthentication,
    ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        is_valid = serializer.is_valid()

        if request.data.get("old_password") == request.data.get("new_password"):
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
                }
            )

        logger.warning(
            request=request, message="Password Change Failed", warning=serializer.errors
        )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



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


class logout(generics.ListAPIView):
    authentication_classes = [
        TokenAuthentication,
    ]

    def get(self, request, *args, **kwargs):
        logger.info(request=request, message="user logout")
        return Response({"message": "successful logout"}, status=status.HTTP_200_OK)