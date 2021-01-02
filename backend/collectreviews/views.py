from django.shortcuts import render
from rest_framework import generics
from .serializers import ReviewSerializer
from .models import Review

# Create your views here.
class ReviewListView(generics.ListAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    
class ReviewDetailView(generics.RetrieveAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()
    