# Generated by Django 4.0.2 on 2022-02-23 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_remove_value_t'),
    ]

    operations = [
        migrations.AddField(
            model_name='value',
            name='t',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]