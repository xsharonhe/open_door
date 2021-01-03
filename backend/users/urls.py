from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework import routers
from .views import UserViewSet, GetAuthToken

router = routers.DefaultRouter()
router.register('users/all', UserViewSet)

urlpatterns = [
    # url(r'^users/all', UserViewSet, name='user_view'),
    path('', include(router.urls)),
    url(r'^users/auth', GetAuthToken.as_view(), name='user_auth'),
]
