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
from utils.models_utils import (
                                validate_find,
                                )
from services.logging.Handlers import KafkaLogger 
logger = KafkaLogger()


# Create your views here.
class ItemPropertyScriptSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # serializer = ItemPropertyCustomSaveSerializer(data = request.data)
        # serializer.is_valid()
        # serializer.create(request.data)
        message = "Succsesful created item property"
        logger.info(message,request)
        return Response({"Message":message},status=status.HTTP_201_CREATED)


class ItemPropertyView(generics.ListAPIView):

    serializer_class = ItemPropertyDetailsSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM_PROPERTY")
        message = "Succsesful created item property"
        logger.info(message,request)
        return Response({"Message":message}, status=status.HTTP_200_OK)
    

class ItemPropertyDetailsView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        queryset = item_property.objects.filter(ITEM_ID = request.data.get('ITEM_ID')).order_by('START_DATETIME')
        validate_find(queryset,request)
        serializer = ItemPropertyDetailsSerializer(queryset,many = True)
        temp_data= []
        for index in range(0,len(serializer.data)):
            new_dict = dict(serializer.data[index])
            tempt_dict = dict()
            for keys,values in new_dict.items():
                if not values:
                    serializer.data[index].pop(keys)
                if keys == "START_DATETIME":
                    tempt_dict[values] = new_dict
                    temp_data.append(tempt_dict)

        tempt_key = []
        tempt_dict = dict()
        for index in range(0,len(temp_data)):
            data = temp_data[index]
            for key,value in data.items():
                try:
                    x = tempt_key.index(key)
                    values = tempt_dict.get(key)
                    values.append(value)
                    tempt_dict[key] = values
                    
                except:
                    tempt_key.append(key)
                    values = []
                    values.append(value)
                    tempt_dict[key] = values

        # deneme = dict()
        # for index in range(1,len(temp_data)):
        #     keys = list(temp_data[index].keys())[0]
        #     listt= []
        #     try:
        #         keys2 = list(temp_data[index+1].keys())[0]
        #         if keys == keys2:
        #             print('GİRDİ',str(index))
        #             listt.append(list(temp_data[index].values())[0])
        #             listt.append(list(temp_data[index+1].values())[0])
        #             deneme[keys] = listt
        #     except:
        #         keys2 = list(temp_data[index-1].keys())[0]
        #         deneme.get(keys2).append(list(temp_data[index].values())[0])
        #         pass
                
        message = "Succsesful listed item property"
        # logger.info(message,request)
        return Response(tempt_dict, status=status.HTTP_200_OK)


class ItemPropertyDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        queryset = item_property.objects.filter(ROW_ID = request.data.get('ROW_ID'))
        validate_find(queryset,request)
        queryset.delete()
        message = "Succsesful deleted item property"
        logger.info(message,request)
        return Response("Succsesful Delete",status=status.HTTP_200_OK)
