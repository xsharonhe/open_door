from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Person
from .serializers import PersonSerializer

class GetUserProfileView(APIView):
    def get(self, request, format=None):
        try: 
            user = self.request.user
            username = user.username

            user_profile = Person.objects.get(user=user)
            user_profile = PersonSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'Error getting user profile'})


class UpdateUserProfileView(APIView):
    def put(self, request, format=None):
        try: 
            user = self.request.user
            username = user.username

            data = self.request.data
            budget = data['budget']
            rental_budget = data['rental_budget']
            food_budget = data['food_budget']
            gym_budget = data['gym_budget']
            transportation_budget = data['transportation_budget']
            other_budget = data['other_budget']

            Person.objects.filter(user=user).update(budget=budget, rental_budget=rental_budget, food_budget=food_budget, gym_budget=gym_budget, transportation_budget=transportation_budget, other_budget=other_budget)

            user_profile = Person.objects.get(user=user)
            user_profile = PersonSerializer(user_profile)

            return Response({'profile': user_profile.data, 'username': str(username)})
        except:
            return Response({'error': 'Error updating user profile'})
