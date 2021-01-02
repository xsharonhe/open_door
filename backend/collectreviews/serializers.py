from rest_framework import serializers
from .models import Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = [
            'id',
            'name',
            'review_count',
            'rating',
            'status',
            'price',
            'display_phone',
            'address',
            'summary',
            'score',
            'lat',
            'lon'
        ]