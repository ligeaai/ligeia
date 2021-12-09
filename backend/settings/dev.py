from .base import *
import environ

DEBUG = True
# INSTALLED_APPS += ['django_extensions', ]
ALLOWED_HOSTS += ['192.168.1.104:8000']

# database routing
# DATABASE_ROUTERS = ['db_routers.router.DatabaseAppsRouter']

# DATABASE_APPS_MAPPING = {
#         # 'dbmodels':'postgresql', 
#         # 'oauth': 'default', 
#         'dictionaries':'default',
#         }

DATABASES = {
    'default': {
        "ENGINE": 'django.db.backends.postgresql_psycopg2',
        "NAME": env("POSTGRES_DB"),
        "USER": env("POSTGRES_USER"),
        # 'PASSWORD': 'manager',
        "PASSWORD": env("POSTGRES_PASS"),
        # "HOST": env("POSTGRES_HOST"),
        # "PORT": env("POSTGRES_PORT"),
    },
    # 'mongodb': {
    #     'NAME': 'dictionaries',
    #     'ENGINE': 'djongo',        
    #     'ENFORCE_SCHEMA': True,
    #         # 'CLIENT': {
    #         #     'host': 'localhost',
    #         #     'port': 270117,
    #         #     # 'username': 'db-username',
    #         #     # 'password': 'password',
    #         #     # 'authSource': 'dictionaries',
    #         #     # 'authMechanism': 'SCRAM-SHA-1'
    #         # }
    # },
}
