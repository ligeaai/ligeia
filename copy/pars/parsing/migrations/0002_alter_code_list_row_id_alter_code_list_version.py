# Generated by Django 4.0.5 on 2022-08-04 17:32

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('parsing', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='code_list',
            name='ROW_ID',
            field=models.CharField(default=uuid.uuid4, max_length=255),
        ),
        migrations.AlterField(
            model_name='code_list',
            name='VERSION',
            field=models.CharField(default=uuid.uuid4, max_length=255),
        ),
    ]
