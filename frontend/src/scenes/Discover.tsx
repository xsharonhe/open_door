import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Select from 'react-select';
import { PageLayout } from '../components/hoc/PageLayout';
import {
  Button,
  ResultCard,
  Heading,
  ReviewCard
} from "../components";
import { strings, ReviewProps, RentalProps } from "../utils";

const options = [
  { value: 'food reviews', label: 'Food reviews'},
  { value: 'rentals', label: 'Rentals'}
];

const FIRST_VALUE = 0;

const Discover = () => {
    const [error, setError] = useState(false);
    const [selectedValue, setSelectedValue] = useState(options[FIRST_VALUE].label);
    const [maxRange, setMaxRange] = useState(4);
    const [maxRangeRentals, setMaxRangeRentals] = useState(4);
    const [reviewResults, setReviewResults] = useState<ReviewProps[]>([]);
    const [rentalResults, setRentalResults] = useState<RentalProps[]>([]);
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
      axios
        .get(`http://localhost:8000/api/v1/rentals`)
        .then(res => {
            const data = res.data.results;
            setRentalResults(data);
        })
        .catch(err => {
            setError(true);
        });
    }, [error]);

    const loadMore = useCallback(() => {
      setMaxRange(prevRange => prevRange + 3);
    },[]);

    const loadMoreRentals = useCallback(() => {
      setMaxRangeRentals(prevRange => prevRange + 3);
    }, []);

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
    ));

    const loadRentals = rentalResults.slice(0, maxRange).map((rental) => (
      <SResultCard 
        onClick={() => history.push(`/discover/reviews/${rental.id}`)}
        key={rental.name}
        price={rental.night_price}
        city={rental.airbnb_neighborhood}
        address={rental.property_type}
        bedrooms={rental.num_of_rooms}
        people={rental.capacity_of_people}
        bathrooms={rental.num_of_baths}
      />
  ));

  return (
      <PageLayout>
        <Container>
          <HeadingWrapper>
            <SHeading> Discover</SHeading>
            <StyledSelect 
              onChange={(e: any) => {
                  setSelectedValue(e.label);
              }}
              placeholder={options[FIRST_VALUE].label} 
              options={options}
            />
          </HeadingWrapper>
          <Wrapper>
              {selectedValue === 'Food reviews' ? (
                  <CardWrapper>
                    {loadCards}
                    {maxRange <= 50 && (
                      <SButton onClick={loadMore} isInverted={false}>
                        Load More
                      </SButton>
                    )}
                    </CardWrapper>
              ) : (
                <CardWrapper>
                  {loadRentals}
                  {maxRange <= 50 && (
                      <SButton onClick={loadMore} isInverted={false}>
                        Load More
                      </SButton>
                  )}
                </CardWrapper>
              )}
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
    ${({ theme }) => `
        transition: ${theme.transitions.easeIn};
    `};
`;
const SButton = styled(Button)`
    margin: 20px 0 50px 0;
`;
const HeadingWrapper = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
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
const SResultCard = styled(ResultCard)`
    margin: 20px 0;
`;
const StyledSelect = styled(Select)`
    width: 200px;
    z-index: -50;
`;
export default Discover;