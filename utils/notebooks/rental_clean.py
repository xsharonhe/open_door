import pandas as pd
import numpy as np
import os
from sqlalchemy import create_engine

os.getcwd()

os.chdir("../")

df = pd.read_csv("data/rentals")

df.drop(columns=["Unnamed: 0", "reviews", "image", "status", "source", "url", 
                 "amenities", "cleaning_fee_native", "zip",
                "cleaning_fee_native",
                "room_type", "room_type_category", "airbnb_city", "state", # remove those with only one cateogires
                "weekly_price", "monthly_price",
                "property_id", "night_priceـnative", 
                "rental_income", "airbnb_neighborhood_id",
                "updated_at", "nights_booked", "occupancy",
                "address"], inplace=True)

df.dropna(inplace=True)

df.isnull().sum()

df["num_of_baths"] = df["num_of_baths"].apply(lambda x: int(x))

df.dtypes

df["created_at"] = pd.to_datetime(df["created_at"])

df.reset_index()

df.to_csv("final_rental", index=False)

engine = create_engine("sqlite://", echo=False)
df.to_sql("new__datacollector_rental", con=engine, if_exists="replace", index=False)
engine.execute("SELECT * FROM new__datacollector_rental").fetchall()