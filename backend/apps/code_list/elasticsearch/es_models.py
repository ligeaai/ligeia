from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from apps.code_list.models import code_list


@registry.register_document
class CodeListDocument(Document):
    class Index:
        name = "code_list"
        settings = {"number_of_shards": 1, "number_of_replicas": 0}

    class Django:
        model = code_list
        fields = ["CULTURE", "CODE", "ROW_ID", "CODE_TEXT", "LAYER_NAME", "LIST_TYPE"]
