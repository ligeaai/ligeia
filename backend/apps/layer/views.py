from django.shortcuts import render
from rest_framework import generics, permissions, status
from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
from utils.utils import redisCaching as Red

# Create your views here.
from .models import layer
from .serializers import LayerSaveSerializer

class LayerSaveView(generics.CreateAPIView):

    serializer_class = LayerSaveSerializer
    permission_classes = [permissions.AllowAny]



class LayerView(generics.ListAPIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("LAYER")
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)


# Create your views here.
class LayerModelViewSet(generics.ListAPIView):
    queryset = layer.objects.all()
    serializer_class = LayerSaveSerializer
    permission_classes = (permissions.AllowAny,)