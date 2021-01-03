from django.urls import path
from . import views

app_name = 'rentals'

urlpatterns = [
    path('rentals/',
         views.RentalListView.as_view(),
         name='rentals_list'),
    
    path('rentals_search/',
         views.RentalSearchView.as_view(),
         name='rental_search'),
    
    path('rentals/<pk>/',
         views.RentalDetailView.as_view(),
         name='rental_detail')
]