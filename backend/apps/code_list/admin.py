from django.contrib import admin

# Register your models here.

from .models import code_list

admin.site.register(code_list)
admin.site.site_header = "code_list"
