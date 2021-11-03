from django.contrib import admin
from django.apps import apps
from core.models._base_domain import Domain_base

# admin.site.register()

models = apps.get_models()

for model in models:
    try:
        admin.site.register(model)
    except admin.sites.AlreadyRegistered:
        pass

# admin.site.register(Domain_base)