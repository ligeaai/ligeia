# Generated by Django 3.2.9 on 2021-12-06 02:27

import app.db_models.models._base_domain
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import smart_selects.db_fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('cities_light', '0011_auto_20211206_0603'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Base_domain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_datetime', models.DateTimeField(blank=True, db_column='start_datetime', default=django.utils.timezone.now, verbose_name='Datetime')),
                ('end_datetime', models.DateTimeField(db_column='end_datetime', default=app.db_models.models._base_domain.end_datetime, verbose_name='End Datetime')),
                ('name', models.CharField(db_column='name', max_length=100, unique=True, verbose_name='Name')),
                ('short_name', models.CharField(db_column='short_name', max_length=100, unique=True, verbose_name='Short Name')),
                ('active', models.BooleanField(db_column='active', default=True, verbose_name='Active')),
                ('operated', models.BooleanField(db_column='operated', default=True, verbose_name='Operated')),
                ('last_updt_date', models.DateTimeField(auto_now=True, null=True, verbose_name='Last Update Date')),
                ('row_id', models.UUIDField(db_column='row_id', default=uuid.uuid4, editable=False, null=True, verbose_name='Row ID')),
                ('create_source', models.CharField(blank=True, db_column='create_source', default='DJANGO', max_length=100, null=True, verbose_name='Create Source')),
                ('update_source', models.CharField(blank=True, db_column='update_source', max_length=100, null=True, verbose_name='Update Source')),
                ('version', models.CharField(blank=True, db_column='version', max_length=100, null=True, verbose_name='Version')),
                ('accounting_id', models.CharField(blank=True, db_column='accounting_id', max_length=100, null=True, verbose_name='Accounting ID')),
                ('serial_id', models.CharField(blank=True, db_column='serial_id', max_length=100, null=True, verbose_name='Serial ID')),
                ('registry_id', models.CharField(blank=True, db_column='registry_id', max_length=100, null=True, verbose_name='Registry ID')),
                ('last_updt_user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Last Update User')),
            ],
        ),
        migrations.CreateModel(
            name='Base_equip',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='db_models.base_domain')),
                ('latitude', models.CharField(blank=True, db_column='latitude', max_length=100, null=True, verbose_name='Latitude')),
                ('longitude', models.CharField(blank=True, db_column='longitude', max_length=100, null=True, verbose_name='Longitude')),
                ('code', models.CharField(blank=True, db_column='code', max_length=100, null=True, verbose_name='Code')),
                ('direct_entry', models.BooleanField(db_column='direct_entry', default=False, verbose_name='Manual')),
                ('scada', models.BooleanField(db_column='SCADA', default=True, verbose_name='SCADA')),
            ],
            bases=('db_models.base_domain',),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='db_models.base_domain')),
                ('contact_name', models.CharField(blank=True, db_column='contact_name', max_length=100, null=True, verbose_name='Contact Name')),
                ('address', models.CharField(blank=True, db_column='address', max_length=100, null=True, verbose_name='Address')),
                ('email', models.EmailField(blank=True, db_column='email', max_length=100, null=True, verbose_name='e-mail')),
                ('phone', models.CharField(blank=True, db_column='phone', max_length=100, null=True, verbose_name='Phone')),
                ('operator', models.BooleanField(blank=True, db_column='operator', default=True, verbose_name='Operator')),
                ('owner', models.BooleanField(blank=True, db_column='owner', default=True, verbose_name='Owner')),
                ('purchaser', models.BooleanField(blank=True, db_column='purchaser', default=True, verbose_name='Purchaser')),
                ('transporter', models.BooleanField(blank=True, db_column='transporter', default=True, verbose_name='Transporter')),
                ('service', models.BooleanField(blank=True, db_column='service', default=False, verbose_name='Service Provider')),
                ('city', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='region', chained_model_field='region', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.city', verbose_name='City')),
                ('company_ref', models.ManyToManyField(blank=True, to='db_models.Company', verbose_name='Parent Company')),
                ('country', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.country', verbose_name='Country')),
                ('region', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='country', chained_model_field='country', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.region', verbose_name='Region')),
                ('subregion', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='region', chained_model_field='region', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.subregion', verbose_name='Sub-Region')),
            ],
            bases=('db_models.base_domain',),
        ),
        migrations.CreateModel(
            name='Pump',
            fields=[
                ('base_equip_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='db_models.base_equip')),
                ('metric_system', models.CharField(blank=True, choices=[('IMPERIAL', 'Imperial'), ('METRIC', 'Metric')], db_column='metric_system', max_length=100, null=True, verbose_name='Metric System')),
                ('density', models.DecimalField(blank=True, db_column='density', decimal_places=100, max_digits=1000, null=True)),
                ('temperature', models.DecimalField(blank=True, db_column='temperature', decimal_places=100, max_digits=1000, null=True)),
            ],
            bases=('db_models.base_equip',),
        ),
        migrations.CreateModel(
            name='Field',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='db_models.base_domain')),
                ('latitude', models.CharField(blank=True, db_column='latitude', max_length=100, null=True, verbose_name='Latitude')),
                ('longitude', models.CharField(blank=True, db_column='longitude', max_length=100, null=True, verbose_name='Longitude')),
                ('city', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='region', chained_model_field='region', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.city', verbose_name='City')),
                ('company_ref', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_models.company', verbose_name='Company Ref.')),
                ('country', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.country', verbose_name='Country')),
                ('region', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='country', chained_model_field='country', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.region', verbose_name='Region')),
                ('subregion', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='region', chained_model_field='region', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.subregion', verbose_name='Sub-Region')),
            ],
            bases=('db_models.base_domain',),
        ),
        migrations.CreateModel(
            name='Battery',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='db_models.base_domain')),
                ('latitude', models.CharField(blank=True, db_column='latitude', max_length=100, null=True, verbose_name='Latitude')),
                ('longitude', models.CharField(blank=True, db_column='longitude', max_length=100, null=True, verbose_name='Longitude')),
                ('day_start', models.DateTimeField(blank=True, null=True, verbose_name='Prod. Start')),
                ('code', models.CharField(blank=True, db_column='code', max_length=100, null=True, verbose_name='Code')),
                ('direct_entry', models.BooleanField(db_column='direct_entry', default=False, verbose_name='Manual')),
                ('scada', models.BooleanField(db_column='SCADA', default=True, verbose_name='SCADA')),
                ('battery_ref', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_models.battery', verbose_name='Battery Ref.')),
                ('company_ref', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_models.company', verbose_name='Company Ref.')),
                ('field_ref', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_models.field', verbose_name='Field Ref.')),
            ],
            bases=('db_models.base_domain',),
        ),
        migrations.AddField(
            model_name='base_equip',
            name='battery_ref',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='db_models.battery', verbose_name='Battery Ref.'),
        ),
    ]
