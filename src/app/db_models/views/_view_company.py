
from rest_framework.viewsets import ModelViewSet
from ..serializers import CompanySerializer
from rest_framework import generics

from ..models import Company


# class CompanyList(ModelViewSet):
class CompanyView(ModelViewSet):
    queryset = Company.objects.all()
    # queryset = Company.objects.root_nodes()
    serializer_class = CompanySerializer
    http_method_names = ['get', 'head', 'options', 'delete', 'put', 'post']