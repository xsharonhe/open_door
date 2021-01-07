from django.shortcuts import render
from django.db.models import Avg, Sum, Count, Q
from rest_framework.views import APIView
from rest_framework import generics, filters, pagination, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import AllowAny
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from .serializers import RentalSerializer
from .models import Rental

@method_decorator(csrf_protect, name='dispatch')
class RentalView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        try:
            rental = Rental.objects.all().order_by('night_price')
            serializer = RentalSerializer(rental, many=True)
            return Response(serializer.data)
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)
# Create your views here.
class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
@method_decorator(csrf_protect, name='dispatch')
class RentalSearchView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    serializer_class = RentalSerializer
    
    def get_queryset(self):
        if self.request.method == 'GET':
            queryset = Rental.objects.all()
            pagination_class = pagination.PageNumberPagination
            filter_backends = [filters.SearchFilter]
            search_fields = ['name', 'airbnb_neighborhood', 'property_type']
            return queryset
    
@method_decorator(csrf_protect, name='dispatch')
class RentalStats(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, pk, format=None):
        
        try:
            rental = Rental.objects.get(pk=pk)
            serializer = RentalSerializer(rental)
            cnt = Rental.objects.all().count()
            
            price_avg = Rental.objects.all().aggregate(Avg('night_price'))
            price_avg = price_avg['night_price__avg']
            price_benchmark = Rental.objects.filter(night_price__lte=serializer.data['night_price']).count()
            price_perc = (price_benchmark / cnt * 100)
            
            beds_avg = Rental.objects.all().aggregate(Avg('num_of_beds'))
            beds_avg = beds_avg['num_of_beds__avg']
            beds_benchmark = Rental.objects.filter(num_of_beds__lte=serializer.data['num_of_beds']).count()
            beds_perc = (beds_benchmark / cnt * 100)
            
            rooms_avg = Rental.objects.all().aggregate(Avg('num_of_rooms'))
            rooms_avg = rooms_avg['num_of_rooms__avg']
            rooms_benchmark = Rental.objects.filter(num_of_rooms__lte=serializer.data['num_of_rooms']).count()
            rooms_perc = (beds_benchmark / cnt * 100)
            
            capacity_avg = Rental.objects.all().aggregate(Avg('capacity_of_people'))
            capacity_avg = capacity_avg['capacity_of_people__avg']
            capacity_benchmark = Rental.objects.filter(capacity_of_people__lte=serializer.data['capacity_of_people']).count()
            capacity_perc = (capacity_benchmark / cnt * 100)
            
            baths_avg = Rental.objects.all().aggregate(Avg('num_of_baths'))
            baths_avg = baths_avg['num_of_baths__avg']
            baths_benchmark = Rental.objects.filter(num_of_beds__lte=serializer.data['num_of_baths']).count()
            baths_perc = (baths_benchmark / cnt * 100)
            
            return Response({
                'query': serializer.data,
                'price_avg': price_avg,
                'beds_avg': beds_avg,
                'rooms_avg': rooms_avg,
                'capacity_avg': capacity_avg,
                'baths_avg': baths_avg,
                'price_perc': price_perc,
                'beds_perc': beds_perc,
                'rooms_perc': rooms_perc,
                'capacity_perc': capacity_perc,
                'baths_perc': baths_perc
            })
            
        except Rental.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)