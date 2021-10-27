from django.contrib import admin
from django.apps import apps
from models.domain_base import Domain_base

# admin.site.register()

# models = apps.get_models()

# for model in models:
#     try:
#         admin.site.register(model)
#     except admin.sites.AlreadyRegistered:
#         pass

admin.site.register(Domain_base)