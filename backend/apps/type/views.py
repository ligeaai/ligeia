import re

from apps.code_list.models import code_list
from apps.code_list.serializers import (CodeListSaveSerializer,
                                        CodeListSerializer)
from apps.resource_list.models import resource_list
from apps.resource_list.serializers import (ResourceListSaveSerializer,
                                            ResourceListSerializer)
from apps.type_property.models import type_property
from apps.type_property.serializers import (TypePropertySaveSerializer,
                                            TypePropertySerializer)
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red

# Create your views here.
from .models import type as Type
from .serializers import (TypeDetailsSerializer, TypeSaveSerializer,
                          TypeSerializer)


class TypeSaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    res = ResourceListSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]



class TypeAndPropertySaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    res = ResourceListSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        typeValue = request.data.get('TYPE')
        typePropertyValue = request.data.get('TYPE_PROPERTY')
        types = Type.objects.create(**typeValue)
        types.save()
        typesProperty = type_property.objects.create(**typePropertyValue)
        typesProperty.save()
        return Response('Registration Successful')
    
    

class TypeUpdateView(generics.UpdateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def put(self, request, *args, **kwargs):
        data = request.data.get('ITEMS')
        qs = Type.objects.filter(TYPE=request.data.get('FILTER_TYPE')).update(**data)
        # serializer = TypeSaveSerializer(qs, data=data, many=True)

        # if serializer.is_valid():
        # #     serializer.save()
        return Response({'Message':'Successful Update '},status=status.HTTP_200_OK)
    

class TypeDeleteeView(generics.UpdateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def put(self, request, *args, **kwargs):
        qs = Type.objects.filter(TYPE=request.data.get('Type')).delete()
        # serializer = TypeSaveSerializer(qs, data=data, many=True)

        # if serializer.is_valid():
        # #     serializer.save()
        return Response({'Message':'Successful Delete '},status=status.HTTP_200_OK)

class TypeView(generics.ListAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_data()
        return Response({"Error":'error_message'}, status=status.HTTP_200_OK)


class TypeDetailView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = [TypeSerializer,TypePropertySerializer,]
    def post(self, request):
        # cache_data = Red.get(request.data.get('TYPE'))
        # if cache_data:
        #     return Response(cache_data,status=status.HTTP_200_OK)
        
        # Note the use of `get_queryset()` instead of `self.queryset`
        
        seriliazerPropertyList = []
        seriliazerResourceList = []
        try:
            typeQuary = Type.objects.filter(TYPE=request.data.get('TYPE'))
            serializerType = TypeSerializer(typeQuary, many=True)
            print(serializerType.data)
            for typeValue in serializerType.data[0].values():
                proertyQuery = type_property.objects.filter(TYPE=typeValue)
                serializerProperty = TypePropertySerializer(proertyQuery,many=True)
                seriliazerPropertyList.append(serializerProperty)
           

            filterDict = dict()
            propertyList = []
            # print(deneme.data[0])
            culture = request.data.get('CULTURE')
            for parser in seriliazerPropertyList:
                dicList = []
                for value in parser.data:
                    label_id = value.get('LABEL_ID')
                    resourceListQuery = resource_list.objects.filter(ID=label_id,CULTURE=culture)
                    if resourceListQuery:
                        filterDict = value
                        serializerResource = ResourceListSerializer(resourceListQuery,many=True)
                        filterDict['RESOURCE-LIST'] = serializerResource.data
                        dicList.append(filterDict)
                
                propertyList.append(dicList)
             
                    
            
            typeProperty = {
                'TYPE':propertyList[0],
                'BASETYPE':propertyList[1],
            }
            
            
            data = {
                  "TYPE":
                  {
                    'TYPE COLUMNS': serializerType.data,
                    'TYPE PROPERTY COLUMNS':typeProperty
                    },
            }
            cache_data = Red.set(request.data.get('TYPE'),data)
            
            #print(serializer.data[0].get('TYPE'))
            return Response(data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)
