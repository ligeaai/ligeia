from django.db import models
from django.utils.translation import gettext_lazy as _
from ._base_equip import Base_equip
from ._base_geo import Base_geo


class Field(Base_equip, Base_geo):
    company_ref = models.ForeignKey(
        "company",
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name=_("Company Ref."),
    )
   
    def __str__(self):
        if self.name:
            return f"{self.name}, {self.short_name}"

    # def get_parents(self):
    #     return ",".join([str(p) for p in self.parent.all()])

    class Meta:
        ordering = ["name"]
        verbose_name = _("field")
        verbose_name_plural = _("fields")
