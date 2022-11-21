from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import type_link
from services.parsers.addData.type import typeAddData
from apps.resource_list.models import resource_list
from apps.type.models import type as Type
from apps.type.serializers import TypeResourceListManagerSerializer  
from apps.resource_list.serializers import ResourceListDetailsSerializer
from .serializers import TypeLinkSaveSerializer,TypeLinkDetailsSerializer,TypeLinkDetails2Serializer
from utils.models_utils import (
                                validate_model_not_null,
                                validate_find
                                )

# Create your views here.
class TypeLinkSaveView(generics.CreateAPIView):
    serializer_class = TypeLinkDetails2Serializer
    permission_classes = [
        permissions.AllowAny
    ]
    # def create(self, request, *args, **kwargs):
    #     serializer = TypeLinkSaveSerializer(data = request.data)
    #     serializer.is_valid()
    #     serializer.save(request.data)
    #     return Response({"Message": "successful"}, status=status.HTTP_200_OK)


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
           "TO_TYPE":Q(TO_TYPE = request.data.get("TYPE") ),
            "FROM_TYPE":Q(FROM_TYPE = request.data.get("TYPE") )
        }
        
        new_dict = dict()
        keys = ['TO_TYPE','FROM_TYPE']
        for item in keys:
            types = type_link.objects.filter(obj.get(item))
            validate_find(types,request)
            serializer = TypeLinkDetailsSerializer(types, many=True)
            tempt = []
            for items in serializer.data:
                tempt.append(self._getResourceLabel(items,request.data.get('CULTURE'),items.get('FROM_TYPE')))
            new_dict[item] = tempt

        return Response(new_dict, status=status.HTTP_200_OK)

    def _getResourceLabel(self,data,culture,types):
        qs_Type = Type.objects.filter(TYPE = types)
        type_serializer = TypeResourceListManagerSerializer(qs_Type,many = True)
        for index in range(len(data)):
            qs = resource_list.objects.filter(ID = type_serializer.data[0].get('LABEL_ID'),CULTURE = culture)
            resource_list_serialzer = ResourceListDetailsSerializer(qs,many = True)
            data['SHORT_LABEL'] = resource_list_serialzer.data[0].get('SHORT_LABEL')
            data['MOBILE_LABEL'] = resource_list_serialzer.data[0].get('MOBILE_LABEL')
        return data