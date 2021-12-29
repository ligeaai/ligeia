from django.contrib import admin
from ..translation import *
from ..models import Pump
from modeltranslation.admin import TabbedTranslationAdmin
from django.utils.translation import gettext_lazy as _


class PumpAdminBase(TabbedTranslationAdmin):
    pass


admin.site.register(Pump, PumpAdminBase)
