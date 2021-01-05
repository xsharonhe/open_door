from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from . import views

app_name = 'rentals'

urlpatterns = [
    path('rentals',
         views.RentalView.as_view()),
    
    path('rentals_search',
         views.RentalSearchView.as_view()),
    
    path('rentals_stats/<pk>',
         views.RentalStats.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)