import re

from apps.code_list.models import code_list
from apps.code_list.serializers import codeListNameSerializer
from apps.resource_list.models import resource_list
from apps.resource_list.serializers import (
    ResourceListSaveSerializer,
    ResourceListSerializer,
    ResourceListTypeSerializer
)
from apps.page_resource_list.serializers import PageResourceListDrawerSerializer

from apps.type_property.models import type_property
from apps.type_property.serializers import (
    TypePropertySaveSerializer,
    TypePropertyCustomSaveSerializer,
    TypePropertySerializer,
)
from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red
from utils.models_utils import (
                                validate_model_not_null,
                                validate_find
                                )
# Create your views here.
from .models import type as Type
from .serializers import (
    TypeDetailsSerializer,
    TypeSaveSerializer,
    TypeSerializer,
    TypeCustomSaveSerializer,
)
from services.logging.Handlers import KafkaLogger 
logger = KafkaLogger()

class TypeSaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    res = ResourceListSaveSerializer
    permission_classes = [permissions.AllowAny]


class TypeAndPropertySaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TypeCustomSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request)
        serializer = TypePropertyCustomSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request)
        serializer = ResourceListTypeSerializer(data = request.data)
        serializer.is_valid()
        serializer.save(request)
        if request.data.get('TYPE').get('LAYER_NAME') == 'OG_STD':
            serializer = PageResourceListDrawerSerializer(data = request.data)
            serializer.is_valid()
            serializer.save(request)
        return Response({"Message":"Successful"}, status=status.HTTP_201_CREATED)




class TypeDeleteView(generics.UpdateAPIView):
    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = Type.objects.filter(TYPE=request.data.get("TYPE"))
        validate_find(qs,request)
        qs.delete()
        message = {"Message": "Successful Delete "}
        logger.info(message,request=request)
        return Response(message,status=status.HTTP_200_OK)



class TypeView(generics.ListAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        typeAddData.import_data("TYPE")
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class TypeDetailView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    serializer_class = [
        TypeSerializer,
        TypePropertySerializer,
    ]

    def post(self, request):
            cache_key = request.data.get("TYPE") + "-" + request.data.get("CULTURE")
            # cache_data = Red.get(cache_key)
            # if cache_data:
            #     return Response(cache_data, status=status.HTTP_200_OK)

            seriliazerPropertyList = []
            seriliazerResourceList = []
            typeQuary = Type.objects.filter(TYPE=request.data.get("TYPE"))
            
            validate_find(typeQuary,request=request)
            
            serializerType = TypeSerializer(typeQuary, many=True)
            for typeValue in serializerType.data[0].values():
                print(typeValue)
                proertyQuery = type_property.objects.filter(TYPE=typeValue)
                serializerProperty = TypePropertySerializer(proertyQuery, many=True)
                seriliazerPropertyList.append(serializerProperty)

            filterDict = dict()
            propertyList = []
            culture = request.data.get("CULTURE")
            for parser in seriliazerPropertyList:
                dicList = []
                label_id = []
                codeListType = []
                for value in parser.data:
                    try:
                        if value.get("CODE_LIST"):
                            index = codeListType.index(value.get("CODE_LIST"))

                    except Exception as e:
                        codeListValue = value.get("CODE_LIST")
                        codeListType.append(codeListValue)
                        parentCodeListQuery = code_list.objects.filter(
                            LIST_TYPE="CODE_LIST", CULTURE=culture, CODE=codeListValue
                        )
                        childCodeListQuery = code_list.objects.filter(
                            LIST_TYPE=codeListValue, CULTURE=culture
                        )
                        serializerCodeList = codeListNameSerializer(
                                    childCodeListQuery, many=True
                                )
                        if parentCodeListQuery:
                            parentserializerCodeList = codeListNameSerializer(
                                childCodeListQuery, many=True
                            )
                            if childCodeListQuery:

                                parentserializerCodeList.data[0][
                                    "CHILD"
                                ] = serializerCodeList.data
                        
                            value["CODE-LIST"] = parentserializerCodeList.data
                    if value.get('SORT_ORDER'):
                        value['SORT_ORDER'] = int(value.get('SORT_ORDER'))
                    value_label = value.get("LABEL_ID")
                    try:
                        index = label_id.index(value_label)
                    except Exception as e:
                        label_id.append(value_label)
                        resourceListQuery = resource_list.objects.filter(
                            ID=value_label, CULTURE=culture
                        )
                        if resourceListQuery:
                            filterDict = value
                            serializerResource = ResourceListSerializer(
                                resourceListQuery, many=True
                            )
                            filterDict["RESOURCE-LIST"] = serializerResource.data
                            dicList.append(filterDict)
                propertyList.append(dicList)

            typeProperty = {
                "TYPE": propertyList[0],
                "BASETYPE": propertyList[1],
            }
            data = {
                "TYPE": {
                    "TYPE COLUMNS": serializerType.data,
                    "TYPE PROPERTY COLUMNS": typeProperty,
                },
            }
            
            cache_data = Red.set(cache_key, data)
            logger.info("Type and type property listed",request=request)
            return Response(data, status=status.HTTP_200_OK)
       
           
