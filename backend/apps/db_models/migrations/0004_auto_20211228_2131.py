# Generated by Django 3.2.10 on 2021-12-28 21:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('db_models', '0003_auto_20211228_2127'),
    ]

    operations = [
        migrations.RenameField(
            model_name='company',
            old_name='service',
            new_name='service_provider',
        ),
        migrations.AddField(
            model_name='company',
            name='address_de',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Address'),
        ),
        migrations.AddField(
            model_name='company',
            name='address_en',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Address'),
        ),
        migrations.AddField(
            model_name='company',
            name='address_ru',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Address'),
        ),
        migrations.AddField(
            model_name='company',
            name='city_de',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='City'),
        ),
        migrations.AddField(
            model_name='company',
            name='city_en',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='City'),
        ),
        migrations.AddField(
            model_name='company',
            name='city_ru',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='City'),
        ),
        migrations.AddField(
            model_name='company',
            name='contact_name_de',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Contact Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='contact_name_en',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Contact Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='contact_name_ru',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Contact Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='country_de',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Country'),
        ),
        migrations.AddField(
            model_name='company',
            name='country_en',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Country'),
        ),
        migrations.AddField(
            model_name='company',
            name='country_ru',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Country'),
        ),
        migrations.AddField(
            model_name='company',
            name='name_de',
            field=models.CharField(max_length=100, null=True, unique=True, verbose_name='Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='name_en',
            field=models.CharField(max_length=100, null=True, unique=True, verbose_name='Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='name_ru',
            field=models.CharField(max_length=100, null=True, unique=True, verbose_name='Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='region_de',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Region'),
        ),
        migrations.AddField(
            model_name='company',
            name='region_en',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Region'),
        ),
        migrations.AddField(
            model_name='company',
            name='region_ru',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Region'),
        ),
        migrations.AddField(
            model_name='company',
            name='short_name_de',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='Short Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='short_name_en',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='Short Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='short_name_ru',
            field=models.CharField(blank=True, max_length=100, null=True, unique=True, verbose_name='Short Name'),
        ),
        migrations.AddField(
            model_name='company',
            name='subregion_de',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Sub-Region'),
        ),
        migrations.AddField(
            model_name='company',
            name='subregion_en',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Sub-Region'),
        ),
        migrations.AddField(
            model_name='company',
            name='subregion_ru',
            field=models.CharField(blank=True, max_length=100, null=True, verbose_name='Sub-Region'),
        ),
    ]