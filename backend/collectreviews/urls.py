from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('reviews/',
         views.reviews_view,
         name='review_list'),
    
    path('reviews_search/',
        views.ReviewSearchView.as_view(),
        name='review_search'),
    
    path('reviews_stats/<pk>/',
         views.reviews_stats,
         name='review_detail')
]