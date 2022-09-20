from django.apps import AppConfig


class CodeListConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "apps.code_list"
    def ready(self):
        import apps.code_list.signals