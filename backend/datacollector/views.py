from django.shortcuts import render
from rest_framework import generics, filters
from .serializers import RentalSerializer
from .models import Rental

# Create your views here.
class RentalListView(generics.ListAPIView):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    
class RentalSearchView(generics.ListAPIView):
    serializer_class = RentalSerializer
    
    def get_queryset(self):
        queryset = Rental.objects.all().order_by('night_price')
        filter_backends = [filters.SearchFilter]
        search_fields = ['property_type', 'name', 'airbnb_neighborhood']
        return queryset[:3]
    
class RentalDetailView(generics.RetrieveAPIView):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    