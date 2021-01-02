from django.shortcuts import render
from rest_framework import generics
from .serializers import RentalSerializer
from .models import Rental

# Create your views here.
class RentalListView(generics.ListAPIView):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    
class RentalDetailView(generics.RetrieveAPIView):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()