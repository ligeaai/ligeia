from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import RolesTypeSaveSerializer
from .models import roles_type


class RolesTypeSaveView(generics.GenericAPIView):
    serializer_class = RolesTypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            roles_type = serializer.save()
            return Response(
                {
                    "Message": "Succsessful",
                }
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class RolesTypeGetView(generics.GenericAPIView):
    serializer_class = RolesTypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        try:
            queryset = roles_type.objects.all()
            serializer = self.get_serializer(queryset,many = True)
            return Response(serializer.data)
        except Exception as e:
            return Response(str(e), status=status.HTTP_400_BAD_REQUEST)
