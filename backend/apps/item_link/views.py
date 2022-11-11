from django.shortcuts import render
from rest_framework import generics,permissions,status
from rest_framework.response import Response 
from .models import item_link
from .serializers import ItemLinkSaveSerializer
from utils.models_utils import validate_find
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
        serializer = ItemLinkSaveSerializer(quaryset,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)
        

class ItemLinkDeleteView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        quaryset  = item_link.objects.filter(LINK_ID = request.data.get("LINK_ID"))
        validate_find(quaryset,request)
        quaryset.delete()
        return Response("Deleted SUCCSESFUL",status=status.HTTP_200_OK)