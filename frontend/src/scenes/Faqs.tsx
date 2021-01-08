import React from "react";
import styled from "styled-components";
import { Text, Heading } from '../components';
import { PageLayout } from '../components/hoc/PageLayout';
import { media } from "../utils";
import SearchImg from "./assets/search.png";
import DiscoverImg from "./assets/discover.png";
import AnalyticsImg from "./assets/analytics.png";
import BudgetImg from "./assets/budget.png";
import RecommendationImg from "./assets/recommendation.png";

interface IFaq {};

const Faq: React.FC<IFaq> = (): React.ReactElement => {
  const markdown =` 
  # What is Open Door?
  As university students, we have personally found it difficult to manage our budget. We used this as
  an inspiration to build Open Door, an application that is designed to help university students find their
  ideal rental suiting and food preferences. \n
 
  We used Mashvisor's and Yelp's APIs to provide us with the necessary data to build this application. The data
  that we retrieved from Yelp was then also passed through a sentiment analyzer through the VADER library
  and used NLTK to provide a summary sentiment from the Yelp reviews based on a frequency dictionary. \n

  ## Features
  ###Search page:
  `;
  return (
      <PageLayout>
        <div style={{ paddingBottom: '50px' }}>
          <Heading>What is Open Door?</Heading>
          <Text>
          As university students, we have personally found it difficult to manage our budget. We used this as
          an inspiration to build Open Door, an application that is designed to help university students find their
          ideal rental suiting and food preferences. Currently, our service is based in New York City, New York, USA.
          </Text>
          <Text>
          We used Mashvisor's and Yelp's APIs to provide us with the necessary data to build this application. The data
          that we retrieved from Yelp was then also passed through a sentiment analyzer through the VADER library
          and used NLTK to provide a summary sentiment from the Yelp reviews based on a frequency dictionary.
          </Text>
          <Text size="h2" align="center" bold>
              Features
          </Text>
          <Wrapper>
            <SImg src={SearchImg} alt="Search page" />
          </Wrapper>
          <Text>
              <b> Search bar</b>: Using django-filter, we take the top six most relevant results to a user's search query.
          </Text>
          <Wrapper>
            <SImg src={DiscoverImg} alt="Discover page" />
          </Wrapper>
          <Text>
              <b> Discover</b>: Using Google Maps, users are able to see more detail about each rental place and restaurant
              and can see its location on a map.
          </Text>
          <Wrapper>
            <SImg src={AnalyticsImg} alt="Analytics page" />
          </Wrapper>
          <Text>
              <b> Analytics</b>: Using Nivo's visualization package and Django's aggregation features,
              we can determine the relative percentile of each location compared to all locations on Open Door.
              For instance, a nightly price at the 20th percentile is cheaper than 80% of the other rentals.
              For food reviews, we can also see the summary sentiment and the overall sentiment score out of 100
              based on the compound, positive, negative, and neutral scores from the VADER sentiment analyser.
          </Text>
          <Wrapper>
            <SImg src={BudgetImg} alt="Budget page" />
          </Wrapper>
          <Text>
              <b> Budget</b>: We are able to see the breakdown of the individual's budget, and users can update 
              the information if their budget changes.
          </Text>
          <Wrapper>
            <SImg src={RecommendationImg} alt="Recommendation page" />
          </Wrapper>
          <Text>
              <b> Recommendation</b>: Based on a user's profile, we can recommend the top choices using their 
              budget information. For instance, if an individual can only afford $500 a month on rental, we will
              recommend the closest to that price with the highest rating and approval rate.
          </Text>
          <Text size="h2" align="center" bold>
              What we have learned
          </Text>
          <Text>
              This was our first time using Django as REST API. This brought about its own set of challenges,
              as we had to learn its framework and understanding its different types of views. 
          </Text>
          <Text>
              It was also our first time working with other people extensively on a larger-scale project, so we learned a 
              lot about teamwork and communication throughout this project.
          </Text>
          <Text size="h2" align="center" bold>
              What's next for Open Door
          </Text>
          <Text>
              <ul>
                <li> Incorporating data from other aspects of a student's budget (e.g. gyms etc.) </li>
                <li> Expand database and enable users to star their favourite locations </li>
                <li> More accurate sentiment summarizer </li>
              </ul>
          </Text>
        </div>
      </PageLayout>
  );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
`;
const SImg = styled.img`
    max-width: 400px;
    ${media("tablet",
    `
        max-width: 300px;
    `)}
`;
export default Faq;