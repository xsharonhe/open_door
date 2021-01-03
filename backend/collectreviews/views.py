from django.shortcuts import render
from rest_framework import generics, filters, pagination
from .serializers import ReviewSerializer
from .models import Review

# Create your views here.
class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
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
    