import uuid

from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red
# Create your views here.
from .models import code_list
from .serializers import (
    CodeListDetailsSerializer,
    CodeListCustomSerializer,
    CodeListSaveSerializer,
)
from rest_framework.pagination import PageNumberPagination
from utils.models_utils import (
                                validate_model_not_null,
                                null_value_to_space,
                                validate_find,
                                )


class CodeListSaveScriptView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):
        serializer = CodeListCustomSerializer(data=request.data)   
        serializer.is_valid()
        serializer.save(request.data)
        return Response(
            {"Message": "successful", "BODY": request.data}, status=status.HTTP_200_OK
        )


class CodeListView(generics.ListAPIView):
    serializer_class = CodeListSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):

        typeAddData.import_data("CODE_LIST")
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


class CodeListDetailView(generics.CreateAPIView):

    serializer_class = CodeListDetailsSerializer
    authentication_classes = []
    permission_classes = []

    def post(self, request, *args, **kwargs):
        
        if request.data.get('ROW_ID'):
            queryset = code_list.objects.filter(
                ROW_ID=request.data.get('ROW_ID'),
                )
        else:
            queryset = code_list.objects.filter(
                    LIST_TYPE=request.data.get('LIST_TYPE'),
                    CULTURE=request.data.get("CULTURE"),
                    )
        validate_find(queryset)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        serializer = null_value_to_space(serializer)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
    
class CodeListDeleteView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        qs = code_list.objects.filter(ROW_ID = request.data.get('ROW_ID'))
        if qs:
            qs.delete()
            return Response(
                {"Message": "Successful Delete "}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"Message": "data not found"}, status=status.HTTP_400_BAD_REQUEST
            )


class CodeListDeepDetailView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        # cache_key = request.data.get("LIST_TYPE") + request.data.get("CULTURE")
        queryset = code_list.objects.filter(
            ROW_ID = request.data.get('ROW_ID')
        )
        serializer = CodeListDetailsSerializer(queryset, many=True)
        respons_value = []
        respons_value = self._get_child(serializer.data,respons_value,0)
        return Response(respons_value, status=status.HTTP_200_OK)

    def _get_child(self, data,respons_value,index):
        for item in data:
            childItem = []
            childItem.append(item.get('CODE'))
            if index == 1:
                childItem.append(item.get('LIST_TYPE'))
            
            item['HIERARCHY'] = childItem
            respons_value.append(item)
            queryset = code_list.objects.filter(
            LIST_TYPE=item.get("CODE"), CULTURE=item.get("CULTURE")
            )
            serializer = CodeListDetailsSerializer(queryset, many=True)
            self._get_child(serializer.data,respons_value,1)
        return respons_value
 