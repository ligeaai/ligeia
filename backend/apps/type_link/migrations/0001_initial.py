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
            name='type_link',
            fields=[
                ('TYPE', models.CharField(max_length=14, primary_key=True, serialize=False)),
                ('FROM_TYPE', models.CharField(max_length=14)),
                ('FROM_TYPE_CLASS', models.CharField(max_length=50)),
                ('FROM_CARDINALITY', models.CharField(max_length=10, null=True)),
                ('TO_TYPE', models.CharField(max_length=14)),
                ('TO_TYPE_CLASS', models.CharField(max_length=50)),
                ('TO_CARDINALITY', models.CharField(max_length=10, null=True)),
                ('COLL_TYPE', models.CharField(max_length=14, null=True)),
                ('COLL_TYPE_CLASS', models.CharField(max_length=50, null=True)),
                ('SYSTEM', models.CharField(max_length=5, null=True)),
                ('MANDATORY', models.CharField(max_length=5, null=True)),
                ('RELATION_EDIT_CLASS', models.CharField(max_length=100, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('DESCRIPTION_ID', models.CharField(max_length=100, null=True)),
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
