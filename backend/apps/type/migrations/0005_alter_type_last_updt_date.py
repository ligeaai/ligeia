# Generated by Django 4.0.8 on 2022-11-04 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('type', '0004_alter_type_last_updt_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='type',
            name='LAST_UPDT_DATE',
            field=models.DateField(default='2022-11-04', null=True),
        ),
    ]
