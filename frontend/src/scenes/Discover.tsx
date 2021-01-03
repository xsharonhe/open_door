import React, { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import { Android } from '@styled-icons/boxicons-logos/Android';
import { PageLayout } from '../components/hoc/PageLayout';
import {
  Button,
  Select,
  ResultCard,
  Heading,
  SModal,
  Input,
  Text,
  ReviewCard
} from "../components";
import { strings, ReviewProps } from "../utils";

const Discover = () => {
    const [error, setError] = useState(false);
    const [maxRange, setMaxRange] = useState(4);
    const [reviewResults, setReviewResults] = useState<ReviewProps[]>([]);
    useEffect(() => {
      axios
          .get(`http://localhost:8000/api/v1/reviews`)
          .then(res => {
            console.log(res);
              const data = res.data.results;
              setReviewResults(data);
          })
          .catch(err => {
              setError(true);
          });
    }, [error]);

    const loadMore = useCallback(() => {
      setMaxRange(prevRange => prevRange + 3);
    },[]);

    let history = useHistory();

    const loadCards = reviewResults.slice(0, maxRange).map((review) => (
        <ReviewCard 
          onClick={() => history.push(`/discover/reviews/${review.id}`)}
          name={review.name}
          status={review.status}
          address={review.address}
          dollarSigns={review.price}
          score={review.score}
        />
    ))

  return (
      <PageLayout>
        <Container>
            <SHeading> Discover</SHeading>
          <Wrapper>
            {loadCards}
            {maxRange <= 50 && (<Button onClick={loadMore} isInverted={true}>
              Load More
            </Button>)}
          </Wrapper>
        </Container>
      </PageLayout>
  );
};

const Container = styled.div`
    display: flex;
    flex-direction: column;
`;
const Wrapper = styled.div`
`;
const SHeading = styled(Heading)`
    text-align: center;
`;
export default Discover;