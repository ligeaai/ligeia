import uuid

from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.logging.Handlers import KafkaLogger
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

logger = KafkaLogger()

class CodeListSaveScriptView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):
        serializer = CodeListCustomSerializer(data=request.data)   
        serializer.is_valid()
        serializer.save(request.data)
        Red.delete()
        message="Code list update successful"
        logger.info(request=request, message = message)
        return Response(
            {"Message":message, "BODY": request.data}, status=status.HTTP_200_OK
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
        validate_find(queryset,request=request)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        serializer = null_value_to_space(serializer.data,request=request)
        logger.info(request=request, message="Code list details only one fields")
        return Response(serializer, status=status.HTTP_200_OK)
    
    
    
class CodeListDeleteView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        qs = code_list.objects.filter(ROW_ID = request.data.get('ROW_ID'))
        validate_find(qs,request=request)
        qs.delete()
        message="Codelist deletion successful"
        logger.info(request=request, message=message)
        Red.delete()
        return Response(message, status=status.HTTP_200_OK)


class CodeListDeepDetailView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        cache_key = request.data.get('ROW_ID')
        cache_data = Red.get(cache_key)
        print(cache_data)
        if cache_data:
            return Response(cache_data, status=status.HTTP_200_OK)
        queryset = code_list.objects.filter(
            ROW_ID = request.data.get('ROW_ID')
        )
        validate_find(queryset,request)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        respons_value = []
        respons_value = self._get_child(serializer.data,respons_value,0,None)
        respons_value = null_value_to_space(respons_value,request)
        Red.set(cache_key, respons_value)
        logger.info(request=request, message="Code list deep details (Parent-Child Relationship)")
        return Response(respons_value, status=status.HTTP_200_OK)

    def _get_child(self, data,respons_value,index,parent):
        for item in data:
            childItem = []
            if parent is not None:
                for data in parent:
                    childItem.append(data)
           
            childItem.append(item.get('ROW_ID'))
                
            item['HIERARCHY'] = childItem
            if item.get('LIST_TYPE') != 'CODE_LIST':    
                respons_value.append(item)
            
            if index == 0:
                respons_value.append(item)
            queryset = code_list.objects.filter(
            LIST_TYPE=item.get("CODE"), CULTURE=item.get("CULTURE")
            )
            serializer = CodeListDetailsSerializer(queryset, many=True)
            self._get_child(serializer.data,respons_value,1,childItem)
        return respons_value
        
        
        
        
    # def _get_child(self, data,respons_value,index,parent):
    #     print(respons_value)
    #     for item in data:
         
    #         childItem = []
    #         if parent is not None :
    #             childItem.append(parent)
    #         if index == 1:
    #             childItem.append(item.get('ROW_ID'))
                
    #         item['HIERARCHY'] = childItem
    #         if item.get('LIST_TYPE') != 'CODE_LIST':    
    #             respons_value.append(item)
            
    #         if index == 0:
    #             respons_value.append(item)
    #         queryset = code_list.objects.filter(
    #         LIST_TYPE=item.get("CODE"), CULTURE=item.get("CULTURE")
    #         )
    #         serializer = CodeListDetailsSerializer(queryset, many=True)
    #         self._get_child(serializer.data,respons_value,1,childItem[0])
    #     return respons_value
 