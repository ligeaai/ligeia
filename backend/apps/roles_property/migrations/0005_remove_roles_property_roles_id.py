# Generated by Django 4.1.8 on 2023-04-11 12:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('roles_property', '0004_roles_property_roles_id'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='roles_property',
            name='ROLES_ID',
        ),
    ]
