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


class LayerUpdateView(generics.UpdateAPIView):
    permission_classes = (permissions.AllowAny)

    def put(self, request, *args, **kwargs):
        data = request.data.get('DATA')
        qs = layer.objects.filter(LAYER_NAME=request.data.get('LAYER_NAME'))
        if qs:
            qs.update(data)
            return Response(
                {"Message": "Successful Update "}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"Message": "data not found"}, status=status.HTTP_400_BAD_REQUEST
            )
    
    
class LayerDeleteView(generics.CreateAPIView):
    permission_classes = [
        permissions.AllowAny
    ]
    def post(self, request, *args, **kwargs):
        qs = layer.objects.filter(LAYER_NAME=request.data.get('LAYER_NAME'))
        if qs:
            qs.delete()
            return Response(
                {"Message": "Successful Delete "}, status=status.HTTP_200_OK
            )
        else:
            return Response(
                {"Message": "data not found"}, status=status.HTTP_400_BAD_REQUEST
            )
