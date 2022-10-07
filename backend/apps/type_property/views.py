
from django.shortcuts import render

from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import TypePropertySaveSerializer
# Create your views here.
from .models import type_property
from apps.parsers.addData.type import typeAddData 

class TypePropertySaveView(generics.CreateAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TypePropertyView(generics.ListAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_property_data()
        return Response({"Message":'girdi'}, status=status.HTTP_200_OK)