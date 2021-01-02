from django.shortcuts import render
from rest_framework import viewsets
from .serializers import RentalSerializer
from .models import Rental

# Create your views here.
class RentalView(viewsets.ModelViewSet):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()