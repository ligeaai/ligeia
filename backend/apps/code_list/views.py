from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet,GenericViewSet
from rest_framework import mixins
from .pagination import SmallPagination
from .models import code_list
from .serializers import CodeListSerializer
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT


CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

class code_list_chema_view(mixins.ListModelMixin,GenericViewSet):
    serializer_class = CodeListSerializer
    pagination_class = SmallPagination
    def get_queryset(self):
        queryset = code_list.objects.all()
        check_dict = {}
        myQueryset = []
        for i in queryset:
            parent = i.LISTTYPE
            if check_dict.get(parent, None):
                pass
            else:
                check_dict[parent] = "a"
                myQueryset.append(i)
        return myQueryset


class code_list_listtype_view(ModelViewSet):
    serializer_class = CodeListSerializer
    pagination_class = SmallPagination
    def get_queryset(self):
        queryset = code_list.objects.all()
        listtype = self.request.query_params.get('LISTTYPE', None)
        if listtype in cache:
            myCache = cache.get(listtype)
            return myCache
        else:
            if listtype is not None:
                queryset = queryset.filter(LISTTYPE=listtype)
                if queryset:#prevents adding a hollow queryset to the cache
                    cache.set(listtype, queryset, timeout=CACHE_TTL)
            return queryset
