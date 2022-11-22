from django.shortcuts import render
from .models import tags
from rest_framework import permissions,status,generics
from rest_framework.response import Response
from .serializers import TagsDetiailsSerializer,TagsSaveSerializer,TagsFieldsSerializer
# Create your views here.

class TagsSaveView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = TagsSaveSerializer(data = request)
        serializer.is_valid()
        message = serializer.save(request)
        return Response(message,status=status.HTTP_200_OK)
    

class TagsDetailsView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = tags.objects.filter(ITEM_ID = request.data.get('ITEM_ID'))
        serializer = TagsDetiailsSerializer(qs,many = True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
class TagsDeleteView(generics.CreateAPIView):

    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        qs = tags.objects.filter(ITEM_ID = request.data.get('ITEM_ID'))
        if qs:
            qs.delete
        return Response("Succsessful",status=status.HTTP_200_OK)