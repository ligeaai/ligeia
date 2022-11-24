from django.shortcuts import render
from .models import tags
import uuid
from rest_framework import permissions,status,generics
from rest_framework.response import Response
from .serializers import TagsDetiailsSerializer,TagsSaveSerializer,TagsFieldsSerializer
from apps.type_property.models import type_property
from apps.resource_list.models import resource_list 
from apps.resource_list.serializers import ResourceListSerializer 
from apps.type_property.serializers import TypePropertyDetailsSerializer
from apps.item_link.models import item_link 
from apps.item_link.serializers import ItemLinkSaveSerializer
from apps.type_link.models import type_link 
from apps.code_list.models import code_list
from apps.templates.orm_CodeList import CodeListORM
from apps.type_link.serializers import TypeLinkDetailsSerializer
from utils.models_utils import validate_model_not_null
# Create your views here.

class TagsSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        tags_dict = request.data
        link_dict = dict()
        try:
            links_list = ['LINK_ID', 'LINK_TYPE',  'END_DATETIME', 'FROM_ITEM_ID', 'FROM_ITEM_TYPE', 'TO_ITEM_ID', 'TO_ITEM_TYPE']
            for keys in links_list:
                link_dict[keys] = request.data.get(keys)
                tags_dict.pop(keys)
        except:
            pass 
        link_dict['START_DATETIME'] = tags_dict.get('START_DATETIME')
        link_dict['ROW_ID'] = uuid.uuid4().hex
        validate_model_not_null(tags_dict,'tags',request = request)
        validate_model_not_null(link_dict,"ITEM_LINK",request = request)
        serializer = TagsSaveSerializer(data = request)
        serializer.is_valid()
        message = serializer.save(tags_dict)
        link_serializer = ItemLinkSaveSerializer(data = request.data.get('LINK'))
        link_serializer.is_valid()
        message = link_serializer.save(link_dict)
        
        return Response(message,status=status.HTTP_200_OK)
    

class TagsDetailsView(generics.ListAPIView):

    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        pass
    def get(self, request, *args, **kwargs):
        queryset = tags.objects.all()
        serializer = TagsDetiailsSerializer(queryset,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)

class TagsSpesificDetailsView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        pass
    def post(self, request, *args, **kwargs):
        queryset = tags.objects.filter(TAG_ID = request.data.get('TAG_ID'))
        serializer = TagsDetiailsSerializer(queryset,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)

    
class TagsDeleteView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = tags.objects.filter(TAG_ID = request.data.get('TAG_ID'))
        if qs:
            qs.delete
        return Response("Succsessful",status=status.HTTP_200_OK)


class TagsPropertysView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        queryset = type_property.objects.filter(TYPE = 'TAG_CACHE')
        serializer = TypePropertyDetailsSerializer(queryset,many = True)
        tag_cache = []
        self._resourceLabel(serializer.data,tag_cache,request.data.get('CULTURE'))
        return Response(tag_cache,status=status.HTTP_200_OK)

    def _resourceLabel(self,data,dataList,culture):
        for item in (data):
            if item.get('CODE_LIST'):
                qs_codeList = code_list.objects.filter(LIST_TYPE = "CODE_LIST",CODE = item.get('CODE_LIST'))
                if not qs_codeList:
                    qs_codeList = code_list.objects.filter(LIST_TYPE = item.get('CODE_LIST'))
                item['CODE'] = CodeListORM.getCodeList(qs_codeList,culture=culture,hierarchy=False)

            qs_resource = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = culture)
            if qs_resource:
                serializer_rs = ResourceListSerializer(qs_resource,many = True)
                item['SHORT_LABEL'] = serializer_rs.data[0].get('SHORT_LABEL')
                item['MOBILE_LABEL'] = serializer_rs.data[0].get('MOBILE_LABEL')
                dataList.append(item)


class TagsTypeLinkView(generics.ListAPIView):
    def get_queryset(self):
        pass
    permission_classes = [permissions.AllowAny]
    def get(self, request, *args, **kwargs):
        queryset = type_link.objects.filter(TYPE = 'TAGS')
        serializer = TypeLinkDetailsSerializer(queryset,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)