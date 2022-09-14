from ast import Delete
from http.client import responses
from django.shortcuts import render
from rest_framework.filters import SearchFilter
from rest_framework import generics
from django_filters.rest_framework import DjangoFilterBackend
from django.http import JsonResponse
from rest_framework.viewsets import ModelViewSet,ReadOnlyModelViewSet,GenericViewSet
from rest_framework import mixins
from .pagination import SmallPagination
from rest_framework.response import Response
from .models import code_list
from .serializers import CodeListSerializer
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class code_list_chema_view(mixins.ListModelMixin,GenericViewSet):
    queryset = code_list.objects.all()
    serializer_class = CodeListSerializer

    def list(self, request, *args, **kwargs):
        # pass
        response = super().list(request, *args, **kwargs)
        result_dict = {}

        for key in response.data:
        # .get('results'):
            parent = key.get("LISTTYPE")
            if result_dict.get(parent, None):
                pass
            else:
                result_dict[parent] = [dict(key)]
        return JsonResponse(result_dict)



class code_list_listtype_view(ModelViewSet):
    serializer_class = CodeListSerializer
    
    def get_queryset(self):
        queryset = code_list.objects.all()
        listtype = self.request.query_params.get('LISTTYPE', None)
        if listtype in cache:
            print("cache is work")
            myCache = cache.get(listtype)
            return myCache
        else:
            if listtype is not None:
                print("cache set")
                queryset = queryset.filter(LISTTYPE=listtype)
                cache.set(listtype, queryset, timeout=CACHE_TTL)
            return queryset
