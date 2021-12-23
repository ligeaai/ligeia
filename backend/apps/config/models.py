from django.db import models
from django.utils.translation import gettext_lazy as _

class ModelList(models.Model):
    name = models.CharField(db_column='name', max_length=100, blank=False, unique=True, verbose_name='Name')