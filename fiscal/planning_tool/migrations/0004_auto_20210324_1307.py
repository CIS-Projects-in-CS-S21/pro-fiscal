# Generated by Django 3.1.7 on 2021-03-24 17:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('planning_tool', '0003_auto_20210317_1448'),
    ]

    operations = [
        migrations.AlterField(
            model_name='balance_history',
            name='date',
            field=models.DateField(auto_now_add=True),
        ),
    ]
