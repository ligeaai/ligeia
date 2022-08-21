from .base import *

# import environ

DEBUG = True
# INSTALLED_APPS += ['django_extensions', ]
ALLOWED_HOSTS += ["192.168.1.104:8000"]

# database routing
DATABASE_ROUTERS = ["core.router.DatabaseAppsRouter"]

DATABASE_APPS_MAPPING = {
    # "users": "default",
    # "db_models": "default",
    "db_dictionaries": "mongodb",
}

DATABASES = {
    "default": {
        "ENGINE": env("PG_ENGINE"),
        "NAME": env("PG_DB"),
        "USER": env("PG_USER"),
        "PASSWORD": env("PG_PASS"),
        "HOST": env("PG_HOST"),
        "PORT": env("PG_PORT"),
    },
    # "mongodb": {
    #     "NAME": "db_dictionaries",
    #     "ENGINE": "djongo",
    #     "ENFORCE_SCHEMA": True,
    #     'CLIENT': {
    #         'host': 'mongodb://admin:manager@mongodb:27017',
    #     #     'host': 'localhost',
    #     #     'port': 270117,
    #     #     'username': 'admin',
    #     #     'password': 'manager',
    #     #     # 'authSource': 'dictionaries',
    #     #     # 'authMechanism': 'SCRAM-SHA-1'
    #     }
    # },
}

CELERY_BROKER_URL = os.environ.get("CELERY_BROKER", "redis://127.0.0.1:6379/0")
CELERY_RESULT_BACKEND = os.environ.get("CELERY_BACKEND", "redis://127.0.0.1:6379/0")


SOCIALACCOUNT_PROVIDERS = {
    "google": {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        "APP": {
            "client_id": "344458235841-ouh1mdjtcvk4p743ohdm10a7von2vbug.apps.googleusercontent.com",
            "secret": "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",
            "key": "344458235841-ouh1mdjtcvk4p743ohdm10a7von2vbug.apps.googleusercontent.com",
        }
    },
    "facebook": {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        "APP": {
            "client_id": "344458235841-ouh1mdjtcvk4p743ohdm10a7von2vbug.apps.googleusercontent.com",
            "secret": "ea397b51fc3cd7fdd6f4afc94e5c7c92",
            "key": "3411592432496228",
        }
    },
}
