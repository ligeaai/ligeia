# from django.apps import apps
# apps.all_models['apps.db_models']

from django.apps import apps

for app in apps.get_app_configs():
    print(app.verbose_name, ":")
    for model in app.get_models():
        print("\t", model)


# from django.conf import settings
# print(settings.INSTALLED_APPS)