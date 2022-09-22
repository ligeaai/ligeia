import os
import logging
import environ
from datetime import timedelta
from rest_framework.settings import api_settings

from django.utils.translation import gettext_lazy as _

logger = logging.getLogger(__name__)

env = environ.Env(DEBUG=(bool, False))

BASE_DIR = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))), "backend/"
)

environ.Env.read_env(os.path.join(BASE_DIR, "../.env"))

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = env("SECRET_KEY")

DEBUG = env("DEBUG")
TEMPLATE_DEBUG = DEBUG
PAGE_CACHE_SECONDS = 60
LOGGING_CONFIG = None
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
SITE_ID = 1

# TODO: n a real production server this should have a proper url
ALLOWED_HOSTS = env("ALLOWED_HOSTS").split(" ")

CORS_ALLOW_ALL_ORIGINS = True

DJANGO_APPS = [
    "django.contrib.contenttypes",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "django.contrib.sites",
]

THIRD_PARTY_APPS = [
    "raven.contrib.django.raven_compat",
    "rest_framework",
    "rest_framework.authtoken",
    "drf_yasg",
    "knox",
    "django_extensions",
    "django_filters",
    # "cities_light",
    "corsheaders",
    "smart_selects",
    # 'social_django',
    "health_check",  # required
    "health_check.db",  # stock Django health checkers
    "health_check.cache",
    "health_check.storage",
    "rosetta",
    "modeltranslation",
    # "oauth2_provider",
    'dj_rest_auth',
    "allauth",
    "allauth.account",
    "allauth.socialaccount",
    "allauth.socialaccount.providers.google",
    "allauth.socialaccount.providers.facebook",
]

LOCAL_APPS = [
    # "apps.base",
    # "apps.citylight",
    # "apps.db_models",
    # "apps.db_dictionaries",
    # "apps.config",
    "apps.users",
    "apps.code_list.apps.CodeListConfig",
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.locale.LocaleMiddleware",
    # "social_django.middleware.SocialAuthExceptionMiddleware",
]

ROOT_URLCONF = "core.urls"
ASGI_APPLICATION = "core.asgi.application"
WSGI_APPLICATION = "core.wsgi.application"
AUTH_USER_MODEL = "users.User"

TIME_ZONE = "UTC"
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGE_CODE = "en"
LANGUAGES = (
    ("en", _("English")),
    ("ru", _("Russian")),
    ("de", _("German")),
    # ('tr', _('Turkish')),
)

LOCALE_PATHS = [os.path.join(BASE_DIR, "locale/")]

CITIES_LIGHT_TRANSLATION_LANGUAGES = ["en", "ru"]
CITIES_LIGHT_INCLUDE_COUNTRIES = ["KZ", "CA"]

MODELTRANSLATION_DEFAULT_LANGUAGE = "en"
# # MODELTRANSLATION_TRANSLATIONS_FILES = (
# #     "apps.db_models.translation",
# # )


# STATIC_URL = '/static/'
# STATIC_ROOT = os.path.join(BASE_DIR, 'static_root')
# STATICFILES_DIRS = [
#     os.path.join(BASE_DIR, 'static_dist'),
# ]

STATIC_URL = "/staticfiles/"
STATIC_ROOT = os.path.join(BASE_DIR, "staticfiles")
STATICFILES_DIR = []
MEDIA_URL = "/mediafiles/"
MEDIA_ROOT = os.path.join(BASE_DIR, "mediafiles")

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]


AUTHENTICATION_BACKENDS = (
    "django.contrib.auth.backends.ModelBackend",
    "allauth.account.auth_backends.AuthenticationBackend",
)

# store static files locally and serve with whitenoise
# STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'

# ############# REST FRAMEWORK ###################

REST_FRAMEWORK = {
    "DEFAULT_FILTER_BACKENDS": ["django_filters.rest_framework.DjangoFilterBackend"],
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "knox.auth.TokenAuthentication",
        # "rest_framework.authentication.TokenAuthentication",
        # "rest_framework.authentication.SessionAuthentication",
        # "rest_framework.authentication.BasicAuthentication",
    ),
    "DEFAULT_PAGINATION_CLASS": ("rest_framework.pagination.PageNumberPagination"),
    "PAGE_SIZE": 20,
    "DEFAULT_PARSER_CLASSES": (
        "rest_framework.parsers.JSONParser",
        "rest_framework.parsers.FormParser",
        "rest_framework.parsers.MultiPartParser",
    ),
}


# ############ REST KNOX ########################
REST_KNOX = {
    "SECURE_HASH_ALGORITHM": "cryptography.hazmat.primitives.hashes.SHA512",
    "AUTH_TOKEN_CHARACTER_LENGTH": 64,
    "USER_SERIALIZER": "users.serializers.UserSerializer",
    "TOKEN_TTL": timedelta(minutes=45),
    "EXPIRY_DATETIME_FORMAT": api_settings.DATETIME_FORMAT,
}

# ########### Sentry configuration

# Change this to proper sentry url.
RAVEN_CONFIG = {
    "dsn": "",
}

