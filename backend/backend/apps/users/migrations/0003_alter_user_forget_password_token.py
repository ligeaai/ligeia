# Generated by Django 4.0.7 on 2022-09-19 12:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_forget_password_token'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='forget_password_token',
            field=models.CharField(default='False', max_length=100),
        ),
    ]
