# Generated by Django 4.1.3 on 2022-12-05 19:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0003_alter_tags_item_id_alter_tags_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tags',
            name='CREATE_SOURCE',
            field=models.CharField(default='x', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='ITEM_ID',
            field=models.CharField(db_index=True, default='cfef76773ac94ad0a8533b3897ee1aa1', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='507e1827053f4ea8b04f372e2d6e4cc8', max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='TAG_ID',
            field=models.CharField(default='c3539d9d8fb14963a8f60e8935d42de3', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='UPDATE_SOURCE',
            field=models.CharField(default='x', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='VERSION',
            field=models.CharField(default='61ee9113cdea4769a688983a5b59e0a2', max_length=32, null=True),
        ),
    ]