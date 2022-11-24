from django.shortcuts import render
from .models import tags
from rest_framework import permissions,status,generics
from rest_framework.response import Response
from .serializers import TagsDetiailsSerializer,TagsSaveSerializer,TagsFieldsSerializer
from apps.type_property.models import type_property
from apps.resource_list.models import resource_list 
from apps.resource_list.serializers import ResourceListSerializer 
from apps.type_property.serializers import TypePropertyDetailsSerializer
# Create your views here.

class TagsSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TagsSaveSerializer(data = request)
        serializer.is_valid()
        message = serializer.save(request)
        return Response(message,status=status.HTTP_200_OK)
    

class TagsDetailsView(generics.ListAPIView):

    permission_classes = [permissions.AllowAny]
    def get_queryset(self):
        pass
    def get(self, request, *args, **kwargs):
        queryset = tags.objects.all()
        serializer = TagsDetiailsSerializer(queryset,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class TagsDeleteView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = tags.objects.filter(ITEM_ID = request.data.get('ITEM_ID'))
        if qs:
            qs.delete
        return Response("Succsessful",status=status.HTTP_200_OK)


class TagsPropertysView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        new_dict = {} 
        queryset = type_property.objects.filter(TYPE = 'TAG_CACHE')
        serializer = TypePropertyDetailsSerializer(queryset,many = True)
        queryset_map = type_property.objects.filter(TYPE = 'TAG_MAP')
        serializer_map = TypePropertyDetailsSerializer(queryset_map,many = True)
        tag_cache = []
        tag_map = []
        self._resourceLabel(serializer.data,tag_cache,request.data.get('CULTURE'))
        self._resourceLabel(serializer_map.data,tag_map,request.data.get('CULTURE'))
        new_dict = {
            "TAG_CACHE":tag_cache,
            "TAG_MAP":tag_map
        }
        return Response(new_dict,status=status.HTTP_200_OK)
    def _resourceLabel(self,data,dataList,culture):
        for item in (data):
            qs_resource = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = culture)
            if qs_resource:
                serializer_rs = ResourceListSerializer(qs_resource,many = True)
                item['SHORT_LABEL'] = serializer_rs.data[0].get('SHORT_LABEL')
                item['SHORT_LABEL'] = serializer_rs.data[0].get('MOBILE_LABEL')
                dataList.append(item)