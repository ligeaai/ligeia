# Generated by Django 4.0.8 on 2022-11-19 07:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('type', '0014_alter_type_last_updt_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='type',
            name='LAST_UPDT_DATE',
            field=models.DateField(default='2022-11-19', null=True),
        ),
    ]
