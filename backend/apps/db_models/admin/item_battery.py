from django.contrib import admin
from ..translation import *
from ..models import Battery
from modeltranslation.admin import TabbedTranslationAdmin
from django.utils.translation import gettext_lazy as _


class BatteryAdminBase(TabbedTranslationAdmin):
    pass
    # list_display = [
    #     "name",
    #     "short_name",
    #     "company_ref",
    #     "battery_ref",
    #     "field_ref",
    #     "type",
    #     "product",
    # ]
    # list_display_links = ["name"]
    # list_filter = ["field_ref", "type", "product"]

    # fieldsets = (
    #     (_("Defaults"),
    #         {
    #             "fields": (
    #                 ("start_datetime", "end_datetime"),
    #                 ("name", "short_name"),
    #                 ("active", "operated"),
    #                 "company_ref",
    #                 "battery_ref",
    #                 "field_ref",
    #             )
    #         },
    #     ),
    #     (_("Characteristics"),
    #         {
    #             "fields": (
    #                 "type",
    #                 "product",
    #                 "day_start",
    #                 "code",
    #                 ("direct_entry", "scada"),
    #             )
    #         },
    #     ),
    #     (_("Location"), {"fields": ("latitude", "longitude")}),
    #     (_("Reference"), {"fields": ("accounting_id", "serial_id", "registry_id")}),
    #     (_("Other"),
    #         {
    #             "classes": ("collapse",),
    #             "fields": (
    #                 "last_updt_user",
    #                 "last_updt_date",
    #                 "row_id",
    #                 "update_source",
    #                 "version",
    #             ),
    #         },
    #     ),
    # )

    # search_fields = ["name", "short_name"]
    # # ordering = ["name", "type"]
    # filter_horizontal = ()
    # readonly_fields = [
    #     "last_updt_user",
    #     "last_updt_date",
    #     "row_id",
    #     "update_source",
    #     "version",
    # ]
    # list_per_page = 250
    # list_max_show_all = 1000


admin.site.register(Battery, BatteryAdminBase)
