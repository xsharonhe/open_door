import requests
import pandas as pd
import numpy as np

headers = {'Authorization': f'Bearer {YELP_API_KEY}'}
url = 'https://api.yelp.com/v3/businesses/search'

query_location = "New York City"
query = "Restaurants"

params = {
    "term": query, 
    "location": query_location,
}

res = requests.get(url, params=params, headers=headers)

json_data = res.json()

bus_lst = json_data["businesses"]

df = pd.DataFrame(bus_lst)

df.head()

df["review_1"] = ""
df["review_2"] = ""
df["review_3"] = ""

df.set_index("id", inplace=True)

business_ids = []

for business in bus_lst:
  business_ids.append(business["id"])

for id in business_ids:
  reviews = []
  response = requests.get('https://api.yelp.com/v3/businesses/' + id + '/reviews', headers=headers)
  review_json = response.json()
  if 'reviews' not in review_json:
    continue
  review_lst = review_json["reviews"]
  df.at[id, "review_1"] = review_lst[0]["text"]
  df.at[id, "review_2"] = review_lst[1]["text"]
  df.at[id, "review_3"] = review_lst[2]["text"]

review["text"]

df.head()

params = {
    "term": query, 
    "location": query_location,
    "offset": "20",
    "limit": "50"
}

res = requests.get(url, params=params, headers=headers)

json_data = res.json()
bus_lst = json_data["businesses"]

data = pd.DataFrame(bus_lst)
data["review_1"] = ""
data["review_2"] = ""
data["review_3"] = ""
data.set_index("id", inplace=True)

def get_reviews(df, bus_lst):
  """
  Get reviews from API by business id
  """
  business_ids = []
  for business in bus_lst:
    business_ids.append(business["id"])
  for id in business_ids:
    reviews = []
    response = requests.get('https://api.yelp.com/v3/businesses/' + id + '/reviews', headers=headers)
    review_json = response.json()
    if 'reviews' not in review_json:
      continue
    review_lst = review_json["reviews"]
    length = len(review_lst)
    if(length >= 1): # prevent key error
      df.at[id, "review_1"] = review_lst[0]["text"]
    if(length >= 2):
      df.at[id, "review_2"] = review_lst[1]["text"]
    if(length >= 3):
      df.at[id, "review_3"] = review_lst[2]["text"]
  return df

database = get_reviews(data)

database.head()

f = df.append(database)

f.shape

params = {
    "term": query, 
    "location": query_location,
    "offset": "70",
    "limit": "50"
}
res = requests.get(url, params=params, headers=headers)
json_data = res.json()
bus_lst = json_data["businesses"]
data = pd.DataFrame(bus_lst)
data["review_1"] = ""
data["review_2"] = ""
data["review_3"] = ""
data.set_index("id", inplace=True)

database = get_reviews(data)

final = f.append(database)

final.shape

def get_params(index_offset, loc = query_location, search_term = query, lim = 50):
  """
  @param index_offset (int) - the offset to filter through further queries
  @param limit (int) - limiting number of queries
  returns bus_lst with set indexes and limit
  """
  params = {
    "term": search_term, 
    "location": loc,
    "offset": index_offset,
    "limit": lim
  }
  res = requests.get(url, params=params, headers=headers)
  json_data = res.json()
  bus_lst = json_data["businesses"]
  return bus_lst

def get_df(bus_lst):
    data = pd.DataFrame(bus_lst)
    data["review_1"] = ""
    data["review_2"] = ""
    data["review_3"] = ""
    data.set_index("id", inplace=True)
    return data

q = get_params(120)

database = get_reviews(q)

final = final.append(database)

final.shape

q = get_params(168)

database = get_reviews(q)

final = final.append(database)

final.shape

final.dropna(subset=["name"], inplace=True)

final.shape

q = get_params(0, "Food")
database = get_reviews(q)

database.dropna(subset=["name"], inplace=True)

database.shape

final = final.append(database)

final.shape

q = get_params(50, "Food")
database = get_reviews(q)

database.dropna(subset=["name"], inplace=True)

final = final.append(database)

final.shape

q_lst = get_params(0, "Jericho", "Restaurant")

q = get_df(q_lst)

database = get_reviews(q, q_lst)

final = final.append(database)

final.shape

q_lst = get_params(200)
q = get_df(q_lst)

database = get_reviews(q, q_lst)

final = final.append(database)

final.shape

final[final["review_1"] == ""] = np.nan # get rid of nan reviews

final.dropna(subset=["review_1"], inplace=True)

final.shape

final.head()

copy = final.duplicated(subset=["review_1"], keep="first") # check duplicates and keep only first

copy.shape

q_lst = get_params(250)
q = get_df(q_lst)
database = get_reviews(q, q_lst)

final = final.append(database)

final.shape

copy = final.copy()

for i in range(300, 450, 50):
  q_lst = get_params(i)
  q = get_df(q_lst)
  database = get_reviews(q, q_lst)
  copy = copy.append(database)

copy.shape

c = copy.copy()

for i in range(0, 250, 50):
  q_lst = get_params(i, "New York City", "Food")
  q = get_df(q_lst)
  database = get_reviews(q, q_lst)
  c = c.append(database)

c.shape

c[c["review_1"] == ""] = np.nan

c.dropna(subset=["review_1"], inplace=True)

p = c.copy()

p = p.reset_index()

type(p)

p.drop_duplicates(subset=["name"], inplace=True)

p.shape

p.to_csv("yelp_raw", index=False)

