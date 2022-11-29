# Generated by Django 4.1.3 on 2022-11-28 23:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0021_alter_tags_item_id_alter_tags_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tags',
            name='ITEM_ID',
            field=models.CharField(db_index=True, default='bd0ab709e078480abd1c39f8a89438cf', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='f49cdde471a046a5bc2d6946ce88c20f', max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='TAG_ID',
            field=models.CharField(default='edc561cef7f14fd19e663f1dca8e7573', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='VERSION',
            field=models.CharField(default='2140421caa3445f295b4723bd0bf3b08', max_length=32, null=True),
        ),
    ]
