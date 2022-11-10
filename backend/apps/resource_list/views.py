from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResourceListDetailsSerializer, ResourceListSaveSerializer
from apps.type.models import type as Type
from apps.type.serializers import TypeResourceListManagerSerializer
# Create your views here.
from .models import resource_list
from services.parsers.addData.type import typeAddData
from utils.models_utils import (
                                validate_model_not_null,
                                validate_find
                                )

class ResourceListSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]
    def post(self, request, *args, **kwargs):
        validate_model_not_null(request.data,"resource_list",request)
        serializer = ResourceListSaveSerializer(data = request.data)
        serializer.is_valid()
        serializer.create(request.data)
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)



class ResourceListView(generics.ListAPIView):

    serializer_class = ResourceListSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        typeAddData.import_data("RESOURCE_LIST")
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class ResourceListDrawerMenutView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]


    def get(self, request, *args, **kwargs):
        queryset = resource_list.objects.filter(ID = 'drawerMenu')
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        new_dict = dict()
        self._getchild(serializer.data,new_dict,0)
        return Response(new_dict, status=status.HTTP_200_OK)
    
    def _getchild(self,data,new_dict,sart):
        for item in data:
            queryset = resource_list.objects.filter(ID = item.get('LAYER_NAME'))
            serializer = ResourceListDetailsSerializer(queryset,many = True)
            if queryset:
                tempt= {}
                for value in serializer.data:
                    if value.get('LAYER_NAME') == 'TYPE.OG_STD':
                        url = value.get('URL')
                        serializer.data.remove(value)
                        types = str(value.get('LAYER_NAME')).split('TYPE.')[1]
                        queryset = Type.objects.filter(LAYER_NAME = types)
                        serializer = TypeResourceListManagerSerializer(queryset,many = True)
                        self._getResourceLabel(serializer.data,tempt,value.get('CULTURE'),url)
                        # tempt = serializer.data
                    else:
                        tempt[value.get('SHORT_LABEL')] = value
                item['Items'] = tempt
                
                print(new_dict.keys())
            if sart == 0:
                new_dict[item.get('SHORT_LABEL')] = item
            self._getchild(serializer.data,new_dict,1)

    def _getResourceLabel(self,data,tempt,culture,url):
        for item in data:
            tempt2 = {}
            queryset = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = culture)
            serializer = ResourceListDetailsSerializer(queryset,many = True)
            new_url =  url + '/'+str(item.get('TYPE')).lower()  
            serializer.data[0]['TYPE'] = item.get('TYPE')
            serializer.data[0]['URL'] = new_url
            tempt[serializer.data[0].get('SHORT_LABEL')] = serializer.data[0]
            


class ResourceListDetailView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []
    
    def post(self, request):
        queryset = resource_list.objects.filter(ROW_ID = request.data.get("ROW_ID"))
        validate_find(queryset,request)
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        return Response({"Message": "successful","BODY":serializer.data}, status=status.HTTP_200_OK)
