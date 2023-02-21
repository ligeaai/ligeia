from django_elasticsearch_dsl import Document
from django_elasticsearch_dsl.registries import registry
from apps.item_property.models import item_property


@registry.register_document
class Item_PropertyDocument(Document):
    class Index:
        name = "item_property"
        settings = {"number_of_shards": 1, "number_of_replicas": 0}

    class Django:
        model = item_property
        fields = [
            "ITEM_TYPE",
            "PROPERTY_STRING",
            "ITEM_ID",
            "START_DATETIME",
            "LAYER_NAME",
            "PROPERTY_TYPE",
            "ROW_ID",
        ]
