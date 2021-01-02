from django.shortcuts import render
from rest_framework import generics, filters
from .serializers import ReviewSerializer
from .models import Review

# Create your views here.
class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    filter_backends = [filters.SearchFilter]
    filterset_fields = ['name']
    
class ReviewSearchView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    
    def get_queryset(self):
        queryset = Review.objects.all()
        search_fields = ['name', 'summary', 'address']
        filter_backends = (filters.SearchFilter,)
        return queryset[:3]
    
class ReviewDetailView(generics.RetrieveAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    