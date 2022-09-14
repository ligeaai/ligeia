from django.db.models.signals import post_save,pre_delete
from django.core.signals import request_finished
from apps.code_list.models import code_list
from django.dispatch import receiver
from django.core.cache import cache
from django.conf import settings
from django.core.cache.backends.base import DEFAULT_TIMEOUT

CACHE_TTL = getattr(settings, 'CACHE_TTL', DEFAULT_TIMEOUT)

@receiver([post_save,pre_delete], sender=code_list)
def clean_cache(sender,instance,**kwargs):
    if instance.LISTTYPE in cache:
        print("cache deleted")
        cache.delete(instance.LISTTYPE)
