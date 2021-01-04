from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import permissions
from django.contrib import auth
from users.models import Person
from rest_framework.response import Response
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect
from django.utils.decorators import method_decorator

@method_decorator(csrf_protect, name='dispatch')
class CheckAuthenticated(APIView):
    def get(self, request, format=None):
        try:
            isAuthenticated = user.isAuthenticated

            if isAuthenticated:
                return Response({'success': "User is authenticated"})
            else:
                return Response({'error': 'Error authenticating'})
        except:
            return Response({'error': 'Error checking authentication status'})

@method_decorator(csrf_protect, name='dispatch')
class SignUpView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username= data['username']
        password = data['password']
        verifyPassword = data['verifyPassword']

        try: 
            if password == verifyPassword:
                if User.objects.filter(username=username).exists():
                    return Response({'error': 'Username already exists'})
                else: 
                    if len(password) < 8:
                        return Response({'error': 'Password must be at least 8 characters'})
                    else:
                        user = User.objects.create_user(username=username, password=password)
                        user.save()
                        
                        user = User.objects.get(id=user.id) # get instance
                        user_profile = Person(user=user, budget=0, rental_budget=0, food_budget=0, gym_budget=0, transportation_budget=0, other_budget=0, fav_rental_id='', fav_food_id='')
                        user_profile.save()

                        return Response({ 'success': 'User account created'})
            else:
                return Response({ 'error': 'Passwords do not match'})
        except:
            return Response({'error': 'Error registering account'})

@method_decorator(csrf_protect, name='dispatch')
class SignInView(APIView):
    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = self.request.data

        username = data['username']
        password = data['password']

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:
                auth.login(request, user)
                return Response({'success': 'User authenticated', 'username': username })
            else:
                return Response({'error': 'Error authenticating'})
        except:
            return Response({'error': 'Error signing in'})

class SignOutView(APIView):
    def post(self, request, format=None):
        try:
            auth.logout(request)
            return Response({'success': "Signed out"})
        except:
            return Response({'error': 'Error signing out'})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(APIView):
     permission_classes = (permissions.AllowAny, )

     def get(self, request, format=None):
         return Response({'success': 'CSRF Cookie set'})

class DeleteAccountView(APIView):
    def delete(self, request, format=None):
        user = self.request.user

        try:
            user = User.objects.filter(id=user.id).delete()
            return Response({'success': 'User account deleted'})
        except:
            return Response({'error': 'Error deleting user account'})