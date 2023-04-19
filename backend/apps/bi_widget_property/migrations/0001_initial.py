# Generated by Django 4.1.8 on 2023-04-19 10:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('bi_widgets', '0001_initial'),
        ('tags', '0005_alter_tags_tag_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='bi_widget_property',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('WIDGET_TYPE', models.CharField(db_index=True, max_length=14, null=True)),
                ('PROPERTY_NAME', models.CharField(db_index=True, max_length=1000, null=True)),
                ('LAYER_NAME', models.CharField(max_length=50, null=True)),
                ('START_DATETIME', models.DateField(db_index=True, null=True)),
                ('END_DATETIME', models.DateField(db_index=True, null=True)),
                ('PROPERTY_TYPE', models.CharField(db_index=True, max_length=150, null=True)),
                ('PROPERTY_INFO', models.CharField(db_index=True, max_length=15, null=True)),
                ('PROPERTY_VALUE', models.DecimalField(db_index=True, decimal_places=12, max_digits=28, null=True)),
                ('PROPERTY_STRING', models.CharField(blank=True, db_index=True, max_length=200, null=True)),
                ('PROPERTY_JSON', models.JSONField(null=True)),
                ('PROPERTY_BINARY', models.CharField(db_index=True, max_length=32, null=True)),
                ('PROPERTY_BOOLEAN', models.BooleanField(db_index=True, max_length=32, null=True)),
                ('LAST_UPDT_USER', models.CharField(max_length=100, null=True)),
                ('LAST_UPDT_DATE', models.DateField(null=True)),
                ('VERSION', models.CharField(max_length=32, null=True)),
                ('DB_ID', models.CharField(max_length=32, null=True)),
                ('ROW_ID', models.CharField(db_index=True, max_length=32, null=True)),
                ('STATUS', models.CharField(max_length=10, null=True)),
                ('REV_GRP_ID', models.CharField(max_length=32, null=True)),
                ('UPDATE_SOURCE', models.CharField(default='x', max_length=1, null=True)),
                ('CREATE_SOURCE', models.CharField(default='x', max_length=1, null=True)),
                ('PROPERTY_TAG', models.ManyToManyField(blank=True, null=True, related_name='tags', to='tags.tags')),
                ('WIDGET_ID', models.ManyToManyField(related_name='property', to='bi_widgets.bi_widget')),
            ],
        ),
    ]
