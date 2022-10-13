import re
from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import TypeSaveSerializer,TypeDetailsSerializer,TypeSerializer
from apps.type_property.serializers import TypePropertySerializer
from apps.type_property.models import type_property
from apps.resource_list.serializers import ResourceListSerializer
from apps.resource_list.models import resource_list
from apps.code_list.serializers import CodeListSerializer
from apps.code_list.models import code_list
# Create your views here.
from .models import type as Type
from services.parsers.addData.type import typeAddData


class TypeSaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]


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
        # Note the use of `get_queryset()` instead of `self.queryset`
        seriliazerPropertyList = []
        seriliazerResourceList = []
        try:
            typeQuary = Type.objects.filter(TYPE=request.data.get('TYPE'))
            serializerType = TypeSerializer(typeQuary, many=True)
            for typeValue in serializerType.data[0].values():
                proertyQuery = type_property.objects.filter(TYPE=typeValue)
                serializerProperty = TypePropertySerializer(proertyQuery,many=True)
                seriliazerPropertyList.append(serializerProperty)
           
            # deneme = seriliazerList[0]

            # print(deneme.data[0])

            for parser in seriliazerPropertyList:
                if len(parser.data) >= 1:
                    for index in range(0,len(parser.data)):
                        label_id = parser.data[index].get('LABEL_ID')
                        codelist = parser.data[index].get('CODE_LIST')
                        if codelist is not None:
                            codeListQuery = code_list.objects.filter(LIST_TYPE=codelist)
                            serializerCode = CodeListSerializer(codeListQuery,many=True)
                            parser.data[index]['CODE-LIST'] = serializerCode.data
                        resourceListQuery = resource_list.objects.filter(ID=label_id)
                        serializerResource = ResourceListSerializer(resourceListQuery,many=True)
                        parser.data[index]['RESOURCE-LIST'] = serializerResource.data
            
            typeProperty = {
                'TYPE':seriliazerPropertyList[0].data,
                'BASETYPE':seriliazerPropertyList[1].data,
            }
            
            
            newdict = {
                  "TYPE":
                  {
                    'TYPE COLUMNS': serializerType.data,
                    'TYPE PROPERTY COLUMNS':typeProperty
                    },
            }
            
            #print(serializer.data[0].get('TYPE'))
            return Response(newdict,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)
