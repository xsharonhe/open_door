from django.shortcuts import render
from rest_framework import generics, filters, pagination
from .serializers import ReviewSerializer
from .models import Review

# Create your views here.
class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    pagination_class =StandardResultsSetPagination
    queryset = Review.objects.all().order_by('price')
    
class ReviewSearchView(generics.ListAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = pagination.PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'summary', 'address']
    
class ReviewDetailView(generics.RetrieveAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    