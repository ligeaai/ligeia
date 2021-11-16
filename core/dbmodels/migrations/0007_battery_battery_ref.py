# Generated by Django 3.2.8 on 2021-11-16 14:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('dbmodels', '0006_alter_base_uom_metric_system'),
    ]

    operations = [
        migrations.AddField(
            model_name='battery',
            name='battery_ref',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.battery', verbose_name='Battery Ref.'),
        ),
    ]
