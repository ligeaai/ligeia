from datetime import datetime
from django.shortcuts import render
from rest_framework import generics,permissions,status
from .models import item
from .serializers import ItemSaveSerializer
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
import uuid
# Create your views here.
class ItemScriptSaveView(generics.CreateAPIView):
    serializer_class = ItemSaveSerializer
    permission_classes = [
            permissions.AllowAny
        ]
    def post(self, request, *args, **kwargs):
        print(request.data.get('START_DATETIME'))
        request.data['ITEM_ID'] = uuid.uuid4().hex
        request.data['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
        request.data['ROW_ID']  = uuid.uuid4().hex
        request.data['VERSION'] = uuid.uuid4().hex
        request.data['UPDATE_SOURCE'] = "x"
        request.data['CREATE_SOURCE'] = "x"
        return super().post(request, *args, **kwargs)
    

class ItemView(generics.ListAPIView):

    serializer_class = ItemSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM")
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)