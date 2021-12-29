from django.contrib import admin
from operator import or_
from ..models import Company
from ..translation import *
from modeltranslation.admin import TabbedTranslationAdmin
from django.utils.translation import gettext_lazy as _

class CompanyAdminBase(TabbedTranslationAdmin):
    pass
    # list_display = [
    #     "name",
    #     "short_name",
    #     "contact_name",
    #     "email",
    #     "country",
    #     "region",
    #     "city",
    # ]
    # list_display_links = ["name", "short_name"]
    # list_filter = ["country", "region"]

    # fieldsets = (
    #     (_("Defaults"),
    #         {
    #             "fields": (
    #                 ("start_datetime", "end_datetime"),
    #                 ("name", "short_name"),
    #                 ("active", "operated"),
    #                 "company_ref",
    #             )
    #         },
    #     ),
    #     (_("Location"), {"fields": ("country", "region", "subregion", "city")}),
    #     (_("Contact"), {"fields": ("contact_name", "address", "email")}),
    #     (_("Type"), {"fields": ("operator", "owner", "purchaser", "transporter", "service")}),
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

    # search_fields = ["name", "short_name", "email"]
    # #  , 'email', 'contact_name', 'country', 'region', 'city']
    # ordering = ["name", "short_name", "contact_name", "country", "region", "city"]
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

admin.site.register(Company, CompanyAdminBase)
