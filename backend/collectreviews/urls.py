from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('reviews',
         views.ReviewView.as_view()),
    
    path('reviews_search',
        views.ReviewSearchView.as_view()),
    
    path('reviews_stats/<pk>',
         views.ReviewStats.as_view())
]