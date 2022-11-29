# Generated by Django 4.1.3 on 2022-11-26 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0004_alter_tags_item_id_alter_tags_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tags',
            name='ITEM_ID',
            field=models.CharField(db_index=True, default='57a4da28e18d4a68918a4b036c855578', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='0959096cdeb14ad58bbe3d3202f23836', max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='TAG_ID',
            field=models.CharField(default='0f39a40399504245a9d0c2ccdce47b38', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='VERSION',
            field=models.CharField(default='b4d9410dfa134cd8861e088eebf5b1e3', max_length=32, null=True),
        ),
    ]
