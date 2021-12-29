from django.contrib import admin
from ..translation import *
from ..models import Field
from modeltranslation.admin import TabbedTranslationAdmin
from django.utils.translation import gettext_lazy as _


class FieldAdminBase(TabbedTranslationAdmin):
    pass


admin.site.register(Field, FieldAdminBase)
