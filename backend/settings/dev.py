from .base import *
# import environ

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
        "ENGINE": env("PG_ENGINE"),
        "NAME": env("PG_DB"),
        "USER": env("PG_USER"),
        "PASSWORD": env("PG_PASS"),
        "HOST": env("PG_HOST"),
        "PORT": env("PG_PORT"),
        # "ENGINE": os.environ.get("PG_ENGINE", "django.db.backends.sqlite3"),
        # "NAME": os.environ.get("PG_DB", BASE_DIR / "db.sqlite3"),
        # "USER": os.environ.get("PG_USER", "user"),
        # "PASSWORD": os.environ.get("PG_PASS", "password"),
        # "HOST": os.environ.get("PG_HOST", "localhost"),
        # "PORT": os.environ.get("PG_PORT", "5432"),        
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
