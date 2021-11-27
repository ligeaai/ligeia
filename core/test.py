# import os, django, glob, sys, shelve
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.dev')

# django.setup()

from dictionaries.models._uom_set import UOM_Set

choices2 = [x for x in UOM_Set.objects.all() if x.get_children().exists()]

print(choices2)