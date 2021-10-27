import os
from settings.base import *  # NOQA

DEBUG = os.environ.get("DEBUG", False)

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ.get("SQL_DATABASE", os.path.join(BASE_DIR, "db.sqlite3")),
        'USER': os.environ.get("SQL_USER", "user"),
        'PASSWORD': os.environ.get("SQL_PASSWORD", "password"),
        'HOST': os.environ.get("SQL_HOST", "localhost"),
        'PORT': os.environ.get("SQL_PORT", "5432"),
    }
}