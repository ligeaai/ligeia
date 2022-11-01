from urllib import response
from django.shortcuts import render
from rest_framework import generics, permissions, status
import json
from rest_framework.response import Response

from .models import page_resource_list
from .serializers import PageResourceListSerializer,PageResourceListDetailsSerializer
from services.parsers.addData.type import typeAddData
# Create your views here.
class PageResourceListView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        test = typeAddData.drawerMenuJson()
        return Response(test, status=status.HTTP_200_OK)

class PageResourceListCreateView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]
    def create(self, request, *args, **kwargs):
        serializer = PageResourceListSerializer(request.data)
        serializer.create(request.data)
        return Response({"Message": "test"}, status=status.HTTP_200_OK)
    

class PageResourceListDetailsView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]
    lookup_field = 'pk'
    def list(self, request, *args, **kwargs):
        model = self.kwargs['model']
        queryset = page_resource_list.objects.filter(MODEL = model,PARENT = None)
        serializer = PageResourceListDetailsSerializer(queryset,many = True)
        tempt = {}
        self.getChild(serializer.data,tempt,0)
        response_dict = dict()
        response_dict['drawerMenu'] = response_dict
        return Response(tempt, status=status.HTTP_200_OK)

    def getChild(self,data,tempt,condition):
        for item in data:
            queryset = page_resource_list.objects.filter(
                PARENT = item.get('SHORT_LABEL'))
            serializer = PageResourceListDetailsSerializer(queryset,many = True)
            if queryset:
                new_dict ={}
                for index in range(0,len(serializer.data)):
                    new_dict[serializer.data[index].get('SHORT_LABEL')] = serializer.data[index]
                item['items'] = new_dict
            if condition == 0:
                tempt[item.get('SHORT_LABEL')] =  item
            self.getChild(serializer.data,tempt,1)
        
 









    # def getChild(self,data,return_list):
    #     for item in data:
    #         print(str(item.get('PARENT'))+'----->'+str(item.get('SHORT_LABEL')))
    #         queryset = page_resource_list.objects.filter(
    #             PARENT = item.get('SHORT_LABEL'))
    #         serializer = LayerDropDown2Serializer(queryset,many = True)
    #         if queryset:
    #             new_dict ={}
    #             # item['items'] = serializer.data
    #             for index in range(0,len(serializer.data)):
    #                 new_dict[serializer.data[index].get('SHORT_LABEL')] = serializer.data[index]
    #             item['items'] = new_dict
    #         return_list.append(item)
    #         self.getChild(serializer.data,return_list)
    #     return (return_list)
        
