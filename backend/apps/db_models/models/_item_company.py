from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_domain import Base_domain


class Company(Base_domain):
    company_ref = models.ManyToManyField(
        "self", blank=True, symmetrical=False, verbose_name="Parent Company"
    )
    country = models.CharField(
        db_column=_("country"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Country",
    )
    region = models.CharField(
        db_column=_("region)", max_length=100, blank=True, null=True, verbose_name="Region"
    )
    subregion = models.CharField(
        db_column=_("subregion"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Sub-Region",
    )
    city = models.CharField(
        db_column=_("city"), max_length=100, blank=True, null=True, verbose_name="City"
    )
    contact_name = models.CharField(
        db_column=_("contact_name"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Contact Name",
    )
    address = models.CharField(
        db_column=_("address"),
        max_length=100,
        blank=True,
        null=True,
        verbose_name="Address",
    )
    email = models.EmailField(
        db_column="email", max_length=100, blank=True, null=True, verbose_name="e-mail"
    )
    phone = models.CharField(
        db_column=_("phone"), max_length=100, blank=True, null=True, verbose_name="Phone"
    )
    operator = models.BooleanField(
        db_column=_("operator"), blank=True, default=True, verbose_name="Operator"
    )
    owner = models.BooleanField(
        db_column=_("owner"), blank=True, default=True, verbose_name="Owner"
    )
    purchaser = models.BooleanField(
        db_column=_("purchaser"), blank=True, default=True, verbose_name="Purchaser"
    )
    transporter = models.BooleanField(
        db_column=_("transporter"), blank=True, default=True, verbose_name="Transporter"
    )
    service = models.BooleanField(
        db_column=_("service"), blank=True, default=False, verbose_name="Service Provider"
    )

    def __unicode__(self):
        return self.name

    def __str__(self):
        if self.name:
            return self.name
        elif self.short_name:
            return self.short_name
        elif self.country:
            return self.country
        elif self.region:
            return self.region
        elif self.subregion:
            return self.subregion
        elif self.city:
            return self.city

    def get_company_ref(self):
        return ",".join([str(p) for p in self.company_ref.all()])

    class Meta:
        ordering = ["name"]
        verbose_name = _("company")
        verbose_name_plural = _("companies")
