# Generated by Django 4.1.8 on 2023-04-12 11:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('layer', '0001_initial'),
        ('roles', '0004_roles_property_id'),
        ('users', '0002_remove_user_layer_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='layer_name',
            field=models.ManyToManyField(blank=True, null=True, related_name='layerName', to='layer.layer'),
        ),
        migrations.AddField(
            model_name='user',
            name='role',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='roles.roles'),
        ),
    ]