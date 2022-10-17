from django.shortcuts import render
from rest_framework.authentication import TokenAuthentication
from rest_framework import generics,permissions
from rest_framework.response import Response
from rest_framework import status
from .serializers import CodeListSaveSerializer,CodeListDetailsSerializer
# Create your views here.
from .models import code_list
from services.parsers.addData.type import typeAddData


class CodeListSaveView(generics.CreateAPIView):

    serializer_class = CodeListSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    # def post(self, request, *args, **kwargs):
    #     # if request.data['LEGACY_CODE'] == 'None':
    #     #     request.data['LEGACY_CODE'] = None
    #     print(type(request.data['LEGACY_CODE']))
    #     return Response('DENEME')


class CodeListView(generics.ListAPIView):

    serializer_class = CodeListSaveSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    def get(self, request, *args, **kwargs):
        
        typeAddData.import_data("CODE_LIST")
        return Response({"Message":'successful'}, status=status.HTTP_200_OK)


class CodeListDetailView(generics.ListAPIView):

    queryset = code_list.objects.all()
    serializer_class = CodeListDetailsSerializer
    authentication_classes = []
    permission_classes = []
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        try:
            queryset = self.get_queryset()
            serializer = CodeListDetailsSerializer(queryset, many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        except Exception as e:
            return Response(e)

