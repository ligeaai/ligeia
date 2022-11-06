import time
from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import item
from .serializers import ItemSaveSerializer, ItemCustomSaveSerializer,ItemDetailsSerializer
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
import uuid
from apps.item_property.serializers import ItemPropertyCustomSaveSerializer,ItemPropertyNameSerializer
from apps.item_property.models import item_property
from utils.models_utils import (
                                validate_model_not_null,
                                validate_find,
                                )

from services.logging.Handlers import KafkaLogger 
logger = KafkaLogger()


class ItemSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data,"item",request)
        serializer = ItemCustomSaveSerializer(data = request.data)
        serializer.is_valid()
        data = serializer.create(request.data)
        message = "Succsesfull created for item"
        logger.info(message,request = request)
        return Response("Succsesfull",status=status.HTTP_201_CREATED)

class ItemScriptSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
       item_id = request.data.get('ITEM').get('ITEM_ID')
       queryset = item.objects.filter(ITEM_ID = item_id).delete()
       queryset = item_property.objects.filter(ITEM_ID = item_id).delete()
       item_data = request.data['ITEM']
       item_data['START_DATETIME'] = request.data.get('COLUMNS')[0].get('START_TIME')
       validate_model_not_null(item_data,"item",request)
       serializer = ItemCustomSaveSerializer(data = item_data)
       serializer.is_valid()
       serializer.save(item_data)
       serializer_prop = ItemPropertyCustomSaveSerializer(data = request.data)
       serializer_prop.is_valid()
       serializer_prop.save(request.data)
       return Response(request.data,status=status.HTTP_201_CREATED)










# Create your views here.
# class ItemScriptSaveView(generics.CreateAPIView):
#     permission_classes = [permissions.AllowAny]

#     def post(self, request, *args, **kwargs):
#         item_data = request.data['ITEM']
#         validate_model_not_null(item_data,"item",request)
#         serializer = ItemCustomSaveSerializer(data = item_data)
#         serializer.is_valid()
#         serializer.save(item_data)
#         serializer_prop = ItemPropertyCustomSaveSerializer(data = request.data)
#         prop_item = request.data.get("PROPERTY")
#         for keys,value in prop_item.items():
#             validate_model_not_null(value,"item_property",request)
#         serializer_prop.is_valid()
#         serializer_prop.save(request.data)
#         message = "Succsesfull created for item and property"
#         logger.info(message,request = request)
#         return Response(message,status=status.HTTP_201_CREATED)
       
    

class ItemView(generics.ListAPIView):

    serializer_class = ItemSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM")
        return Response({"Message":'Successful'}, status=status.HTTP_200_OK)

class ItemDetailsView(generics.ListAPIView):
    queryset = item.objects.all()
    serializer_class = ItemDetailsSerializer
    permission_classes = [permissions.AllowAny]
    def list(self, request, *args, **kwargs):
        queryset = item.objects.all()
        validate_find(queryset,request)
        serializer = ItemDetailsSerializer(queryset,many = True)
        for index in range(0,len(serializer.data)):
            property_queryset = item_property.objects.filter(ITEM_ID = serializer.data[index].get('ITEM_ID'),PROPERTY_TYPE = "NAME").order_by('START_DATETIME')
            serializer_prop = ItemPropertyNameSerializer(property_queryset,many = True)
            for data in serializer_prop.data:   
                for value in data.values():
                    if value:
                        serializer.data[index]['NAME'] = value
        message = "Succsesfull listed for items"
        logger.info(message,request = request)
        return Response(serializer.data,status=status.HTTP_200_OK)



class ItemDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = item.objects.filter(ITEM_ID = request.data.get('ITEM_ID'))
        validate_find(queryset,request)
        queryset.delete()
        queryset_prop = item_property.objects.filter(ITEM_ID = request.data.get('ITEM_ID'))
        for data in queryset_prop:
            validate_find(data,request)
            data.delete()
        message = "Succsesfull deleted for items"
        logger.info(message,request = request)
        return Response(message,status=status.HTTP_200_OK)
