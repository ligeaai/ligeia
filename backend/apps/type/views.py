
from django.shortcuts import render

from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import TypeSaveSerializer
# Create your views here.
from .models import type as Type
from apps.parsers.addData.type import typeAddData 

class TypeSaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TypeView(generics.ListAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_data('TYPE')
        return Response({"Error":'error_message'}, status=status.HTTP_200_OK)