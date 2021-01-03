from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Person(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='person')
    budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    rental_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    food_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    gym_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    transportation_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    other_budget = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    fav_rental_id = models.CharField(max_length=50)