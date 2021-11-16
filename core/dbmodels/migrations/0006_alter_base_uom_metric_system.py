# Generated by Django 3.2.8 on 2021-11-16 14:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dbmodels', '0005_alter_base_uom_code_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='base_uom',
            name='metric_system',
            field=models.CharField(blank=True, choices=[('IMPERIAL', 'Imperial'), ('METRIC', 'Metric')], db_column='metric_system', max_length=100, null=True, verbose_name='Metric System'),
        ),
    ]
