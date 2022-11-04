from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from datetime import datetime
from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import item_property
from .serializers import (
    ItemPropertyDetailsSerializer,
    ItemPropertySaveSerializer,
    ItemPropertyCustomSaveSerializer,
)
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
import uuid

# Create your views here.
class ItemPropertyScriptSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # serializer = ItemPropertyCustomSaveSerializer(data = request.data)
        # serializer.is_valid()
        # serializer.create(request.data)
        return Response({"Message":"Succsesful"},status=status.HTTP_201_CREATED)


class ItemPropertyView(generics.ListAPIView):

    serializer_class = ItemPropertyDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM_PROPERTY")
        return Response({"Message":'Successful'}, status=status.HTTP_200_OK)
    

class ItemPropertyDetailsView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        queryset = item_property.objects.filter(ITEM_ID = request.data.get('ITEM_ID'))
        
        serializer = ItemPropertyDetailsSerializer(queryset,many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)
