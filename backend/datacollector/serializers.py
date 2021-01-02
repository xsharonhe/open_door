from rest_framework import serializers
from .models import Rental

class RentalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rental
        fields = [
            'id',
            'night_price',
            'num_of_baths',
            'num_of_rooms',
            'name',
            'airbnb_neighborhood',
            'capacity_of_people',
            'property_type',
            'reviews_count',
            'start_rating',
            'created_at',
            'num_of_beds',
            'lat',
            'lon'
        ]