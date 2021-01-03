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
        <SReviewCard 
          onClick={() => history.push(`/discover/reviews/${review.id}`)}
          key={review.name}
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
          <HeadingWrapper>
            <SHeading> Discover</SHeading>
          </HeadingWrapper>
          <Wrapper>
            <CardWrapper>
              {loadCards}
              {maxRange <= 50 && (
                <SButton onClick={loadMore} isInverted={false}>
                  Load More
                </SButton>
              )}
              <div></div>
            </CardWrapper>
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
const SButton = styled(Button)`
    margin: 20px 0 50px 0;
`;
const HeadingWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;
const SHeading = styled(Heading)`
    text-align: center;
`;
const CardWrapper = styled.div`
    height: 1000px;
    width: 30%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-right: 50px;
`;
const SReviewCard = styled(ReviewCard)`
    margin: 20px 0;
`;
export default Discover;