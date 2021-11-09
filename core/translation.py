from core.models import *

from modeltranslation.translator import  register, translator, TranslationOptions

# from .models import *

@register(Base_domain)
class BaseDomainTranslationOptions(TranslationOptions):
    fields = ('name', 'short_name')

@register(Base_equip)
class BaseEquipTranslationOptions(TranslationOptions):
    pass

@register(Company)
class CompanyTranslationOptions(TranslationOptions):
        fields = ('contact_name', 'address')


@register(Battery)
class BatteryTranslationOptions(TranslationOptions):
    pass

@register(Field)
class FieldTranslationOptions(TranslationOptions):
    pass
