from django.contrib import admin
from operator import or_
from mptt.admin import DraggableMPTTAdmin
from db_models.models._item_company import Company


# class CompanyTabularInline(admin.StackedInline):
#     model = Company
#     fk_name='parent'
#     extra = 1
#     show_change_link = True
    
#     # readonly_fields = ('country')
#     # can_delete = False
#     # extra = 0
class CompanyAdminBase(admin.ModelAdmin):
    # inlines = [CompanyTabularInline]
    model = Company

    list_display = ['get_parents','name', 'short_name', 'contact_name', 'email', 'country', 'region', 'city']    
    list_display_links = ['name', 'short_name']
    list_filter = ['name','country', 'region']

    fieldsets = (
        ('Defaults', {'fields': (('start_datetime', 'end_datetime'), ('name', 'short_name'), ('active', 'operated'), 'parent')}),
        ('Location', {'fields': ('country', 'region', 'subregion', 'city')}),
        ('Contact', {'fields': ('contact_name','address', 'email')}),
        ('Type', {'fields': ('operator', 'owner', 'purchaser', 'transporter','service')}),
        ('Reference', {'fields': ('accounting_id','serial_id', 'registry_id')}),
        ('Other', {'classes': ('collapse',),'fields': ('last_updt_user', 'last_updt_date', 'row_id', 'update_source', 'version')}),
    )

    search_fields = ['name', 'short_name', 'email']
    #  , 'email', 'contact_name', 'country', 'region', 'city']
    ordering = ['name', 'short_name', 'contact_name', 'country', 'region', 'city']
    filter_horizontal = ()
    readonly_fields = ['last_updt_user', 'last_updt_date', 'row_id', 'update_source', 'version']
    list_per_page = 250
    list_max_show_all = 1000

admin.site.register(Company, CompanyAdminBase)