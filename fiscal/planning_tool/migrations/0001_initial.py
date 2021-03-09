# Generated by Django 3.1.7 on 2021-03-09 14:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Account_Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Security_Type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Portfolio',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('description', models.TextField(blank=True, null=True)),
                ('balance', models.DecimalField(decimal_places=2, max_digits=15)),
                ('account_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='planning_tool.account_type')),
                ('user_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Holding',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ticker', models.CharField(blank=True, max_length=5, null=True)),
                ('price', models.DecimalField(decimal_places=2, max_digits=15)),
                ('shares', models.DecimalField(decimal_places=2, max_digits=15)),
                ('purchase_date', models.DateField(blank=True, null=True)),
                ('cost_basis', models.DecimalField(blank=True, decimal_places=2, max_digits=15, null=True)),
                ('portfolio_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='planning_tool.portfolio')),
                ('security_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='planning_tool.security_type')),
            ],
        ),
    ]
