# Generated by Django 4.1.3 on 2022-11-26 12:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource_list', '0014_alter_resource_list_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource_list',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='4338a5bc09cb4187808baf95ba72db43', max_length=32),
        ),
        migrations.AlterField(
            model_name='resource_list',
            name='VERSION',
            field=models.CharField(default='206bacc144a041edaef971953076dcd1', max_length=32),
        ),
    ]
