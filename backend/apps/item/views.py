import time
from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import item
from .serializers import ItemSaveSerializer, ItemCustomSaveSerializer
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
import uuid
from apps.item_property.views import ItemPropertyCustomSaveSerializer
from utils.models_utils import (
                                validate_model_not_null,
                                )

# Create your views here.
class ItemScriptSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        item_data = request.data['ITEM']
        validate_model_not_null(item_data,"item")
        serializer = ItemCustomSaveSerializer(data = item_data)
        serializer.is_valid()
        serializer.create(item_data)
        serializer_prop = ItemPropertyCustomSaveSerializer(data = request.data)
        print(serializer.data)
        prop_item = request.data.get("PROPERTY")
        for keys,value in prop_item.items():
            validate_model_not_null(value,"item_property")
        serializer_prop.is_valid()
        deneme = serializer_prop.create(request.data)
        return Response(serializer.data,status=status.HTTP_201_CREATED)
       
    

class ItemView(generics.ListAPIView):

    serializer_class = ItemSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM")
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)

