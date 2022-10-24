from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import type_link
from services.parsers.addData.type import typeAddData

from .serializers import TypeLinkSaveSerializer,TypeLinkDetailsSerializer


# Create your views here.
class TypeLinkSaveView(generics.CreateAPIView):

    serializer_class = TypeLinkSaveSerializer
   
    permission_classes = [
        permissions.AllowAny
    ]

class TypeLinkView(generics.ListAPIView):
    queryset = type_link.objects.all()
    serializer_class = TypeLinkSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        typeAddData.import_data("TYPE_LINK")
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)

class TypeLinkDetailsView(generics.CreateAPIView):
    
    
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        type = type_link.objects.filter(TYPE=request.data.get('TYPE'))
        serializer = TypeLinkDetailsSerializer(type, many=True)
     
        return Response(serializer.data, status=status.HTTP_200_OK)
