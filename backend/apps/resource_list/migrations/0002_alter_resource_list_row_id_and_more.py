# Generated by Django 4.1.3 on 2022-11-24 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resource_list', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='resource_list',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='127b336beb5a4faa89d180c4942d8f74', max_length=32),
        ),
        migrations.AlterField(
            model_name='resource_list',
            name='VERSION',
            field=models.CharField(default='ac0b285843214ee482225dfa5d24893b', max_length=32),
        ),
    ]
