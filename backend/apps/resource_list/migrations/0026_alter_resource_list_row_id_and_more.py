# Generated by Django 4.1.4 on 2022-12-25 08:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource_list', '0025_alter_resource_list_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource_list',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='f2c79421ddb04aca83df697f3717a41a', max_length=32),
        ),
        migrations.AlterField(
            model_name='resource_list',
            name='VERSION',
            field=models.CharField(default='e2211bc697414eb8afd2fd0660092e06', max_length=32),
        ),
    ]
