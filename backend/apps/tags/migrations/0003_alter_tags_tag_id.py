# Generated by Django 4.1.8 on 2023-04-19 09:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0002_alter_tags_tag_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tags',
            name='TAG_ID',
            field=models.CharField(default='ad19a143942a46b796c99a31ffa9f8f8', max_length=32, primary_key=True, serialize=False),
        ),
    ]