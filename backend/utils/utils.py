
import json
import environ
env = environ.Env(DEBUG=(bool, False))
import redis
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email
from django.db import transaction
import couchdb


rds = redis.StrictRedis(env('REDIS_HOST'),port=6379,db=0)
def validate_email(value):
    """Validate a single email."""
    if not value:
        return False
    # Check the regex, using the validate_email from django.
    try:
        django_validate_email(value)
        return True
    except ValidationError:
        return False


class AtomicMixin:
    """
    Ensure we rollback db transactions on exceptions.

    From https://gist.github.com/adamJLev/7e9499ba7e436535fd94
    """

    @transaction.atomic()
    def dispatch(self, *args, **kwargs):
        """Atomic transaction."""
        return super(AtomicMixin, self).dispatch(*args, **kwargs)

    def handle_exception(self, *args, **kwargs):
        """Handle exception with transaction rollback."""
        response = super(AtomicMixin, self).handle_exception(*args, **kwargs)

        if getattr(response, 'exception'):
            # We've suppressed the exception but still need to
            # rollback any transaction.
            transaction.set_rollback(True)

        return response


class redisCaching():

    def set(cache_key,data):
        data =json.dumps(data)
        rds.set(cache_key,data)
        return True

    def get(cache_key):
        cache_data = rds.get(cache_key)
        if not cache_data:
            return None
        cache_data = cache_data.decode('utf-8')
        cache_data = json.loads(cache_data)
        return cache_data
    
    def delete(cache_key):
        rds.delete(cache_key)
        return True
    
    
def import_data(model="model",model_name = "model_name",is_relationship=False):
    with transaction.atomic():
        try:
            # username = env("COUCHDB_USER")
            # password = env("COUCHDB_PASSWORD")
            username = "COUCHDB_USER"
            password = "COUCHDB_PASSWORD"
            url = env("COUCHDB_URL")
            server = couchdb.Server(url)
            server.resource.credentials = (username, password)
            db = server["demo"]
            data = db.get(model_name).get('values')
            chunked_data = [data[i:i+1000] for i in range(0, len(data), 1000)]
            if is_relationship:
                for chunk in chunked_data:
                    model.objects.bulk_create(chunk)
            else:
                for chunk in chunked_data:
                    model.objects.bulk_create([model(**item) for item in chunk])
            return True
        except Exception as e:
            print(str(e))
            transaction.set_rollback(True)
            return{"error": str(e)}