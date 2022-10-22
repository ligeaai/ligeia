import time
from django.shortcuts import render
from rest_framework import generics, permissions, status
from .models import item
from .serializers import ItemSaveSerializer, ItemCustomSaveSerializer
from rest_framework.response import Response
from services.parsers.addData.type import typeAddData
import uuid
<<<<<<< Updated upstream
from apps.item_property.views import ItemPropertyScriptSaveView
=======
from apps.item_property.views import ItemPropertyCustomSaveSerializer

>>>>>>> Stashed changes

# Create your views here.
class ItemScriptSaveView(generics.CreateAPIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
<<<<<<< Updated upstream
        serializer = ItemCustomSaveSerializer(data=request.data)
        serializer.is_valid()
        serializer.create(request.data)
        return Response(request.data, status=status.HTTP_201_CREATED)
        # return super().post(request, *args, **kwargs)

    # def post(self, request, *args, **kwargs):
    #     request.data._mutable = True
    #     request.data['ITEM_ID'] = uuid.uuid4().hex
    #     request.data['LAST_UPDT_DATE'] = str(datetime.now()).split(" ")[0]
    #     request.data['ROW_ID']  = uuid.uuid4().hex
    #     request.data['VERSION'] = uuid.uuid4().hex
    #     request.data['UPDATE_SOURCE'] = "x"
    #     request.data['CREATE_SOURCE'] = "x"
    #     new_response = ItemPropertyScriptSaveView.deneme(request)
    #     return super().post(request, *args, **kwargs)

=======
        item_id = uuid.uuid4().hex
        item_data = request.data['ITEM']
        item_data['ITEM_ID'] = item_id
        serializer = ItemCustomSaveSerializer(data = item_data)
        serializer.is_valid()
        serializer.create(item_data)
        serializer_prop = ItemPropertyCustomSaveSerializer(data = request.data)
        serializer_prop.is_valid()
        deneme = serializer_prop.create(request.data)
        return Response(deneme,status=status.HTTP_201_CREATED)
       
    
>>>>>>> Stashed changes

class ItemView(generics.ListAPIView):

    serializer_class = ItemSaveSerializer
    permission_classes = [permissions.AllowAny]

    def get(self, request, *args, **kwargs):
        typeAddData.import_data("ITEM")
<<<<<<< Updated upstream
        return Response({"Message": "successful"}, status=status.HTTP_200_OK)
=======
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)

>>>>>>> Stashed changes
