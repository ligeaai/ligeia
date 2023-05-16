from datetime import datetime
from .library import *
from apps.layer.helpers import to_layerDb


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
        data = serializer.data
        user = User.objects.filter(email=request.user)[0]
        data["layer_name"] = list(user.layer_name.values_list("LAYER_NAME", flat=True))
        data["active_layer"] = user.active_layer.LAYER_NAME
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserActiveLayerUpdateView(generics.GenericAPIView):
    serializer_class = UserModelDepthSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        to_layerDb("STD")
        user = User.objects.filter(email=request.user).first()
        find_layer = layer.objects.filter(
            LAYER_NAME=request.data.get("LAYER_NAME")
        ).first()
        user.active_layer = find_layer
        user.save()
        serializer = self.serializer_class(user)
        data = serializer.data
        user = User.objects.filter(email=request.user)[0]
        data["layer_name"] = list(user.layer_name.values_list("LAYER_NAME", flat=True))
        data["active_layer"] = user.active_layer.LAYER_NAME
        return Response(data, status=status.HTTP_200_OK)


from apps.layer.helpers import change_db


class UserLayerUpdate(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            value = request.data.get("users")[0]
            layers = value.pop("layer_name")
            user = (
                User.objects.using("default").filter(email=value.get("email")).first()
            )
            user.layer_name.set([])
            user.layer_name.set(layers)
            if value.get("role"):
                role = roles.objects.filter(ROLES_ID=value.get("role")).first()
                user.role = role
            user.save()
            user_2 = User.objects.filter(email=value.get("email"))
            data = UserChangeDbSerializer(user_2, many=True).data
            # print(serializer.data)
            data = dict(data[0])
            token = Token.objects.get(user=user)
            try:
                for layer in layers:
                    to_layerDb(layer)
                    test = User.objects.filter(email=value.get("email"))
                    if test:
                        continue

                    else:
                        data.pop("id")
                        data.pop("active_layer")
                        data.pop("groups")

                        data.pop("user_permissions")

                        role = data.pop("role")
                        layer_names = data.pop("layer_name")
                        new_user = User.objects.create(**data)
                        new_user.role = user.role
                        new_user.layer_name.set([])
                        new_user.layer_name.set(layer_names)
                        now = datetime.now().strftime("%Y-%m-%d")
                        new_user.save()
                        Token.objects.create(
                            key=token, created=now, user_id=new_user.id
                        )
                        print(token)
                        # print(data)
            except Exception as e:
                print(str(e))

            return Response({"Message": "Succsessful"})
        except Exception as e:
            print(e)
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserRoleUpdate(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            role_id = request.data.get("role_id")
            for value in request.data.get("users"):
                data = {}
                data["email"] = value
                data["role_id"] = role_id
                user = User.objects.filter(email=data.get("email")).update(**data)
            return Response({"Message": "Succsessful"})
        except Exception as e:
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)


class UserRoleDeleteView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            data = {}
            data["email"] = request.data.get("email")
            roles_id = roles.objects.filter(LAYER_NAME="STD", ROLES_NAME="User").first()
            data["role_id"] = roles_id
            user = User.objects.filter(email=data.get("email")).update(**data)
            return Response({"Message": "Succsessful"})
        except Exception as e:
            return Response({"Message": str(e)}, status=status.HTTP_400_BAD_REQUEST)
