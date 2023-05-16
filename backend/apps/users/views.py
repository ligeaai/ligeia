from .library import *


class UserCheckView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            is_available = False
            user = User.objects.filter(email=request.data.get("email"))
            if user:
                is_available = True

            return Response(is_available, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(request=request, message=str(e), warning=e)
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserModelViewSet(ModelViewSet):
    """
    Endpiont for user model, It accept all operations except for user creation.
    It will be enabled or disabled based upon the product requirements.
    """

    queryset = User.objects.all()
    serializer_class = UserModelSerializer
    permission_classes = (IsAuthenticated,)
    http_method_names = ("head", "option", "get")


from apps.layer.helpers import to_layerDb


class UserDetails(generics.ListAPIView):
    queryset = User.objects.none()
    serializer_class = UserModelDepthSerializer
    permissions_classes = [AllowAny]

    def list(self, request):
        try:
            queryset = User.objects.get(email=request.user)
            serializer = self.serializer_class(queryset)
            logger.info(request=request, message="User details listed")
            if request.role:
                serializer.data["role"]["PROPERTY_ID"] = request.role

            data = serializer.data
            user = User.objects.filter(email=request.user)[0]
            data["layer_name"] = list(
                user.layer_name.values_list("LAYER_NAME", flat=True)
            )
            try:
                data["active_layer"] = user.active_layer.LAYER_NAME
            except:
                print(user)
                to_layerDb("STD")
                user = User.objects.filter(email=request.user)[0]
                data["active_layer"] = user.active_layer.LAYER_NAME
            return Response(data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(
                request=request, message="user details could not be listed", warning=e
            )
            print(str(e))
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserList(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserModelDepth2Serializer
    authentication_classes = [
        TokenAuthentication,
    ]
    permission_classes = []

    def list(self, request):
        try:
            queryset = self.get_queryset()
            serializer = UserModelDepth2Serializer(queryset, many=True)
            logger.info(request=request, message="All users listed")
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(
                request=request, message="All Users could not be listed", warning=e
            )
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


# class ForgetPasswordChange(generics.GenericAPIView):
#     """
#     if forgot_logged is valid and account exists then only pass otp, phone and password to reset the password. All three should match.APIView
#     """

#     def post(self, request, *args, **kwargs):
#         phone = request.data.get("phone", False)
#         otp = request.data.get("otp", False)
#         password = request.data.get("password", False)


class UserConfirmEmailView(AtomicMixin, GenericAPIView):
    serializer_class = None
    authentication_classes = ()

    def get(self, request, activation_key):
        """
        View for confirm email.

        Receive an activation key as parameter and confirm email.
        """
        try:
            user = get_object_or_404(User, activation_key=str(activation_key))
            if user.confirm_email():
                return Response(status=status.HTTP_200_OK)
            return Response(status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            logger.warning(
                request=request,
                message="Failed  Receive an activation key as parameter and confirm emai",
                warning=e,
            )
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserEmailConfirmationStatusView(generics.GenericAPIView):
    serializer_class = None
    authentication_classes = (TokenAuthentication,)

    def get(self, request):
        """Retrieve user current confirmed_email status."""
        try:
            user = self.request.user
            return Response({"status": user.confirmed_email}, status=status.HTTP_200_OK)
        except Exception as e:
            logger.warning(
                request=request,
                message="Failed user current confirmed email ",
                warning=e,
            )
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetUserRolesView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            qs = User.objects.filter(role=None, layer_name="OG_STD")
            serializer = UserSerializer(qs, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.warning(
                request=request, message="Failed  get user roles ", warning=e
            )
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class GetUserByRoleIdView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            qs = User.objects.filter(
                role=request.data.get("ROLES_ID"), layer_name="OG_STD"
            )
            serializer = UserSerializer(qs, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.warning(
                request=request, message="Failed  get user By roles id ", warning=e
            )
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
