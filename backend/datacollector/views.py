from django.shortcuts import render
from rest_framework import generics, filters, pagination
from .serializers import RentalSerializer
from .models import Rental

# Create your views here.
class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
class RentalListView(generics.ListAPIView):
    serializer_class = RentalSerializer
    pagination_class = StandardResultsSetPagination
    queryset = Rental.objects.all()
    
class RentalSearchView(generics.ListAPIView):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    pagination_class = pagination.PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['property_type', 'name', 'airbnb_neighborhood']
    
class RentalDetailView(generics.RetrieveAPIView):
    serializer_class = RentalSerializer
    queryset = Rental.objects.all()
    