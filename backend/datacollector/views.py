from django.shortcuts import render
from django.http import Http404
from django.db.models import Avg
from rest_framework import generics, filters, pagination, status
from rest_framework.response import Response
from rest_framework.decorators import api_view
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
    
@api_view(['GET'])
def rental_stats(request, pk):
    if request.method == 'GET':
        try:
            rental = Rental.objects.get(pk=pk)
            serializer = RentalSerializer(rental)
            night_price_avg = Rental.objects.all().aggregate(Avg('night_price'))
            return Response({
                'query': serializer.data,
                'night_price_avg': night_price_avg['night_price__avg']
            })
        except Rental.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)