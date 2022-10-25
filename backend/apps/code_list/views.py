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


class CodeListSaveScriptView(generics.UpdateAPIView):
    permission_classes = [permissions.AllowAny]

    def put(self, request, *args, **kwargs):
        serializer = CodeListCustomSerializer(data=request.data)
        serializer.is_valid()
        serializer.save(request.data)
        return Response(
            {"Message": "successful", "BODY": request.data}, status=status.HTTP_200_OK
        )

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     serializer.is_valid(raise_exception=True)
    #     self.perform_create(serializer)
    #     headers = self.get_success_headers(serializer.data)
    #     return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
        try:
            if request.data.get('ROW_ID'):
                queryset = code_list.objects.filter(
                ROW_ID=request.data.get('ROW_ID'),
                )
            else:
                queryset = code_list.objects.filter(
                    LIST_TYPE=request.data.get('LIST_TYPE'),
                    CULTURE=request.data.get("CULTURE"),
                    )
        except Exception as e:
                return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)
        serializer = CodeListDetailsSerializer(queryset, many=True)
        for index in range(0, len(serializer.data)):
            item = serializer.data[index]
            for keys, value in item.items():
                if value is None or value == "NONE":
                    serializer.data[index][keys] = ""
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
        cache_key = request.data.get("LIST_TYPE") + request.data.get("CULTURE")
        queryset = code_list.objects.filter(
            LIST_TYPE=request.data.get("LIST_TYPE"), CULTURE=request.data.get("CULTURE")
        )
        serializer = CodeListDetailsSerializer(queryset, many=True)
        for index in range(0, len(serializer.data)):
            self._get_child(serializer.data[index])
        return Response(serializer.data, status=status.HTTP_200_OK)

    def _get_child(self, data):
        queryset = code_list.objects.filter(
            LIST_TYPE=data.get("CODE"), CULTURE=data.get("CULTURE")
        )
        serializer = CodeListDetailsSerializer(queryset, many=True)
        data["CHILD"] = serializer.data
        for index in serializer.data:
            tempt = index
            self._get_child(tempt)
        return data
