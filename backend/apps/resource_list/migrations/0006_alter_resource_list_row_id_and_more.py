# Generated by Django 4.1.3 on 2022-11-23 17:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource_list', '0005_alter_resource_list_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource_list',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='742d5c0686e84993b31afbbe3e85b7b3', max_length=32),
        ),
        migrations.AlterField(
            model_name='resource_list',
            name='VERSION',
            field=models.CharField(default='5074e9d828274e3089f2b776b88e1a30', max_length=32),
        ),
    ]
