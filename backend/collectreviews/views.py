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
from .serializers import ReviewSerializer
from .models import Review

# Create your views here.
class StandardResultsSetPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 1000
    
@method_decorator(csrf_protect, name='dispatch')
class ReviewView(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, format=None):
        try:
            params = request.query_params
            review = Review.objects.all().order_by('-score')
            serializer = ReviewSerializer(review, many=True)
            return Response(serializer.data)
        except Review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
@method_decorator(csrf_protect, name='dispatch')
class ReviewSearchView(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    pagination_class = pagination.PageNumberPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'summary', 'address']
    

@method_decorator(csrf_protect, name='dispatch')
class ReviewStats(APIView):
    permission_classes = (permissions.AllowAny, )
    
    def get(self, request, pk, format=None):
        try:
            rental = Review.objects.get(pk=pk)
            serializer = ReviewSerializer(rental)
            cnt = Review.objects.all().count()
            
            score_avg = Review.objects.all().aggregate(Avg('score'))
            score_avg = score_avg['score__avg']
            score_benchmark = Review.objects.filter(score__lte=serializer.data['score']).count()
            score_perc = (score_benchmark / cnt * 100)
            
            rating_avg = Review.objects.all().aggregate(Avg('rating'))
            rating_avg = rating_avg['rating__avg']
            rating_benchmark = Review.objects.filter(rating__lte=serializer.data['rating']).count()
            rating_perc = (rating_benchmark / cnt * 100)
            
            count_avg = Review.objects.all().aggregate(Avg('review_count'))
            count_avg = count_avg['review_count__avg']
            count_benchmark = Review.objects.filter(review_count__lte=serializer.data['review_count']).count()
            count_perc = (count_benchmark / cnt * 100)
            
            price_avg = Review.objects.all().aggregate(Avg('price'))
            price_avg = price_avg['price__avg']
            price_benchmark = Review.objects.filter(price__lte=serializer.data['price']).count()
            price_perc = (price_benchmark / cnt * 100)
            
            
            return Response({
                'query': serializer.data,
                'score_avg': score_avg,
                'rating_avg': rating_avg,
                'count_avg': count_avg,
                'price_avg': price_avg,
                'score_perc': score_perc,
                'rating_perc': rating_perc,
                'count_perc': count_perc,
                'price_perc': price_perc,
            })
            
        except Review.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    