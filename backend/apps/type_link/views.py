from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import type_link
from services.parsers.addData.type import typeAddData

from .serializers import TypeLinkSaveSerializer,TypeLinkDetailsSerializer
from utils.models_utils import (
                                validate_model_not_null,
                                validate_find
                                )

# Create your views here.
class TypeLinkSaveView(generics.CreateAPIView):
    
    permission_classes = [
        permissions.AllowAny
    ]
    def create(self, request, *args, **kwargs):
        serializer = TypeLinkSaveSerializer(data = request.data)
        serializer.is_valid()
        serializer.save(request.data)
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


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
        from django.db.models import Q
        obj = {
            "TYPE":Q(TYPE = request.data.get("TYPE") ),
            "TO_TYPE":Q(TO_TYPE = request.data.get("TO_TYPE") ),
            "FROM_TYPE":Q(FROM_TYPE = request.data.get("FROM_TYPE") )
        }
        keys = list(request.data.keys())[0]
        type = type_link.objects.filter(obj.get(keys))
        validate_find(type)
        serializer = TypeLinkDetailsSerializer(type, many=True)
     
        return Response(serializer.data, status=status.HTTP_200_OK)
