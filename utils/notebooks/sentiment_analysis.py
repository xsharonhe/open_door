#!/usr/bin/env python
# coding: utf-8

# In[3]:


import pandas as pd
import numpy as np
import nltk
import spacy 
import os

pd.pandas.set_option("display.max_columns", None)


# In[4]:


os.getcwd()


# In[5]:


os.chdir("../")


# In[7]:


os.listdir()


# ### Cleaning

# In[688]:


df = pd.read_csv("raw_data/yelp_raw")


# In[689]:


df.drop(columns=["Unnamed: 0", "image_url",
                "is_closed", "url", "phone", "distance"], inplace=True)


# In[690]:


df.head()


# In[691]:


df["reviews"] = df["review_1"] + df["review_2"] + df["review_3"]


# In[692]:


df.drop(columns=["review_1", "review_2", "review_3"], inplace=True)


# In[693]:


df.dropna(subset=["price", "reviews", "display_phone"], inplace=True)


# In[694]:


df.shape # making sure na have been dropped


# In[695]:


df.drop(columns=["categories", "transactions"], inplace=True)


# In[696]:


df["review_count"] = df["review_count"].apply(lambda review: int(review))


# In[697]:


df.drop(columns=["alias"], inplace=True)


# In[698]:


df.dtypes


# In[699]:


df["price"].apply("nunique")


# In[700]:


expense_dict = {
    "$": 1,
    "$$": 2,
    "$$$": 3,
    "$$$$": 4
}


# In[701]:


df.replace(expense_dict, inplace=True)


# In[702]:


df = df.reset_index()


# In[703]:


df["coordinates"] = list(df["coordinates"])


# In[704]:


df["coordinates"] = df["coordinates"].str.split()


# In[705]:


df.head()


# In[706]:


for i in range(0, 404):
    df["latitude"] = df.at[i, "coordinates"][1]
    df["longitude"] = df.at[i, "coordinates"][3]


# In[707]:


df["latitude"] = df["latitude"].str.replace(",","")


# In[708]:


df["longitude"] = df["longitude"].str.replace("}","")


# In[709]:


df.drop(columns=["coordinates"], inplace=True)


# In[710]:


df["location"] = list(df["location"])


# In[711]:


c = df.copy()


# In[712]:


c["location"] = c["location"].str.split(":")


# In[713]:


c["location"][4][1]


# In[714]:


for i in range(0, 404):
    c.at[i, "address"] = c["location"][i][1]


# In[715]:


df.drop(columns=["location"], inplace=True)


# In[716]:


c["address"] = c["address"].str.replace("'", "")


# In[717]:


c["address"] = c["address"].str.replace("'", "")


# In[718]:


c["address"] = c["address"].str.replace(", address2","")


# In[719]:


c.drop(columns=["location"], inplace=True)


# In[720]:


c.head()


# In[721]:


df.shape


# In[722]:


df = c


# In[723]:


df = d


# In[724]:


d = df.copy()


# ### Sentence Tokenization
# Sentence tokenization is the process of splitting a text corpus into sences - respecially helpful for removing specific delimiters (., \n, ;)

# In[725]:


import re


# In[726]:


nltk.download('punkt')


# In[727]:


default_st = nltk.sent_tokenize


# In[728]:


s = df["reviews"][0]


# In[729]:


s


# In[730]:


smp = default_st(text=s) # split into sentences


# In[731]:


print(np.array(smp))


# In[732]:


import unicodedata


# In[733]:


get_ipython().system('pip3 install contractions')


# In[734]:


import contractions # contraction 


# In[735]:


df.head()


# In[736]:


def remove_accented_characters(text):
    text = unicodedata.normalize('NFKD', text).encode('ascii', 'ignore').decode('utf-8', 'ignore')
    return text


# In[737]:


df.head()


# In[738]:


for i in range(i, 404):
    df.at[i, "reviews"] = re.sub(r'[^\w\s]', '', df.at[i, "reviews"])


