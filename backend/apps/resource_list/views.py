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


class ResourceListDrawerMenutView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        pass
    def get(self, request, *args, **kwargs):
        # queryset = Type.objects.filter(LAYER_NAME = 'OG_STD')
        # serializer = TypeDetailsSerializer(queryset,many = True)
        # print(len(serializer.data))
        queryset = resource_list.objects.filter(ID = 'drawerMenu')
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        new_dict = dict()
        self._getchild(serializer.data,new_dict,0)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def _getchild(self,data,new_dict,sart):
        for item in data:
            queryset = resource_list.objects.filter(ID = item.get('LAYER_NAME'))
            serializer = ResourceListDetailsSerializer(queryset,many = True)
            if queryset:
                tempt= {}
                for value in serializer.data:
                    if value.get('LAYER_NAME') == 'TYPE.OG_STD':
                        serializer.data.remove(value)
                        types = str(value.get('LAYER_NAME')).split('TYPE.')[1]
                        url = url = value.get('URL')
                        queryset = Type.objects.filter(LAYER_NAME = types)
                        serializer = TypeResourceListManagerSerializer(queryset,many = True)
                        if value.get('ID')== "CONFIGURATION-ITEMS":
                            self._getResourceLabel(value,tempt,serializer.data),
                        elif value.get('ID')=="CONFIGURATION-ORGANIZATION":
                            self._getOrganinationsMenu(value,tempt,serializer.data)
                        elif value.get('ID')=="CONFIGURATION-GEOPGRAPHY":
                            self._getGeographyMenu(value,tempt,serializer.data)
                        
                        # print(value.get('ID'))
                        # self._getResourceLabel(serializer.data,tempt,value.get('CULTURE'),url)
                        # tempt = serializer.data
                    else:
                        tempt[value.get('SHORT_LABEL')] = value
                item['Items'] = tempt
                
                
            if sart == 0:
                new_dict[item.get('SHORT_LABEL')] = item
            self._getchild(serializer.data,new_dict,1)

    def _getOrganinationsMenu(self,value,tempt,data):
        find_type = ['TYPE.COMPANY',"TYPE.ORG_UNIT1","TYPE.ORG_UNIT2","TYPE.ORG_UNIT3","TYPE.ORG_UNIT4"]
        url = value.get('URL')
        for item in data:
            try:
                x = find_type.index(item.get('LABEL_ID'))
                new_url =  url + '/'+str(item.get('TYPE')).lower()
                item['URL'] = new_url
                item['ICON'] = ""
                item['SHORT_LABEL'] = item.get('TYPE')
                tempt[item.get('TYPE')] = item
            except:
                pass

    def _getResourceLabel(self,value,tempt,data):
        find_type = ['TYPE.COMPANY',"TYPE.ORG_UNIT1","TYPE.ORG_UNIT2","TYPE.ORG_UNIT3","TYPE.ORG_UNIT4",
                     'TYPE.GEO_UNIT1',"TYPE.GEO_UNIT1","TYPE.GEO_UNIT1","TYPE.ORG_UNIT3"]
        url = value.get('URL')
        culture = value.get('CULTURE')
        for item in data:
            try:
                x = find_type.index(item.get('LABEL_ID'))
            except:
                queryset = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = culture,HIDDEN = False)
                if queryset:
                    serializer = ResourceListDetailsSerializer(queryset,many = True)
                    new_url =  url + '/'+str(item.get('TYPE')).lower()
                    serializer.data[0]['TYPE'] = item.get('TYPE')
                    serializer.data[0]['URL'] = new_url
                    if serializer.data[0].get('ID') == 'TYPE.ORG_UNIT2':
                        mobile_label = serializer.data[0].get('SHORT_LABEL')
                        # tempt[serializer.data[0].get('MOBILE_LABEL')] = serializer.data[0]
                        serializer.data[0]['SHORT_LABEL'] = serializer.data[0].get('MOBILE_LABEL')
                        serializer.data[0]['MOBILE_LABEL'] = mobile_label
                    
                    tempt[serializer.data[0].get('SHORT_LABEL')] = serializer.data[0]

    def _getGeographyMenu(self,value,tempt,data):
        find_type = ['TYPE.GEO_UNIT1',"TYPE.GEO_UNIT2","TYPE.GEO_UNIT3"]
        url = value.get('URL')
        culture = value.get('CULTURE')
        for item in data:
            try:
                queryset = resource_list.objects.filter(ID = item.get('LABEL_ID'),CULTURE = culture,HIDDEN = False)
                if queryset:
                    serializer = ResourceListDetailsSerializer(queryset,many = True)
                    x = find_type.index(item.get('LABEL_ID'))
                    new_url =  url + '/'+str(item.get('TYPE')).lower()
                    item['URL'] = new_url
                    item['ICON'] = ""
                    item['SHORT_LABEL'] = serializer.data[0].get('SHORT_LABEL')
                    tempt[item.get('TYPE')] = item
            except:
                pass



class ResourceListDetailView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []
    
    def post(self, request):
        queryset = resource_list.objects.filter(ROW_ID = request.data.get("ROW_ID"))
        validate_find(queryset,request)
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        return Response({"Message": "successful","BODY":serializer.data}, status=status.HTTP_200_OK)
