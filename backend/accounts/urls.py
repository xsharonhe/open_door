from django.urls import path
from .views import SignUpView, GetCSRFToken, SignInView, SignOutView, CheckAuthenticated, DeleteAccountView

urlpatterns = [
    path('auth', CheckAuthenticated.as_view()),
    path('signup', SignUpView.as_view()),
    path('signin', SignInView.as_view()),
    path('signout', SignOutView.as_view()),
    path('delete', DeleteAccountView.as_view()),
    path('csrf_cookie', GetCSRFToken.as_view()),
]