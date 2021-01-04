from django.urls import path
from .views import GetUserProfileView, UpdateUserProfileView

urlpatterns = [
    path('profile', GetUserProfileView.as_view()),
    path('update', UpdateUserProfileView.as_view())
]
