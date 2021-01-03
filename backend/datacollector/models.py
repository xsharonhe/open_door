from django.db import models

# Create your models here.
class Rental(models.Model):
    id = models.TextField(primary_key=True)
    night_price = models.IntegerField()
    num_of_baths = models.IntegerField()
    num_of_rooms = models.IntegerField()
    name = models.CharField(max_length=250)
    airbnb_neighborhood = models.CharField(max_length=50)
    capacity_of_people = models.IntegerField()
    property_type = models.CharField(max_length=50)
    reviews_count = models.IntegerField()
    start_rating = models.IntegerField()
    created_at = models.DateTimeField()
    num_of_beds = models.IntegerField()
    lat = models.DecimalField(max_digits=10, decimal_places=4)
    lon = models.DecimalField(max_digits=10, decimal_places=4)
    
    class Meta:
        ordering = ("-night_price",)
        
    def __str__(self):
        return self.name