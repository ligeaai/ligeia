# Generated by Django 4.0.2 on 2022-02-23 13:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_auto_20220222_1342'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='value',
            name='t',
        ),
    ]
