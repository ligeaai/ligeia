# Generated by Django 4.1.8 on 2023-04-10 09:46

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='roles',
            fields=[
                ('ROLES_ID', models.CharField(max_length=32, primary_key=True, serialize=False)),
                ('ROLES_NAME', models.CharField(default='NAME', max_length=100)),
                ('LAYER_NAME', models.CharField(default='LAYER', max_length=100)),
                ('LAST_UPDATE_USER', models.CharField(max_length=100)),
            ],
        ),
    ]
