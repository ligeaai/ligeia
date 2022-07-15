# Generated by Django 4.0.5 on 2022-07-15 06:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='code_list',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('LIST_TYPE', models.CharField(max_length=100)),
                ('CULTURE', models.CharField(default='Culture', max_length=10)),
                ('CODE', models.CharField(max_length=100)),
                ('CODE_TEXT', models.CharField(max_length=100, null=True)),
                ('PARENT', models.CharField(max_length=100, null=True)),
                ('LEGACY_CODE', models.CharField(max_length=50, null=True)),
                ('VAL1', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL2', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL3', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL4', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL5', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL6', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL7', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL8', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL9', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('VAL10', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('DATE1', models.DateField(null=True)),
                ('DATE2', models.DateField(null=True)),
                ('DATE3', models.DateField(null=True)),
                ('DATE4', models.DateField(null=True)),
                ('DATE5', models.DateField(null=True)),
                ('CHAR1', models.CharField(max_length=1000, null=True)),
                ('CHAR2', models.CharField(max_length=1000, null=True)),
                ('CHAR3', models.CharField(max_length=1000, null=True)),
                ('CHAR4', models.CharField(max_length=1000, null=True)),
                ('CHAR5', models.CharField(max_length=1000, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50)),
                ('DESCRIPTION_ID', models.CharField(max_length=100, null=True)),
                ('HIDDEN', models.CharField(max_length=5, null=True)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default='Now', null=True)),
                ('VERSION', models.CharField(default='Guid', max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(default='Guid', max_length=32)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='item_property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ITEM_ID', models.CharField(max_length=32)),
                ('ITEM_TYPE', models.CharField(max_length=14)),
                ('START_DATETIME', models.DateField()),
                ('END_DATETIME', models.DateField(default='EndDatetime')),
                ('PROPERTY_TYPE', models.CharField(max_length=15)),
                ('PROPERTY_VALUE', models.DecimalField(decimal_places=12, max_digits=28, null=True)),
                ('PROPERTY_DATE', models.DateField(null=True)),
                ('PROPERTY_STRING', models.CharField(max_length=200, null=True)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(default='Now', null=True)),
                ('VERSION', models.CharField(default='Guid', max_length=32)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(default='Guid', max_length=32)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
                ('UPDATE_SOURCE', models.CharField(default='SourceType', max_length=1, null=True)),
                ('CREATE_SOURCE', models.CharField(default='SourceType', max_length=1, null=True)),
            ],
        ),
    ]
