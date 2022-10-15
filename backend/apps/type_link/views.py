from django.shortcuts import render
from rest_framework import permissions
from rest_framework import generics, permissions, status
from .serializers import TypeLinkSaveSerializer
from services.parsers.addData.type import typeAddData
from rest_framework.response import Response

# Create your views here.
class TypeLinkSaveView(generics.CreateAPIView):

    serializer_class = TypeLinkSaveSerializer
   
    permission_classes = [
        permissions.AllowAny
    ]

class TypeLinkView(generics.ListAPIView):

    serializer_class = TypeLinkSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_link_data()
        return Response({"Error":'error_message'}, status=status.HTTP_200_OK)