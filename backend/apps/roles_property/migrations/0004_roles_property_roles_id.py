# Generated by Django 4.1.8 on 2023-04-10 13:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roles', '0003_remove_roles_property_id'),
        ('roles_property', '0003_remove_roles_property_roles_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='roles_property',
            name='ROLES_ID',
            field=models.ManyToManyField(related_name='roles', to='roles.roles'),
        ),
    ]
