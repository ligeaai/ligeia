# Generated by Django 4.0.7 on 2022-10-07 14:52

from django.db import migrations, models
import django.utils.timezone
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='resource_list',
            fields=[
                ('CULTURE', models.CharField(max_length=10, primary_key=True, serialize=False)),
                ('ID', models.CharField(max_length=100)),
                ('SHORT_LABEL', models.CharField(max_length=200, null=True)),
                ('MOBILE_LABEL', models.CharField(max_length=200, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('HIDDEN', models.CharField(max_length=5, null=True)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default=django.utils.timezone.now, null=True)),
                ('VERSION', models.CharField(default=uuid.uuid4, max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(db_index=True, default=uuid.uuid4, max_length=32)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]
