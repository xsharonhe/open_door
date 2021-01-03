# python3 manage.py shell to load data to django
import pandas as pd
from datacollector.models import Rental

df = pd.read_csv("datacollector/data/final_rental")

rentals = [
    Rental(
        id = df.at[row, 'id'],
        night_price = df.at[row, 'night_price'],
        num_of_baths = df.at[row, 'num_of_baths'],
        num_of_rooms = df.at[row, 'num_of_rooms'],
        name = df.at[row, 'name'],
        airbnb_neighborhood = df.at[row, 'airbnb_neighborhood'],
        capacity_of_people = df.at[row, 'capacity_of_people'],
        property_type = df.at[row, 'property_type'],
        reviews_count = df.at[row, 'reviews_count'],
        start_rating = df.at[row, 'start_rating'],
        created_at = df.at[row, 'created_at'],
        num_of_beds = df.at[row, 'num_of_beds'],
        lat = df.at[row, 'lat'],
        lon = df.at[row, 'lon']
    ) for row in range(0, 50)
]

Rental.objects.bulk_create(rentals)