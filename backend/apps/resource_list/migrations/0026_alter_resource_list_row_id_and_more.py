# Generated by Django 4.1.3 on 2022-11-27 00:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource_list', '0025_alter_resource_list_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource_list',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='bd671c35f36e4070b9cb989eb3d6d91f', max_length=32),
        ),
        migrations.AlterField(
            model_name='resource_list',
            name='VERSION',
            field=models.CharField(default='22b3aaf08ca14c93a8dd9b5084a7724e', max_length=32),
        ),
    ]
