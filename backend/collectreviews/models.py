from django.db import models

# Create your models here.
class Review(models.Model):
    STATUS_CHOICES = (
        ('Positive', 'positive'),
        ('Negative', 'negative'),
        ('Neutral', 'neutral')
    )
        
    id = models.TextField(primary_key=True)
    name = models.CharField(max_length=50)
    review_count = models.IntegerField()
    rating = models.DecimalField(max_digits=3, decimal_places=1)
    name = models.CharField(max_length=250)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES)
    price = models.IntegerField()
    display_phone = models.CharField(max_length=20)
    lat = models.DecimalField(max_digits=10, decimal_places=4)
    lon = models.DecimalField(max_digits=10, decimal_places=4)
    address = models.CharField(max_length=50)
    summary = models.TextField()
    score = models.DecimalField(max_digits=3, decimal_places=1)
    
    class Meta:
        ordering = ("-score",)
        
    def __str__(self):
        return self.name