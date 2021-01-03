# python3 manage.py shell to load data to django
# must place raw data in right folder
import pandas as pd
from collectreviews.models import Review

df = pd.read_csv("collectreviews/data/yelp_clean")

reviews= [
    Review(
        id = df.at[row, 'id'],
        name = df.at[row, 'name'],
        review_count = df.at[row, 'review_count'],
        rating = df.at[row, 'rating'],
        status = df.at[row, 'status'],
        price = df.at[row, 'price'],
        display_phone = df.at[row, 'display_phone'],
        address = df.at[row, 'address'],
        summary = df.at[row, 'summary'],
        score = df.at[row, 'score'],
        lat = df.at[row, 'lat'],
        lon = df.at[row, 'lon']
    ) for row in range(0, 50)
]

Review.objects.bulk_create(reviews)