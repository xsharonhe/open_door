from django.db import transaction
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from .models import Person

class PersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Person
        fields = ("budget", "rental_budget", "food_budget", "gym_budget", "transportation_budget", "other_budget", "fav_rental_id", "fav_food_id")

class UserSerializer(serializers.ModelSerializer):
    person = PersonSerializer()

    class Meta:
        model = User
        fields = ("id", "username", "password", "person")
        extra_kwargs = {'password': {"write_only": True, 'required': True}}

    # Overwriting create method
    @transaction.atomic
    def create(self, validated_data):
        person_data = validated_data.pop('person')
        user = User.objects.create_user(**validated_data)
        user.person = Person.objects.create(user=user, **person_data)
        user.save()
        Token.objects.create(user=user)

        return user