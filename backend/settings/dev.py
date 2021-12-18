from .base import *

# import environ

DEBUG = True
# INSTALLED_APPS += ['django_extensions', ]
ALLOWED_HOSTS += ["192.168.1.104:8000"]

# database routing
DATABASE_ROUTERS = ["core.router.DatabaseAppsRouter"]

DATABASE_APPS_MAPPING = {
    # "apps.users": "default",
    # "apps.db_models": "default",
    "apps.db_dictionaries": "mongodb",
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
    "mongodb": {
        "NAME": "db_dictionaries",
        "ENGINE": "djongo",
        "ENFORCE_SCHEMA": True,
        'CLIENT': {
            'host': 'mongodb://mongodb:27017',
            # 'port': 270117,
            # 'username': 'admin',
            # 'password': 'manager',
            # 'authSource': 'dictionaries',
            # 'authMechanism': 'SCRAM-SHA-1'
        }
    },
}
