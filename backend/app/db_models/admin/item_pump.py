from django.contrib import admin
from ..models import Pump

class PumpAdminBase(admin.ModelAdmin):
    # inlines = [FieldTabularInline]
    model = Pump
    list_display = ['name', 'short_name', 'battery_ref','type', 'product']    
    list_display_links = ['name']
    list_filter = ['battery_ref', 'type', 'product']

    fieldsets = (
        ('Defaults', {'fields': (('start_datetime', 'end_datetime'), ('name', 'short_name'), ('active', 'operated'), 'battery_ref')}),
        ('Characteristics', {'fields': 
            ('type', 'product', 'status', 'code',
            'density', 'density_uom', 
            ('direct_entry', 'scada'))}),
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

admin.site.register(Pump, PumpAdminBase)