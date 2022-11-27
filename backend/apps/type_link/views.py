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
                tempt.append(self._getResourceLabel(items,request.data.get('CULTURE'),items.get('FROM_TYPE'),items.get('TO_TYPE'),items.get('TYPE')))
            new_dict[item] = tempt

        return Response(new_dict, status=status.HTTP_200_OK)

    def _getResourceLabel(self,data,culture,Fromtypes,ToTypes,linkType):
        qs_FromType = Type.objects.filter(TYPE = Fromtypes)
        FromType_serializer = TypeResourceListManagerSerializer(qs_FromType,many = True)
        qs_ToType = Type.objects.filter(TYPE = ToTypes)
        ToType_serializer = TypeResourceListManagerSerializer(qs_ToType,many = True)
        qsLinkType = resource_list.objects.filter(ID = linkType,CULTURE = culture)
        resource_list_LinkTypeserialzer = ResourceListDetailsSerializer(qsLinkType,many = True)
        for index in range(len(data)):
            qsFrom = resource_list.objects.filter(ID = FromType_serializer.data[0].get('LABEL_ID'),CULTURE = culture)
            resource_list_Fromserialzer = ResourceListDetailsSerializer(qsFrom,many = True)
            qsTo = resource_list.objects.filter(ID = ToType_serializer.data[0].get('LABEL_ID'),CULTURE = culture)
            resource_list_Toserialzer = ResourceListDetailsSerializer(qsTo,many = True)
            if qsFrom:
                data['FROM_SHORT_LABEL'] = resource_list_Fromserialzer.data[0].get('SHORT_LABEL')
                data['FROM_MOBILE_LABEL'] = resource_list_Fromserialzer.data[0].get('MOBILE_LABEL')
            if qsTo:
                data['TO_SHORT_LABEL'] = resource_list_Toserialzer.data[0].get('SHORT_LABEL')
                data['TO_MOBILE_LABEL'] = resource_list_Toserialzer.data[0].get('MOBILE_LABEL')
            if qsLinkType:
                data['TYPE_LABEL'] = resource_list_LinkTypeserialzer.data[0].get('SHORT_LABEL')
        return data