from django.contrib import admin
from mptt.admin import DraggableMPTTAdmin
from dbmodels.models._type_product import Type_product


class TypepProductInline(admin.StackedInline):
    model = Type_product
    extra = 0
    max_num = 1
    show_change_link = True


class TypeProductAdmin(DraggableMPTTAdmin):
    mptt_indent_field = "parent"
    list_display = ('indented_title','code_text','code','parent')
    list_display_links = ('indented_title',)    
    list_filter = ['parent']
    inlines = [TypepProductInline]
    
    search_fields = ['code_text', 'code']
    # ordering = ['code_text', 'code']
    filter_horizontal = ()
    readonly_fields = ['last_updt_user', 'last_updt_date', 'row_id', 'update_source', 'version']
    list_per_page = 250
    list_max_show_all = 1000

admin.site.register(Type_product, TypeProductAdmin)
