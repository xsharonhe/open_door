from django.urls import path
from . import views

app_name = 'reviews'

urlpatterns = [
    path('reviews/',
         views.ReviewListView.as_view(),
         name='review_list'),
    
    path('reviews_search/',
        views.ReviewSearchView.as_view(),
        name='review_search'),
    
    path('reviews/<pk>/',
         views.ReviewDetailView.as_view(),
         name='review_detail')
]