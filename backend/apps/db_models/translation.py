from modeltranslation.translator import register, TranslationOptions
from .models import Base_domain, Company

@register(Base_domain)
class BaseTranslationOptions(TranslationOptions):
    fields = ('name', 'short_name')

@register(Company)
class CompanyTranslationOptions(TranslationOptions):
    fields = ('country', 'region', 'subregion', 'city', 'contact_name', 'address')
