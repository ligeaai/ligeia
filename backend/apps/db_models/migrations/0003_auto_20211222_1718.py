# Generated by Django 3.2.10 on 2021-12-22 17:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0002_alter_battery_options'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='base_domain',
            options={'ordering': ['name'], 'verbose_name': 'base_domain', 'verbose_name_plural': 'base_domains'},
        ),
        migrations.AlterModelOptions(
            name='base_equip',
            options={'ordering': ['name'], 'verbose_name': 'base_equip', 'verbose_name_plural': 'base_equips'},
        ),
        migrations.AlterModelOptions(
            name='company',
            options={'ordering': ['name'], 'verbose_name': 'company', 'verbose_name_plural': 'companies'},
        ),
        migrations.AlterModelOptions(
            name='field',
            options={'ordering': ['name'], 'verbose_name': 'field', 'verbose_name_plural': 'fields'},
        ),
        migrations.AlterModelOptions(
            name='pump',
            options={'ordering': ['name'], 'verbose_name': 'pump', 'verbose_name_plural': 'pumps'},
        ),
    ]
