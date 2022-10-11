# Generated by Django 4.0.7 on 2022-10-08 09:48

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='type_uom',
            fields=[
                ('PROPERTY_CLASS', models.CharField(max_length=100, primary_key=True, serialize=False)),
                ('UOM', models.CharField(max_length=50)),
                ('LENGTH', models.DecimalField(decimal_places=12, max_digits=28)),
                ('DECIMALS', models.DecimalField(decimal_places=12, max_digits=28)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('ROW_ID', models.CharField(db_index=True, default=uuid.uuid4, max_length=32)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default=django.utils.timezone.now, null=True)),
                ('VERSION', models.CharField(default=uuid.uuid4, max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]