from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_domain import Base_domain


class Company(Base_domain):
    company_ref = models.ManyToManyField(
        "self", 
        blank=True, 
        symmetrical=False, 
        verbose_name=_("Parent Company")
    )
    country = models.CharField(
        verbose_name=_("Country"),
        max_length=100,
        blank=True,
        null=True
    )
    region = models.CharField(
        verbose_name=_("Region"),
        max_length=100, 
        blank=True, 
        null=True
    )
    subregion = models.CharField(
        verbose_name=_("Sub-Region"),
        max_length=100,
        blank=True,
        null=True
    )
    city = models.CharField(
        verbose_name=_("City"),
        max_length=100, 
        blank=True, 
        null=True
    )
    contact_name = models.CharField(
        verbose_name=_("Contact Name"),
        max_length=100,
        blank=True,
        null=True
    )
    address = models.CharField(
        verbose_name=_("Address"),
        max_length=100,
        blank=True,
        null=True
    )
    email = models.EmailField(
        verbose_name=_("e-mail"),
        max_length=100, 
        blank=True, 
        null=True
    )
    phone = models.CharField(
        verbose_name=_("Phone"),
        max_length=100, 
        blank=True, 
        null=True    
    )
    operator = models.BooleanField(
        verbose_name=_("Operator"),
        blank=True, 
        default=True
    )
    owner = models.BooleanField(
        verbose_name=_("Owner"),
        blank=True, 
        default=True
    )
    purchaser = models.BooleanField(
        verbose_name=_("Purchaser"),
        blank=True, 
        default=True
    )
    transporter = models.BooleanField(
        verbose_name=_("Transporter"),
        blank=True, 
        default=True
    )
    service = models.BooleanField(
        verbose_name=_("Service Provider"), 
        blank=True, 
        default=False
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
