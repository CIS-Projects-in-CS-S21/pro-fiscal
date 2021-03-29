# Generated by Django 3.1.7 on 2021-03-29 14:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('planning_tool', '0002_auto_20210309_0952'),
    ]

    operations = [
        migrations.AlterField(
            model_name='holding',
            name='portfolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='holdings', to='planning_tool.portfolio'),
        ),
        migrations.AlterField(
            model_name='holding',
            name='security_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='security_type', to='planning_tool.security_type'),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='account_type',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='account_type', to='planning_tool.account_type'),
        ),
        migrations.AlterField(
            model_name='portfolio',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='portfolio_accounts', to=settings.AUTH_USER_MODEL),
        ),
    ]
