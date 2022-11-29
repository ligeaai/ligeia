# Generated by Django 4.1.3 on 2022-11-28 23:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0016_alter_tags_item_id_alter_tags_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tags',
            name='ITEM_ID',
            field=models.CharField(db_index=True, default='3e29c5a8cbe44c81a970a631f18161dc', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='bb44aceb0e8e4eceb866375d496d3f2b', max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='TAG_ID',
            field=models.CharField(default='27d2a91bdadd4a03bd6c64c843427c76', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='VERSION',
            field=models.CharField(default='1bbb37f976274a5c893d01f017a09c47', max_length=32, null=True),
        ),
    ]
