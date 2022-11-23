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

    def post(self, request, *args, **kwargs):
        qs = tags.objects.all()
        serializer = TagsDetiailsSerializer(qs,many = True)
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
        qs = type_property.objects.filter(TYPE ='TAG_CACHE')
        serializer = TypePropertyDetailsSerializer(qs,many = True)
        new_dict = dict()
        new_list = []
        for item in (serializer.data):
            qs_resource = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = request.data.get('CULTURE'))
            print(qs_resource)
            if qs_resource:
                serializer_rs = ResourceListSerializer(qs_resource,many = True)
                item['SHORT_LABEL'] = serializer_rs.data[0].get('SHORT_LABEL')
                item['SHORT_LABEL'] = serializer_rs.data[0].get('MOBILE_LABEL')
                new_list.append(item)
        return Response(new_list,status=status.HTTP_200_OK)
        