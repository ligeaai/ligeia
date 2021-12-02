# Generated by Django 3.2.8 on 2021-11-29 05:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('db_models', '0003_alter_base_domain_create_source'),
    ]

    operations = [
        migrations.AlterField(
            model_name='base_domain',
            name='create_source',
            field=models.CharField(blank=True, db_column='create_source', default='DJANGO', max_length=100, null=True, verbose_name='Create Source'),
        ),
        migrations.AlterField(
            model_name='base_domain',
            name='last_updt_user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Last Update User'),
        ),
        migrations.AlterField(
            model_name='base_domain',
            name='update_source',
            field=models.CharField(blank=True, db_column='update_source', max_length=100, null=True, verbose_name='Update Source'),
        ),
        migrations.AlterField(
            model_name='base_domain',
            name='version',
            field=models.CharField(blank=True, db_column='version', max_length=100, null=True, verbose_name='Version'),
        ),
    ]
