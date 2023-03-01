from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from .es_models import ResourceListDocument


class ResourceListDocumentSimpleSerializer(DocumentSerializer):
    class Meta:
        document = ResourceListDocument
        fields = "__all__"
