# Generated by Django 3.2.8 on 2021-11-14 04:02

import dbmodels.models._base_domain
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import mptt.fields
import smart_selects.db_fields
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('cities_light', '0011_auto_20211110_1416'),
    ]

    operations = [
        migrations.CreateModel(
            name='Base_domain',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('start_datetime', models.DateTimeField(blank=True, db_column='start_datetime', default=django.utils.timezone.now)),
                ('end_datetime', models.DateTimeField(db_column='end_datetime', default=dbmodels.models._base_domain.end_datetime)),
                ('name', models.CharField(db_column='name', max_length=50, unique=True)),
                ('short_name', models.CharField(blank=True, db_column='short_name', max_length=30, unique=True)),
                ('active', models.BooleanField(db_column='active', default=True)),
                ('operated', models.BooleanField(db_column='operated', default=True)),
                ('last_updt_date', models.DateTimeField(auto_now=True, null=True)),
                ('row_id', models.UUIDField(db_column='row_id', default=uuid.uuid4, editable=False, null=True)),
                ('update_source', models.CharField(blank=True, db_column='update_source', editable=False, max_length=15, null=True)),
                ('version', models.CharField(blank=True, db_column='version', editable=False, max_length=15, null=True)),
                ('last_updt_user', models.ForeignKey(blank=True, editable=False, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Base_equip',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbmodels.base_domain')),
                ('accounting_id', models.CharField(blank=True, db_column='accounting_id', max_length=15, null=True)),
                ('serial_id', models.CharField(blank=True, db_column='serial_id', max_length=15, null=True)),
                ('registry_id', models.CharField(blank=True, db_column='registry_id', max_length=15, null=True)),
            ],
            bases=('dbmodels.base_domain',),
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbmodels.base_domain')),
                ('contact_name', models.CharField(blank=True, db_column='contact_name', max_length=30, null=True)),
                ('address', models.CharField(blank=True, db_column='address', max_length=50, null=True)),
                ('email', models.CharField(blank=True, db_column='email', max_length=50, null=True)),
                ('phone', models.CharField(blank=True, db_column='phone', max_length=30, null=True)),
                ('operator', models.BooleanField(blank=True, db_column='operator', default=True)),
                ('owner', models.BooleanField(blank=True, db_column='owner', default=True)),
                ('purchaser', models.BooleanField(blank=True, db_column='purchaser', default=True)),
                ('transporter', models.BooleanField(blank=True, db_column='transporter', default=True)),
                ('city', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='region', chained_model_field='region', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.city')),
                ('country', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.country')),
                ('parent', models.ManyToManyField(blank=True, null=True, to='dbmodels.Company')),
                ('region', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='country', chained_model_field='country', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.region')),
                ('subregion', smart_selects.db_fields.ChainedForeignKey(auto_choose=True, blank=True, chained_field='region', chained_model_field='region', null=True, on_delete=django.db.models.deletion.CASCADE, to='cities_light.subregion')),
            ],
            bases=('dbmodels.base_domain',),
        ),
        migrations.CreateModel(
            name='Type_pump',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_updt_user', models.CharField(blank=True, db_column='last_updt_user', max_length=15)),
                ('last_updt_date', models.DateTimeField(auto_now=True, null=True, unique=True)),
                ('row_id', models.UUIDField(db_column='row_id', default=uuid.uuid4, editable=False)),
                ('update_source', models.CharField(blank=True, db_column='update_source', max_length=15)),
                ('version', models.CharField(blank=True, db_column='version', max_length=15)),
                ('code_text', models.CharField(db_column='code_text', max_length=15, unique=True)),
                ('code', models.CharField(db_column='code', max_length=15, unique=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='dbmodels.type_pump')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Type_product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_updt_user', models.CharField(blank=True, db_column='last_updt_user', max_length=15)),
                ('last_updt_date', models.DateTimeField(auto_now=True, null=True, unique=True)),
                ('row_id', models.UUIDField(db_column='row_id', default=uuid.uuid4, editable=False)),
                ('update_source', models.CharField(blank=True, db_column='update_source', max_length=15)),
                ('version', models.CharField(blank=True, db_column='version', max_length=15)),
                ('code_text', models.CharField(db_column='code_text', max_length=15, unique=True)),
                ('code', models.CharField(db_column='code', max_length=15, unique=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='dbmodels.type_product')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Type_battery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_updt_user', models.CharField(blank=True, db_column='last_updt_user', max_length=15)),
                ('last_updt_date', models.DateTimeField(auto_now=True, null=True, unique=True)),
                ('row_id', models.UUIDField(db_column='row_id', default=uuid.uuid4, editable=False)),
                ('update_source', models.CharField(blank=True, db_column='update_source', max_length=15)),
                ('version', models.CharField(blank=True, db_column='version', max_length=15)),
                ('code_text', models.CharField(db_column='code_text', max_length=15, unique=True)),
                ('code', models.CharField(db_column='code', max_length=15, unique=True)),
                ('lft', models.PositiveIntegerField(editable=False)),
                ('rght', models.PositiveIntegerField(editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='children', to='dbmodels.type_battery')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Field',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbmodels.base_domain')),
                ('accounting_id', models.CharField(blank=True, db_column='accounting_id', max_length=15, null=True)),
                ('serial_id', models.CharField(blank=True, db_column='serial_id', max_length=15, null=True)),
                ('registry_id', models.CharField(blank=True, db_column='registry_id', max_length=15, null=True)),
                ('company_ref', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.company')),
            ],
            bases=('dbmodels.base_domain',),
        ),
        migrations.CreateModel(
            name='Battery',
            fields=[
                ('base_domain_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbmodels.base_domain')),
                ('latitude', models.CharField(blank=True, db_column='latitude', max_length=15, null=True)),
                ('longitude', models.CharField(blank=True, db_column='longitude', max_length=15, null=True)),
                ('day_start', models.DateTimeField(blank=True, null=True)),
                ('code', models.CharField(blank=True, db_column='code', max_length=15, null=True)),
                ('direct_entry', models.BooleanField(db_column='direct_entry', default=False)),
                ('scada', models.BooleanField(db_column='SCADA', default=True)),
                ('accounting_id', models.CharField(blank=True, db_column='accounting_id', max_length=15, null=True)),
                ('fdc_id', models.CharField(blank=True, db_column='fdc_id', max_length=15, null=True)),
                ('registry_id', models.CharField(blank=True, db_column='registry_id', max_length=15, null=True)),
                ('field_ref', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.field')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.type_product')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.type_battery')),
            ],
            bases=('dbmodels.base_domain',),
        ),
        migrations.CreateModel(
            name='Pump',
            fields=[
                ('base_equip_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbmodels.base_equip')),
                ('measurement', models.CharField(blank=True, db_column='measurement', max_length=15)),
                ('battery_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbmodels.battery')),
                ('product', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.type_battery')),
                ('type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='dbmodels.type_pump')),
            ],
            bases=('dbmodels.base_equip',),
        ),
        migrations.CreateModel(
            name='Compressor',
            fields=[
                ('base_equip_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='dbmodels.base_equip')),
                ('cumulative_m', models.CharField(blank=True, db_column='cumulative_m', max_length=15)),
                ('disc_press_meas', models.BooleanField(blank=True, db_column='disc_press_meas')),
                ('disc_temp_meas', models.BooleanField(blank=True, db_column='disc_temp_meas')),
                ('last_service', models.DateTimeField(blank=True, db_column='last_service')),
                ('rollover', models.DecimalField(blank=True, db_column='rollover', decimal_places=8, max_digits=12)),
                ('rollover_uom', models.CharField(blank=True, db_column='rollover_uom', max_length=15)),
                ('seal_press_meas', models.BooleanField(blank=True, db_column='seal_press_meas')),
                ('stages', models.DecimalField(blank=True, db_column='stages', decimal_places=8, max_digits=12)),
                ('suct_press_meas', models.BooleanField(blank=True, db_column='suct_press_meas')),
                ('suct_temp_meas', models.BooleanField(blank=True, db_column='suct_temp_meas')),
                ('type', models.CharField(blank=True, db_column='type', max_length=15)),
                ('battery_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='dbmodels.battery')),
            ],
            bases=('dbmodels.base_equip',),
        ),
    ]
