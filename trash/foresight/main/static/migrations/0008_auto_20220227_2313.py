# Generated by Django 2.2.12 on 2022-02-27 23:13

import django.contrib.postgres.fields.jsonb
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_prediction_pump_prediction_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='prediction',
            name='prediction',
            field=django.contrib.postgres.fields.jsonb.JSONField(max_length=100000, null=True),
        ),
        migrations.AlterField(
            model_name='prediction',
            name='status',
            field=django.contrib.postgres.fields.jsonb.JSONField(max_length=10000, null=True),
        ),
    ]
