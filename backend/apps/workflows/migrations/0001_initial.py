# Generated by Django 4.1.8 on 2023-05-10 05:53

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='workflows',
            fields=[
                ('NAME', models.CharField(db_index=True, max_length=50)),
                ('CODE', models.CharField(db_index=True, max_length=100)),
                ('TYPE', models.CharField(max_length=14)),
                ('ITEM_ID', models.CharField(max_length=32)),
                ('TAG_ID', models.CharField(max_length=32)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default='2023-05-10', null=True)),
                ('VERSION', models.CharField(default='6040a132042f429a92dfd7a5eb955358', max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(db_index=True, default=uuid.uuid4, max_length=32, primary_key=True, serialize=False)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]
