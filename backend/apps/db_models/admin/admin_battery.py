from django.contrib import admin
from modeltranslation.admin import TabbedTranslationAdmin
from django.utils.translation import gettext_lazy as _

from ..translation import BaseTranslationOptions
from ..models import Battery

class BatteryAdminBase(TabbedTranslationAdmin):
    pass
    
admin.site.register(Battery, BatteryAdminBase)
