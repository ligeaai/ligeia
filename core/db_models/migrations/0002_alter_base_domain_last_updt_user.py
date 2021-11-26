# Generated by Django 3.2.8 on 2021-11-26 10:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('db_models', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='base_domain',
            name='last_updt_user',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, to_field='id', verbose_name='Last Update User'),
        ),
    ]
