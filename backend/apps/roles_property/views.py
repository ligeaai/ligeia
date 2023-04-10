from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import RolesPropertySaveSerializer
from .models import roles_property



class RolesPropSaveView(generics.GenericAPIView):
    serializer_class = RolesPropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            roles_property = serializer.save()
            return Response(
                {
                    "Message": "Succsessful",
                }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RolesPropGetView(generics.GenericAPIView):
    serializer_class = RolesPropertySaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        try:
            roles_id = request.data.get('ROLES_ID')
            queryset = roles_property.objects.filter(ROLES_ID = roles_id)
            serializer = self.get_serializer(queryset,many = True)
            return Response(serializer.data)
        except Execption as e:
            print(e)
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
