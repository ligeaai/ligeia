
import json

import redis
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email
from django.db import transaction

rds = redis.StrictRedis('ligeiaai-redis-1',port=6379,db=0)
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
    
    def delete():
        keys = rds.keys('*')
        rds.delete(*keys)
        return True
    
    
