from django.shortcuts import render
from rest_framework import generics,permissions,status
from rest_framework.response import Response 
from .models import item_link
from .serializers import ItemLinkSaveSerializer,ItemLinkDetailsSerializer
from utils.models_utils import validate_find
from apps.item_property.models import item_property 
from apps.item_property.serializers import ItemPropertyNameSerializer
# Create your views here.


class ItemLinkSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = ItemLinkSaveSerializer(data = request.data)
        serializer.is_valid()
        serializer.save(request)
        return Response("Created SUCCSESFUL",status=status.HTTP_201_CREATED)
        

class ItemLinkDetailsView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(TO_ITEM_ID = request.data.get("TO_ITEM_ID"))
        validate_find(quaryset,request)
        serializer = ItemLinkDetailsSerializer(quaryset,many = True)
        self._getFromItemName(serializer.data,request)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def _getFromItemName(self,data,request):
        try:
            for index in range(len(data)):
                item = data[index]
                property = item_property.objects.filter(ITEM_ID = item.get('FROM_ITEM_ID'),PROPERTY_TYPE = 'NAME')
                validate_find(property,request)
                serializer = ItemPropertyNameSerializer(property,many = True)
                data[index]['FROM_ITEM_NAME'] = serializer.data[0].get('PROPERTY_STRING')
        except Exception as e:
            raise e


            
            


class ItemLinkDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(LINK_ID = request.data.get("LINK_ID"))
        validate_find(quaryset,request)
        quaryset.delete()
        return Response("Deleted SUCCSESFUL",status=status.HTTP_200_OK)