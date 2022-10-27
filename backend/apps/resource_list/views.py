from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import ResourceListDetailsSerializer, ResourceListSaveSerializer

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
        validate_model_not_null(request.data,"resource_list")
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


class ResourceListDetailView(generics.CreateAPIView):

    authentication_classes = []
    permission_classes = []

    def post(self, request):
        queryset = resource_list.objects.filter(ROW_ID = request.data.get("ROW_ID"))
        validate_find(queryset)
        serializer = ResourceListDetailsSerializer(queryset,many = True)
        return Response({"Message": "successful","BODY":serializer.data}, status=status.HTTP_200_OK)
