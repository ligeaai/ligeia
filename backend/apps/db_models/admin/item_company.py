from django.contrib import admin
from operator import or_
from ..models import Company
from parler.admin import TranslatableAdmin


class CompanyAdminBase(admin.ModelAdmin):
    model = Company
    list_display = [
        "name",
        "short_name",
        "contact_name",
        "email",
        "country",
        "region",
        "city",
    ]
    list_display_links = ["name", "short_name"]
    list_filter = ["country", "region"]

    fieldsets = (
        (
            "Defaults",
            {
                "fields": (
                    ("start_datetime", "end_datetime"),
                    ("name", "short_name"),
                    ("active", "operated"),
                    "company_ref",
                )
            },
        ),
        ("Location", {"fields": ("country", "region", "subregion", "city")}),
        ("Contact", {"fields": ("contact_name", "address", "email")}),
        (
            "Type",
            {"fields": ("operator", "owner", "purchaser", "transporter", "service")},
        ),
        ("Reference", {"fields": ("accounting_id", "serial_id", "registry_id")}),
        (
            "Other",
            {
                "classes": ("collapse",),
                "fields": (
                    "last_updt_user",
                    "last_updt_date",
                    "row_id",
                    "update_source",
                    "version",
                ),
            },
        ),
    )

    search_fields = ["name", "short_name", "email"]
    #  , 'email', 'contact_name', 'country', 'region', 'city']
    # ordering = ["name", "short_name", "contact_name", "country", "region", "city"]
    filter_horizontal = ()
    readonly_fields = [
        "last_updt_user",
        "last_updt_date",
        "row_id",
        "update_source",
        "version",
    ]
    list_per_page = 250
    list_max_show_all = 1000


admin.site.register(Company, TranslatableAdmin)
