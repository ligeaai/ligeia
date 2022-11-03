# Generated by Django 4.0.8 on 2022-11-03 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('item_property', '0003_remove_item_property_property_binary'),
    ]

    operations = [
        migrations.AddField(
            model_name='item_property',
            name='PROPERTY_BINARY',
            field=models.BinaryField(db_index=True, null=True),
        ),
        migrations.AddField(
            model_name='item_property',
            name='PROPERTY_CODE',
            field=models.CharField(db_index=True, max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='item_property',
            name='CREATE_SOURCE',
            field=models.CharField(default='x', max_length=1, null=True),
        ),
        migrations.AlterField(
            model_name='item_property',
            name='UPDATE_SOURCE',
            field=models.CharField(default='x', max_length=1, null=True),
        ),
    ]
