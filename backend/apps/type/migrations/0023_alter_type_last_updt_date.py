# Generated by Django 4.1.3 on 2022-12-20 22:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('type', '0022_alter_type_last_updt_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='type',
            name='LAST_UPDT_DATE',
            field=models.DateField(default='2022-12-20', null=True),
        ),
    ]