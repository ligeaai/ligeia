# Generated by Django 4.1.8 on 2023-04-10 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roles_property', '0003_remove_roles_property_roles_id'),
        ('roles', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='roles',
            name='PROPERTY_ID',
            field=models.ManyToManyField(related_name='property', to='roles_property.roles_property'),
        ),
    ]
