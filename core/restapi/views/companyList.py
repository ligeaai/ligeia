
from rest_framework.viewsets import ModelViewSet
from restapi.serializers import CompanyListSerializer
from rest_framework import generics

from db_models.models import Company


# class CompanyList(ModelViewSet):
class CompanyList(ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanyListSerializer
    http_method_names = ['get', 'head', 'options', 'delete', 'put', 'post']