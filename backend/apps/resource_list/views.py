from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResourceListDetailsSerializer, ResourceListSaveSerializer
from apps.type.models import type as Type
from apps.type.serializers import TypeResourceListManagerSerializer,TypeDetailsSerializer
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


class ResourceListDrawerMenutView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request, *args, **kwargs):
        culture = request.data.get('CULTURE')
        queryset = resource_list.objects.filter(ID = 'drawerMenu',CULTURE = culture)
        validate_find(queryset,request)
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        new_dict = dict()
        self._getchild(serializer.data,new_dict,0,culture)
        return Response(new_dict, status=status.HTTP_200_OK)
    
    def _getchild(self,data,new_dict,sart,culture):
        for item in data:
            queryset = resource_list.objects.filter(ID = item.get('LAYER_NAME'),CULTURE = culture)
            serializer = ResourceListDetailsSerializer(queryset,many = True)
            if queryset:
                tempt= {}
                for value in serializer.data:
                    layer = value.get('LAYER_NAME')
                    if  str(layer).split('.')[0] == 'TYPE':
                        url = value.get('URL')
                        try:
                            serializer.data.remove(value)
                        except:
                            pass
                        types = layer.split('.')[1]
                        if types == 'OG_STD':
                            queryset = Type.objects.filter(LAYER_NAME = types)
                        else:
                            queryset = Type.objects.filter(LABEL_ID = layer)
                        serializer = TypeResourceListManagerSerializer(queryset,many = True)
                        self._getResourceLabel(serializer.data,tempt,value.get('CULTURE'),url,types)
                        
                    else:
                        tempt[value.get('SHORT_LABEL')] = value
                item['Items'] = tempt
                
            if sart == 0:
                new_dict[item.get('SHORT_LABEL')] = item
            self._getchild(serializer.data,new_dict,1,culture)

    def _getResourceLabel(self,data,tempt,culture,url,types):
        find_type = []
        if types == 'OG_STD':
            find_type = ['TYPE.COMPANY',"TYPE.ORG_UNIT1","TYPE.ORG_UNIT2","TYPE.ORG_UNIT3","TYPE.ORG_UNIT4",
                     'TYPE.GEO_UNIT1',"TYPE.GEO_UNIT1","TYPE.GEO_UNIT1","TYPE.ORG_UNIT3"]
        for item in data:
            try:
                x = find_type.index(item.get('LABEL_ID'))
            except:
                tempt2 = {}
                queryset = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = culture)
                serializer = ResourceListDetailsSerializer(queryset,many = True)
                new_url =  url + '/'+str(item.get('TYPE')).lower()  
                serializer.data[0]['TYPE'] = item.get('TYPE')
                serializer.data[0]['URL'] = new_url
                if item.get('LABEL_ID') == 'TYPE.ORG_UNIT2':
                    short_label = serializer.data[0].get('SHORT_LABEL')
                    serializer.data[0]['SHORT_LABEL'] = serializer.data[0].get('MOBILE_LABEL')
                    serializer.data[0]['MOBILE_LABEL'] = short_label
                    
                tempt[serializer.data[0].get('SHORT_LABEL')] = serializer.data[0]
    
        


class ResourceListDetailView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []
    
    def post(self, request):
        queryset = resource_list.objects.filter(ROW_ID = request.data.get("ROW_ID"))
        validate_find(queryset,request)
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        return Response({"Message": "successful","BODY":serializer.data}, status=status.HTTP_200_OK)
