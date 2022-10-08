from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import TypeSaveSerializer,TypeDetailsSerializer
# Create your views here.
from .models import type as Type
from apps.parsers.addData.type import typeAddData 


class TypeSaveView(generics.CreateAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]


class TypeView(generics.ListAPIView):

    serializer_class = TypeSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        data = typeAddData.create_type_data()
        return Response({"Error":'error_message'}, status=status.HTTP_200_OK)


class TypeDetailView(generics.ListAPIView):

    queryset = Type.objects.all()
    serializer_class = TypeDetailsSerializer
    authentication_classes = [TokenAuthentication,]
    permission_classes = [permissions.IsAuthenticated]
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        try:
            queryset = self.get_queryset()
            serializer = TypeDetailsSerializer(queryset, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)