SENTRY_DSN = os.environ.get("SENTRY_DSN")

if SENTRY_DSN:
    RAVEN_CONFIG = {
        "dsn": f"{SENTRY_DSN}",
        "register_signals": True,
    }

LOGGING = {
    "version": 1,
    "disable_existing_loggers": True,
    "root": {
        "level": "WARNING",
        "handlers": ["sentry"],
    },
    "formatters": {
        "verbose": {
            "format": "%(levelname)s %(asctime)s %(module)s "
            "%(process)d %(thread)d %(message)s"
        },
    },
    "handlers": {
        "sentry": {
            "level": "ERROR",
            "class": ("raven.contrib.django.raven_compat.handlers.SentryHandler"),
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "django.db.backends": {
            "level": "ERROR",
            "handlers": ["console"],
            "propagate": False,
        },
        "django": {
            "handlers": ["console"],
            "propagate": True,
            "level": "INFO",
        },
        "django.request": {
            "handlers": ["console"],
            "level": "ERROR",
            "propagate": False,
        },
        "raven": {
            "level": "DEBUG",
            "handlers": ["sentry"],
            "propagate": False,
        },
        "sentry.errors": {
            "level": "DEBUG",
            "handlers": ["sentry"],
            "propagate": False,
        },
        "console_tasks": {
            "handlers": ["console_tasks"],
            "level": "DEBUG",
            "propagate": True,
        },
    },
}

CACHES = {
    "default": {
        "BACKEND": "django_redis.cache.RedisCache",
        "LOCATION": f"redis://{os.environ['REDIS_URI']}",
        "OPTIONS": {
            "CLIENT_CLASS": "django_redis.client.DefaultClient",
            "SOCKET_TIMEOUT": 900,
        },
    }
}

# SESSION_ENGINE = "django.contrib.sessions.backends.cache"
# SESSION_CACHE_ALIAS = "default"
# SESSION_COOKIE_AGE = 1800
# SESSION_SECURITY_EXPIRE_AFTER=1800

# #Cookie name. this can be whatever you want
# SESSION_COOKIE_NAME='sessionid'  # use the sessionid in your views code
# #the module to store sessions data
# SESSION_ENGINE='django.contrib.sessions.backends.db'
# #age of cookie in seconds (default: 2 weeks)
# SESSION_COOKIE_AGE= 24*60*60*7 # the number of seconds for only 7 for example
# #whether a user's session cookie expires when the web browser is closed
# SESSION_EXPIRE_AT_BROWSER_CLOSE=False
# #whether the session cookie should be secure (https:// only)
# SESSION_COOKIE_SECURE=False

DEFAULT_LOGGER = "raven"

LOGGER_EXCEPTION = DEFAULT_LOGGER
LOGGER_ERROR = DEFAULT_LOGGER
LOGGER_WARNING = DEFAULT_LOGGER

LOGIN_REDIRECT_URL = "/"

ACCOUNT_USER_MODEL_USERNAME_FIELD = None
ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = "email"
ACCOUNT_ACTIVATION_DAYS = 7  # days
ACCOUNT_EMAIL_VERIFICATION = "optional"
SOCIALACCOUNT_ADAPTER = 'apps.users.adapter.SocialAdapter'
SOCIALACCOUNT_PROVIDERS = {
    "google": {
        # For each OAuth based provider, either add a ``SocialApp``
        # (``socialaccount`` app) containing the required client
        # credentials, or list them here:
        "APP": {
            "client_id": "491001574499-4ppnfldsim578soko2qp1o96seorjhgo.apps.googleusercontent.com",
            "secret": "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",
            "key": "344458235841-ouh1mdjtcvk4p743ohdm10a7von2vbug.apps.googleusercontent.com",
        },
        "AUTH_PARAMS": {
            "access_type": "offline",
        },
    },
     'facebook':
        {
         'METHOD': 'oauth2',
         'SDK_URL': '//connect.facebook.net/{locale}/sdk.js',
         'SCOPE': ['email', 'public_profile'],
         'AUTH_PARAMS': {'auth_type': 'reauthenticate'},
         'INIT_PARAMS': {'cookie': True},
         'FIELDS': [
             'id',
             'first_name',
             'last_name',
             'name',
             'name_format',
             'picture',
             'short_name'
         ],
         'EXCHANGE_TOKEN': True,
         'LOCALE_FUNC': lambda request: 'ru_RU',
         'VERIFIED_EMAIL': False,
         'VERSION': 'v7.0',
         # you should fill in 'APP' only if you don't create a Facebook instance at /admin/socialaccount/socialapp/
         'APP': {
             'client_id': '1531824097251400',  # !!! THIS App ID
             'secret': '1af933e352c0a2665b0bcc67b542e3be',  # !!! THIS App Secret
             'key': ''
                }
         }
}

EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = env('EMAIL_HOST')
EMAIL_USE_TLS = True
EMAIL_USE_SSL = False
EMAIL_PORT = env('EMAIL_PORT')
EMAIL_HOST_USER = env('EMAIL_USER')
EMAIL_HOST_PASSWORD = env('EMAIL_PASS')