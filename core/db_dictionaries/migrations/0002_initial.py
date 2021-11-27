# Generated by Django 3.2.8 on 2021-11-26 11:19

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import mptt.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('db_dictionaries', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='type_status',
            name='last_updt_user',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Last Update User'),
        ),
        migrations.AddField(
            model_name='type_status',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='db_dictionaries.type_status', verbose_name='Parent'),
        ),
        migrations.AddField(
            model_name='type_pump',
            name='last_updt_user',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Last Update User'),
        ),
        migrations.AddField(
            model_name='type_pump',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='db_dictionaries.type_pump', verbose_name='Parent'),
        ),
        migrations.AddField(
            model_name='type_product',
            name='last_updt_user',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Last Update User'),
        ),
        migrations.AddField(
            model_name='type_product',
            name='parent',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='db_dictionaries.type_product', verbose_name='Parent'),
        ),
        migrations.AddField(
            model_name='type_battery',
            name='last_updt_user',
            field=models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Last Update User'),
        ),
        migrations.AddField(
            model_name='type_battery',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_dictionaries.type_battery'),
        ),
    ]
