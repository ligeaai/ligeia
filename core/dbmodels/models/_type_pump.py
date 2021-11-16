from django.db import models
import uuid
from django.conf import settings
from mptt.models import MPTTModel, TreeForeignKey


class Type_pump(MPTTModel):
    code_text = models.CharField(
        db_column='code_text', max_length=100, blank=False, unique=True, verbose_name='Code Name')
    code = models.CharField(db_column='code', max_length=100,
                            blank=False, unique=True, verbose_name='Code')
    parent = TreeForeignKey('self', blank=True, null=True, related_name='children',
                            on_delete=models.CASCADE, verbose_name='Parent')

    last_updt_user = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, blank=True, editable=False, null=True, verbose_name='Last Update User')
    last_updt_date = models.DateTimeField(
        auto_now=True, blank=True, editable=False, null=True, verbose_name='Last Update Date')
    row_id = models.UUIDField(db_column='row_id', primary_key=False,
                              default=uuid.uuid4, editable=False, null=True, verbose_name='Row ID')
    create_source = models.CharField(db_column='create_source', max_length=100,
                                     blank=True, editable=False, null=True, verbose_name='Create Source')
    update_source = models.CharField(db_column='update_source', max_length=100,
                                     blank=True, editable=False, null=True, verbose_name='Update Source')
    version = models.CharField(
        db_column='version', max_length=100, blank=True, editable=False, null=True, verbose_name='Version')

    def __str__(self):
        if self.code_text:
            return str(self.code_text)
        if self.code:
            return str(self.code)
    
    def __str__(self):                                                                  
        full_path = [self.code_text]
        k = self.parent
        while k is not None:
            full_path.append(k.code_text)
            k = k.parent
        return ' / '.join(full_path[::-1])

class MPTTMeta:
    db_table = 'type_pump'
    order_insertion_by = ["code_text"]
    verbose_name = "pump type"
    verbose_name_plural = "pump types"