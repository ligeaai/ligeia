from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData

from .serializers import TypeLinkSaveSerializer


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
        
        typeAddData.import_data("TYPE_LINK")
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)