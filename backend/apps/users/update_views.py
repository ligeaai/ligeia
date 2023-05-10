from .library import *


class UserInfoUpdateView(generics.GenericAPIView):
    serializer_class = UserModelDepthSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = User.objects.filter(email=request.user).first()
        validate_find(user, request)
        for key, value in request.data.items():
            setattr(user, key, value)
        user.save()
        serializer = self.serializer_class(user)
        return Response(serializer.data, status=status.HTTP_200_OK)



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
            roles_id = (roles.objects.filter(LAYER_NAME = "STD",ROLES_NAME = "User")
                                 .first())
            data['role_id'] = roles_id
            user = User.objects.filter(email=data.get('email')).update(**data)
            return Response({"Message":"Succsessful"})
        except Exception as e:
            return Response({"Message":str(e)}, status=status.HTTP_400_BAD_REQUEST)