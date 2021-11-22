from django.core import serializers
from dbmodels.models  import (
    Base_domain, )
from django.forms.models import model_to_dict
import json
from django.apps import apps

from django.core.serializers.json import DjangoJSONEncoder

class LazyEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, YourCustomType):
            return str(obj)
        return super().default(obj)

# import django
# django.setup()

# dict_obj = model_to_dict(UOM_Set)
# serialized = json.dumps(dict_obj)
serialized = serializers.serialize('json', Base_domain.objects.all())