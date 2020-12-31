import requests
import json
import pandas as pd

url = "https://mashvisor-api.p.rapidapi.com/airbnb-property/active-listings"

querystring = {
    "state": "NY",
    "page": "10",
    "city": "New York",
    "items": "20"
    }

headers = {
    'x-rapidapi-key': MASHVISORY_API_KEY,
    'x-rapidapi-host': "mashvisor-api.p.rapidapi.com"
    }

response = requests.request("GET", url, headers=headers, params=querystring)

!pip install fsspec

d = json.loads(response.text)
d = d['content']
d = d['properties']
data = pd.DataFrame.from_dict(d)
data.head()

database = database.append(data)

database.shape

database.to_csv('rentals')

df = pd.DataFrame.from_dict(d)

df.shape

df.head()