# In[739]:


df["a_reviews"] = df["reviews"].apply(lambda review: np.array(default_st(contractions.fix(remove_accented_characters(review)))))


# In[740]:


treebank_wt = nltk.TreebankWordTokenizer()


# In[741]:


w = treebank_wt.tokenize(s)


# In[742]:


np.array(w)


# In[743]:


df["w_reviews"] = df["reviews"].apply(lambda review: np.array(treebank_wt.tokenize(remove_accented_characters(contractions.fix(review)))))


# In[744]:


df.head()


# In[745]:


stopwords = nltk.corpus.stopwords.words('english')


# In[746]:


df["w_reviews"][0]


# In[747]:


word_frequencies = {}


# In[748]:


for i in range(0, 404):
    for word in df["w_reviews"][i]:
        if word not in stopwords:
            if word not in word_frequencies.keys():
                word_frequencies[word] = 1
            else:
                word_frequencies[word] += 1


# In[749]:


word_frequencies


# In[750]:


maximum_frequncy = max(word_frequencies.values())

for word in word_frequencies.keys():
    word_frequencies[word] = (word_frequencies[word]/maximum_frequncy)


# In[751]:


import heapq


# In[753]:


for i in range(0, 404):
    sentence_scores = {}
    for sent in df.at[i, "a_reviews"]:
        for word in nltk.word_tokenize(sent.lower()):
            if word in word_frequencies.keys():
                if len(sent.split(' ')) < 30:
                    if sent not in sentence_scores.keys():
                        sentence_scores[sent] = word_frequencies[word]
                    else:
                        sentence_scores[sent] += word_frequencies[word]
    summary_sent = heapq.nlargest(9, sentence_scores, key=sentence_scores.get)
    summary = ' '.join(summary_sent)
    summary = summary.replace("...",". ")
    df.at[i, "summary"] = summary


# In[675]:


sentence_scores = {}
for sent in df["a_reviews"][0]:
    for word in nltk.word_tokenize(sent.lower()):
        if word in word_frequencies.keys():
            if len(sent.split(' ')) < 30:
                if sent not in sentence_scores.keys():
                    sentence_scores[sent] = word_frequencies[word]
                else:
                    sentence_scores[sent] += word_frequencies[word]


# In[766]:


sentence_scores


# In[765]:


summary_sentences = heapq.nlargest(9, sentence_scores, key=sentence_scores.get)

summary = ' '.join(summary_sentences)
print(summary)


# ### Sentiment Analysis

# In[755]:


from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
analyser = SentimentIntensityAnalyzer()


# In[763]:


for i in range(0, 404):
    score = analyser.polarity_scores(df.at[i, "summary"])
    df.at[i, "neg"] = score["neg"]
    df.at[i, "neu"] = score["neu"]
    df.at[i, "pos"] = score["pos"]
    df.at[i, "compound"] = score["compound"]


# In[769]:


for i in range(0, 404):
    if df.at[i, "compound"] >= 0.05:
        df.at[i, "status"] = "Positive"
    elif df.at[i, "compound"] <= -0.05:
        df.at[i, "status"] = "Neutral"
    else: 
        df.at[i, "status"] = "Negative"


# In[790]:


for i in range(0, 404):
    df.at[i, "score"] = round(((df.at[i, "compound"] + 1) / 2 * 50) + ((50 / 3) - (df.at[i, "neg"]) * 50/3) + ((df.at[i, "neu"]) * 50/3) + ((df.at[i, "pos"]) * 50/3), 1)


# In[791]:


df.head(10)


# In[792]:


c = df.copy()


# In[793]:


c.drop(columns=["index","reviews","a_reviews", "w_reviews","neg", "neu", "pos", "compound"], inplace=True)


# In[796]:


c["summary"][2]


# In[797]:


c.to_csv("yelp_clean", index=False)


# In[ ]:




