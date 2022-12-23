# Generated by Django 4.1.3 on 2022-12-21 11:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0007_alter_tags_item_id_alter_tags_row_id_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tags',
            name='ITEM_ID',
            field=models.CharField(db_index=True, default='5dc1861b91d7423b8c123bfff8424404', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='ROW_ID',
            field=models.CharField(db_index=True, default='d363bc62166a470bb622175ee507ac30', max_length=32, null=True),
        ),
        migrations.AlterField(
            model_name='tags',
            name='TAG_ID',
            field=models.CharField(default='75ef9ed757074dc0a6438ffd399ed80b', max_length=32),
        ),
        migrations.AlterField(
            model_name='tags',
            name='VERSION',
            field=models.CharField(default='506e2b94f9d34bac9a5829fe937cbba4', max_length=32, null=True),
        ),
    ]