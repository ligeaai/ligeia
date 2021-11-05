from django.db import models
import uuid
from core.models._base_codelist import Base_codelist


class Type_country(Base_codelist):
    code_text = models.CharField(db_column='code_text', max_length=15, blank=False, unique=True)
    code = models.CharField(db_column='code', max_length=15, blank=False, unique=True)    
    parent = models.CharField(db_column='parent', max_length=15, blank=True, null=True, unique=True)

    # def __str__(self):
    #     if self.code:
    #         return str(self.code)
    #     if self.code_text:
    #         return str(self.code_text)
 
class Meta:
    db_table = 'type_country'
    ordering = ["code_text"]
    verbose_name = "country type"
    verbose_name_plural = "country types"