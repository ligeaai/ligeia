from modeltranslation.translator import register, TranslationOptions
from .models import (
    Base_domain, 
    Base_equip,
    Base_geo,
    Battery,
    Company,
    Field,
)

@register(Base_domain)
class BaseTranslationOptions(TranslationOptions):
    fields = ('name', 'short_name',)

@register(Base_equip)
class BaseEquipTranslationOptions(TranslationOptions):
    fields = ('product',)

@register(Base_geo)
class BaseEquipTranslationOptions(TranslationOptions):
    fields = ('country', 'region', 'subregion', 'city',)

@register(Battery)
class BatteryTranslationOptions(TranslationOptions):
    fields = ('battery_type',)

@register(Company)
class CompanyTranslationOptions(TranslationOptions):
    fields = ('contact_name', 'address',)

@register(Field)
class FieldTranslationOptions(TranslationOptions):
    pass
