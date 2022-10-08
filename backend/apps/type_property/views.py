
from django.shortcuts import render

from rest_framework.authentication import TokenAuthentication
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import TypePropertySaveSerializer,TypePropertyDetailsSerializer
# Create your views here.
from .models import type_property
from apps.parsers.addData.type import typeAddData 

class TypePropertySaveView(generics.CreateAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TypePropertyView(generics.ListAPIView):

    serializer_class = TypePropertySaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_property_data()
        return Response({"Error":'girdi'}, status=status.HTTP_200_OK)


class TypePropertyDetailView(generics.ListAPIView):

    queryset = type_property.objects.all()
    serializer_class = TypePropertyDetailsSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        try:
            queryset = self.get_queryset()
            serializer = TypePropertyDetailsSerializer(queryset, many=True)
            
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)
