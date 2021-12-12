from django.contrib import admin
from ..models import Battery


# class BatteryTabularInline(admin.StackedInline):
#     model = Battery
#     # fk_name='company_ref'
#     extra = 1
#     show_change_link = True
    
#     # readonly_fields = ('country')
#     # can_delete = False
#     # extra = 0
class BatteryAdminBase(admin.ModelAdmin):
    # inlines = [FieldTabularInline]
    model = Battery

    list_display = ['name', 'short_name', 'company_ref', 'battery_ref', 'field_ref', 'type', 'product']    
    list_display_links = ['name']
    list_filter = ['field_ref', 'type', 'product']

    fieldsets = (
        ('Defaults', {'fields': (('start_datetime', 'end_datetime'), ('name', 'short_name'), ('active', 'operated'), 
            'company_ref', 'battery_ref', 'field_ref')}),
        ('Characteristics', {'fields': ('type', 'product', 'day_start', 'code', ('direct_entry', 'scada'))}),
        ('Location', {'fields': ('latitude','longitude')}),
        ('Reference', {'fields': ('accounting_id','serial_id', 'registry_id')}),
        ('Other', {'classes': ('collapse',),'fields': ('last_updt_user', 'last_updt_date', 'row_id', 'update_source', 'version')}),
    )

    search_fields = ['name', 'short_name']
    ordering = ['name', 'type']
    filter_horizontal = ()
    readonly_fields = ['last_updt_user', 'last_updt_date', 'row_id', 'update_source', 'version']
    list_per_page = 250
    list_max_show_all = 1000

admin.site.register(Battery, BatteryAdminBase)
