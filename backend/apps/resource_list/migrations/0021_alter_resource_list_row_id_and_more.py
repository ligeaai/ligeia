# Generated by Django 4.1.3 on 2022-12-05 20:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource_list', '0020_alter_resource_list_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource_list',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='4c989613bf724ea2819b6f6601308844', max_length=32),
        ),
        migrations.AlterField(
            model_name='resource_list',
            name='VERSION',
            field=models.CharField(default='ab6db07bc95f4170bc3f6477c07f4a2e', max_length=32),
        ),
    ]
