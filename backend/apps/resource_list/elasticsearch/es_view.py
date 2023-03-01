from .es_models import ResourceListDocument
from .es_serializer import ResourceListDocumentSimpleSerializer
from rest_framework import permissions, status
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django_elasticsearch_dsl.search import Search
from django_elasticsearch_dsl_drf.pagination import PageNumberPagination
from rest_framework.response import Response


class ESResourceListViewSet(DocumentViewSet):
    document = ResourceListDocument
    serializer_class = ResourceListDocumentSimpleSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        label = request.data.get("PARENT")
        culture = request.data.get("CULTURE")
        s = Search(index="resource_list")
        s = s.query("match_phrase_prefix", PARENT=label)
        s = s.filter("match", CULTURE=culture)
        s = s.params(size=1)
        response = s.execute()
        serializer = self.get_serializer(response.hits, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
