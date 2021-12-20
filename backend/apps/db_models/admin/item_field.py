from django.contrib import admin
from ..models import Field


class FieldAdminBase(admin.ModelAdmin):
    model = Field
    list_display = [
        "name",
        "short_name",
        "company_ref",
        "country",
        "region",
        "subregion",
    ]
    list_display_links = ["name"]
    list_filter = ["company_ref", "country"]

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
        (
            "Location",
            {
                "fields": (
                    "product",
                    "latitude",
                    "longitude",
                    "country",
                    "region",
                    "subregion",
                    "city",
                )
            },
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

    search_fields = ["name", "short_name"]
    ordering = ["name", "short_name", "country", "region", "city"]
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


admin.site.register(Field, FieldAdminBase)
