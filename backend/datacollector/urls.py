from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'rentals'

urlpatterns = [
    path('rentals/',
         views.rentals_view,
         name='rentals_list'),
    
    path('rentals_search/',
         views.RentalSearchView.as_view(),
         name='rental_search'),
    
    path('rentals_stats/<pk>/',
         views.rental_stats,
         name='rental_detail')
]

urlpatterns = format_suffix_patterns(urlpatterns)