import uuid

from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red
# Create your views here.
from .models import code_list
from .serializers import CodeListDetailsSerializer, CodeListSaveSerializer,CodeListSaveScriptSerializer
from rest_framework.pagination import PageNumberPagination

class CodeListSaveScriptView(generics.CreateAPIView):

    serializer_class = CodeListSaveScriptSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    # def create(self, request, *args, **kwargs):       
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CodeListSaveView(generics.CreateAPIView):

    serializer_class = CodeListSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def _create_parent(self,request):
        parentValue = request.data.get('PARENT')
        temptCode = parentValue.get('LIST_TYPE')
        parentValue['LIST_TYPE'] = 'CODE_LIST'
        parentValue['CODE'] = temptCode
        parentValue['LAYER_NAME'] = "OG_STD"
        parentValue['VERSION'] = uuid.uuid4().hex
        parentValue['ROW_ID'] = uuid.uuid4().hex
        types = code_list.objects.create(**parentValue)
        types.save()
    def _create_child(self,request):
        childValue = request.data.get('CHILD')
        childValue['LIST_TYPE'] = request.data.get('PARENT').get('LIST_TYPE')
        childValue['LAYER_NAME'] = "OG_STD"
        childValue['VERSION'] = uuid.uuid4().hex
        childValue['ROW_ID'] = uuid.uuid4().hex
        childValues = code_list.objects.create(**childValue)
        childValues.save()
    def post(self, request, *args, **kwargs):
        self._create_parent(request)
        self._create_child(request)
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)

    
class CodeListView(generics.ListAPIView):

    serializer_class = CodeListSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        typeAddData.import_data("CODE_LIST")
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)


class CodeListDetailView(generics.CreateAPIView):

  
    serializer_class = CodeListDetailsSerializer
    authentication_classes = []
    permission_classes = []
    def post(self, request, *args, **kwargs):
        try:
            if request.data.get('PARENT'):
                cache_key = "Parent - " + request.data.get("CULTURE")
                queryset = code_list.objects.filter(LIST_TYPE = 'CODE_LIST',CULTURE = request.data.get('CULTURE'))
            else:
                cache_key = request.data.get('LIST_TYPE') + request.data.get("CULTURE")
                queryset = code_list.objects.filter(LIST_TYPE = request.data.get('LIST_TYPE'),CULTURE = request.data.get('CULTURE'))
            cache_data = Red.get(cache_key)
            if cache_data:
                return Response(cache_data,status=status.HTTP_200_OK)
            serializer = CodeListDetailsSerializer(queryset, many=True)
            cache_data = Red.set(cache_key,serializer.data)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response("ERROR",status=status.HTTP_400_BAD_REQUEST)
         
    # def list(self, request):
    #     # Note the use of `get_queryset()` instead of `self.queryset`
    #     try:
            
    #         cache_key = "CodeListDetails"
    #         # cache_data = Red.get(cache_key)
    #         # if cache_data:
    #         #     return Response(cache_data,status=status.HTTP_200_OK)
    #         queryset = self.get_queryset()
    #         serializer = CodeListDetailsSerializer(queryset, many=True)
    #         cache_data = Red.set(cache_key,serializer.data)
    #         return Response(serializer.data,status=status.HTTP_200_OK)
    #     except Exception as e:
    #         return Response(e)

class CodeListUpdateView(generics.UpdateAPIView):
    serializer_class = CodeListSaveScriptSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def put(self, request, *args, **kwargs):
        data = request.data.get('ITEMS')
        filter=request.data.get('FILTER_TYPE')
        qs = code_list.objects.filter(LIST_TYPE=filter.get('LIST_TYPE'),CODE = filter.get('CODE')).update(**data)

        return Response({'Message':'Successful Update '},status=status.HTTP_200_OK)
    

class CodeListDeleteView(generics.UpdateAPIView):
    serializer_class = CodeListSaveScriptSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def put(self, request, *args, **kwargs):
        filter=request.data.get('FILTER_TYPE')
        qs = code_list.objects.filter(LIST_TYPE=filter.get('LIST_TYPE'),CODE = filter.get('CODE')).delete()

        return Response({'Message':'Successful Delete '},status=status.HTTP_200_OK)