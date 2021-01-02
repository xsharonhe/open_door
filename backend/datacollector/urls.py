from django.urls import path
from . import views

app_name = 'rentals'

urlpatterns = [
    path('rentals/',
         views.RentalListView.as_view(),
         name='rental_list'),
    
    path('rentals/<pk>/',
         views.RentalDetailView.as_view(),
         name='rental_detail')
]