# Generated by Django 4.0.8 on 2022-10-17 08:41

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='item',
            fields=[
                ('ITEM_ID', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('ITEM_TYPE', models.CharField(db_index=True, max_length=14)),
                ('START_DATETIME', models.DateField(db_index=True)),
                ('END_DATETIME', models.DateField(db_index=True, default=django.utils.timezone.now)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default=django.utils.timezone.now, null=True)),
                ('VERSION', models.CharField(default=uuid.uuid4, max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(db_index=True, default=uuid.uuid4, max_length=32)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
                ('UPDATE_SOURCE', models.CharField(default='SourceType', max_length=1, null=True)),
                ('CREATE_SOURCE', models.CharField(default='SourceType', max_length=1, null=True)),
            ],
        ),
    ]
