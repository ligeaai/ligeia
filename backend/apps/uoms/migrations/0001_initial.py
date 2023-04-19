# Generated by Django 4.1.8 on 2023-04-12 21:50

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='uom',
            fields=[
                ('CULTURE', models.CharField(max_length=10, null=True)),
                ('NAME', models.CharField(db_index=True, max_length=50)),
                ('QUANTITY_TYPE', models.CharField(max_length=1000)),
                ('CATALOG_NAME', models.CharField(max_length=1000)),
                ('CATALOG_SYMBOL', models.CharField(max_length=1000)),
                ('RP66_SYMBOL', models.CharField(max_length=1000, null=True)),
                ('BASE_UNIT', models.CharField(max_length=1000, null=True)),
                ('A', models.CharField(max_length=100, null=True)),
                ('B', models.CharField(max_length=100, null=True)),
                ('C', models.CharField(max_length=100, null=True)),
                ('D', models.CharField(max_length=100, null=True)),
                ('RESULT', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default='2023-04-12', null=True)),
                ('VERSION', models.CharField(default='f767f3fe598148d59422a73e5aedd3de', max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(db_index=True, default=uuid.uuid4, max_length=32, primary_key=True, serialize=False)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]
