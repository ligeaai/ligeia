# Generated by Django 4.1.5 on 2023-01-10 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='uom_base_unit',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('NAME', models.CharField(db_index=True, max_length=50)),
                ('QUALITY_TYPE', models.CharField(max_length=1000)),
                ('CATALOG_NAME', models.CharField(max_length=1000)),
                ('CATALOG_SYMBOL', models.CharField(max_length=1000)),
                ('RP66_SYMBOL', models.CharField(max_length=1000, null=True)),
                ('BASE_UNIT', models.CharField(max_length=1000, null=True)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default='2023-01-10', null=True)),
                ('VERSION', models.CharField(default='63b0b9069f4743308cafb45339438931', max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(db_index=True, default='4db4177055b1436f8188bbeb257c6869', max_length=32)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
    ]