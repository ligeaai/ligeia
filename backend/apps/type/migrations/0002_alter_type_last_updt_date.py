# Generated by Django 4.0.8 on 2022-10-31 08:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('type', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='type',
            name='LAST_UPDT_DATE',
            field=models.DateField(default='2022-10-31', null=True),
        ),
    ]
