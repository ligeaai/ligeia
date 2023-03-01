from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from apps.resource_list.models import resource_list


@registry.register_document
class ResourceListDocument(Document):
    class Index:
        name = "resource_list"
        settings = {"number_of_shards": 1, "number_of_replicas": 0}

    class Django:
        model = resource_list
        fields = [
            "CULTURE",
            "SHORT_LABEL",
            "ID",
            "MOBILE_LABEL",
            "LAYER_NAME",
            "ROW_ID",
            "SORT_ORDER",
            "PARENT",
        ]
