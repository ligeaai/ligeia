# Generated by Django 4.1.8 on 2023-04-10 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('roles_type', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='roles_type',
            old_name='ROLES_TYPE',
            new_name='ROLES_TYPES',
        ),
        migrations.AddField(
            model_name='roles_type',
            name='CREATE',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='roles_type',
            name='DELETE',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='roles_type',
            name='READ',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='roles_type',
            name='UPDATE',
            field=models.BooleanField(default=False),
        ),
    ]
