# Generated by Django 4.1.5 on 2023-01-10 00:25

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('item_link', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='item_link',
            name='LAYER_NAME',
            field=models.CharField(default=django.utils.timezone.now, max_length=50),
            preserve_default=False,
        ),
    ]