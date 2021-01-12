# What is Open Door?
See our demo at: https://www.youtube.com/watch?v=1ddBH1EQU7s

  As university students, we have personally found it difficult to manage our budget. We used this as
  an inspiration to build Open Door, an application that is designed to help university students find their
  ideal rental suiting and food preferences.
 
  We used Mashvisor's and Yelp's APIs to provide us with the necessary data to build this application. The data
  that we retrieved from Yelp was then also passed through a sentiment analyzer through the VADER library
  and used NLTK to provide a summary sentiment from the Yelp reviews based on a frequency dictionary.

## Features
![Search-page](https://github.com/xsharonhe/open_door/blob/main/frontend/src/scenes/assets/search.png)
<b> Search bar</b>: Using django-filter, we take the top six most relevant results to a user's search query.
![Discover-page](https://github.com/xsharonhe/open_door/blob/main/frontend/src/scenes/assets/discover.png)
<b> Discover</b>: Using Google Maps, users are able to see more detail about each rental place and restaurant and can see its location on a map.
![Analytics-page](https://github.com/xsharonhe/open_door/blob/main/frontend/src/scenes/assets/analytics.png)
<b> Analytics</b>: Using Nivo's visualization package and Django's aggregation features,
              we can determine the relative percentile of each location compared to all locations on Open Door.
              For instance, a nightly price at the 20th percentile is cheaper than 80% of the other rentals.
              For food reviews, we can also see the summary sentiment and the overall sentiment score out of 100
              based on the compound, positive, negative, and neutral scores from the VADER sentiment analyser.
              
![Budget-page](https://github.com/xsharonhe/open_door/blob/main/frontend/src/scenes/assets/budget.png)
             
<b> Budget</b>: We are able to see the breakdown of the individual's budget, and users can update 
              the information if their budget changes.

![Recommendation-page](https://github.com/xsharonhe/open_door/blob/main/frontend/src/scenes/assets/recommendation.png)
              <b> Recommendation</b>: Based on a user's profile, we can recommend the top choices using their 
              budget information. For instance, if an individual can only afford $500 a month on rental, we will
              recommend the closest to that price with the highest rating and approval rate.
      
 ## What we learned:
 This was our first time using Django as REST API. This brought about its own set of challenges,
 as we had to learn its framework and understanding its different types of views.
 It was also our first time working with other people extensively on a larger-scale project, so we learned a 
              lot about teamwork and communication throughout this project.
              
 ## What's next for Open Door:
  * Incorporating data from other aspects of a student's budget (e.g. gyms etc.) 
  * Expand database and enable users to star their favourite locations 
  * More accurate sentiment summarizer
  * Deploying on ElasticBeanstalk
