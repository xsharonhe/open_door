# Generated by Django 3.0 on 2021-01-03 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Rental',
            fields=[
                ('id', models.TextField(primary_key=True, serialize=False)),
                ('night_price', models.IntegerField()),
                ('num_of_baths', models.IntegerField()),
                ('num_of_rooms', models.IntegerField()),
                ('name', models.CharField(max_length=250)),
                ('airbnb_neighborhood', models.CharField(max_length=50)),
                ('capacity_of_people', models.IntegerField()),
                ('property_type', models.CharField(max_length=50)),
                ('reviews_count', models.IntegerField()),
                ('start_rating', models.IntegerField()),
                ('created_at', models.DateTimeField()),
                ('num_of_beds', models.IntegerField()),
                ('lat', models.DecimalField(decimal_places=4, max_digits=10)),
                ('lon', models.DecimalField(decimal_places=4, max_digits=10)),
            ],
            options={
                'ordering': ('-night_price',),
            },
        ),
    ]
