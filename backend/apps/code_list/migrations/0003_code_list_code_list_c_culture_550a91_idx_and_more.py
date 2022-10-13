# Generated by Django 4.0.8 on 2022-10-13 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('code_list', '0002_code_list_code_list_c_list_ty_53bbd6_idx'),
    ]

    operations = [
        migrations.AddIndex(
            model_name='code_list',
            index=models.Index(fields=['CULTURE'], name='code_list_c_CULTURE_550a91_idx'),
        ),
        migrations.AddIndex(
            model_name='code_list',
            index=models.Index(fields=['CODE'], name='code_list_c_CODE_b88078_idx'),
        ),
        migrations.AddIndex(
            model_name='code_list',
            index=models.Index(fields=['CODE_TEXT'], name='code_list_c_CODE_TE_b9d937_idx'),
        ),
        migrations.AddIndex(
            model_name='code_list',
            index=models.Index(fields=['PARENT'], name='code_list_c_PARENT_32e1c7_idx'),
        ),
    ]
