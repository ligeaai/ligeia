# Generated by Django 4.0.7 on 2022-10-05 10:49

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='layer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('LAYER_NAME', models.CharField(max_length=100)),
                ('LAYER_LEVEL', models.CharField(max_length=100)),
                ('LAYER_ORDER', models.DecimalField(decimal_places=0, max_digits=18)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default=django.utils.timezone.now, null=True)),
                ('VERSION', models.CharField(default=uuid.uuid4, max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(default=uuid.uuid4, max_length=32)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]
