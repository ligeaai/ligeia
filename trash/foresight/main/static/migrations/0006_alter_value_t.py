# Generated by Django 4.0.2 on 2022-02-23 16:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_value_t'),
    ]

    operations = [
        migrations.AlterField(
            model_name='value',
            name='t',
            field=models.BigIntegerField(),
        ),
    ]
