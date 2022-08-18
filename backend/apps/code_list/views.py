from django.shortcuts import render
from rest_framework import generics
from rest_framework.filters import SearchFilter
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse

from rest_framework.viewsets import ModelViewSet


from .models import code_list
from .serializers import CodeListSerializer


class code_list_view(ModelViewSet):
    queryset = code_list.objects.all()
    serializer_class = CodeListSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filter_fields = ("id", "LISTTYPE")
    search_field = ("id", "LISTTYPE")

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        result_dict = {}

        for key in response.data.get("results"):
            parent = key.get("LISTTYPE")
            if result_dict.get(parent, None):
                result_dict[parent].append(dict(key))
            else:
                result_dict[parent] = [dict(key)]
        return JsonResponse(result_dict)
