# Generated by Django 4.1.8 on 2023-04-18 20:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('uoms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='uom',
            name='LAST_UPDT_DATE',
            field=models.DateField(default='2023-04-18', null=True),
        ),
        migrations.AlterField(
            model_name='uom',
            name='VERSION',
            field=models.CharField(default='46830d1002bf41c2ad89012e2a91e9f9', max_length=32),
        ),
    ]