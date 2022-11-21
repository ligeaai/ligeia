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
        tempt = []
        quaryset  = item_link.objects.filter(TO_ITEM_ID = request.data.get("ID"))
        quaryset2  = item_link.objects.filter(FROM_ITEM_ID = request.data.get("ID"))
        # validate_find(quaryset,request)
        serializer = ItemLinkDetailsSerializer(quaryset,many = True)
        serializer2 = ItemLinkDetailsSerializer(quaryset2,many = True)
        data1 = self._getFromItemName(serializer.data,request)
        data2 = self._getFromItemName(serializer2.data,request)
        new_dict = {
            "TO_ITEM_ID":data1,
            "FROM_ITEM_ID":data2
        }
        return Response(new_dict,status=status.HTTP_200_OK)
    
    
    def _getFromItemName(self,data,request):
        try:
            for index in range(len(data)):
                item = data[index]
                property = item_property.objects.filter(ITEM_ID = item.get('FROM_ITEM_ID'),PROPERTY_TYPE = 'NAME')
                validate_find(property,request)
                serializer = ItemPropertyNameSerializer(property,many = True)
                data[index]['FROM_ITEM_NAME'] = serializer.data[0].get('PROPERTY_STRING')
            return data
        except Exception as e:
            raise e

class ItemLinkUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]
    def put(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(LINK_ID = request.data.get("LINK_ID"))
        validate_find(quaryset,request)
        quaryset.update(**request.data)
        return Response("Succsesful",status=status.HTTP_200_OK)

class ItemLinkHierarchyView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(TO_ITEM_TYPE = "COMPANY")
        validate_find(quaryset,request)
        serializer = ItemLinkDetailsSerializer(quaryset,many = True)
        tempt ={}
        self._getChild(serializer.data,tempt)
        return Response(serializer.data)
    
    def _getChild(self,data,tempt):
        for index in range(len(data)):
            quaryset  = item_link.objects.filter(TO_ITEM_TYPE = data[index].get('FROM_ITEM_TYPE'))
            if quaryset:
                serializer = ItemLinkDetailsSerializer(quaryset,many = True)
                data[index]['CHILD'] = serializer.data
                self._getChild(serializer.data,tempt)
        



class ItemLinkDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(LINK_ID = request.data.get("LINK_ID"))
        validate_find(quaryset,request)
        quaryset.delete()
        return Response("Deleted SUCCSESFUL",status=status.HTTP_200_OK)