import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Select from "react-select";
import { PageLayout } from "../components/hoc/PageLayout";
import { Button, ResultCard, Heading, ReviewCard } from "../components";
import { ReviewProps, RentalProps, media } from "../utils";

import GoogleMapReact from "google-map-react";
import { Marker } from "../components/Containers/Marker";

const options = [
  { value: "food reviews", label: "Food reviews" },
  { value: "rentals", label: "Rentals" },
];

const FIRST_VALUE = 0;

const Discover = () => {
  const [error, setError] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    options[FIRST_VALUE].label
  );
  const [maxRange, setMaxRange] = useState(4);
  const [maxRangeRentals, setMaxRangeRentals] = useState(4);
  const [reviewResults, setReviewResults] = useState<ReviewProps[]>([]);
  const [rentalResults, setRentalResults] = useState<RentalProps[]>([]);
  const [center, setCenter] = useState({
    lat: 40.807519237812464,
    lng: -73.9624976009026,
  });
  const [zoom, setZoom] = useState(11);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/reviews`)
      .then((res) => {
        const data = res.data;
        setReviewResults(data);
      })
      .catch((err) => {
        setError(true);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/v1/rentals`)
      .then((res) => {
        const data = res.data;
        setRentalResults(data);
      })
      .catch((err) => {
        setError(true);
      });
  }, [error]);

  const loadMore = useCallback(() => {
    setMaxRange((prevRange) => prevRange + 3);
  }, []);

  const loadMoreRentals = useCallback(() => {
    setMaxRangeRentals((prevRange) => prevRange + 3);
  }, []);

  let history = useHistory();

  const loadCards = reviewResults
    .slice(0, maxRange)
    .map((review) => (
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

  const loadRentals = rentalResults
    .slice(0, maxRangeRentals)
    .map((rental) => (
      <SResultCard
        onClick={() => history.push(`/discover/rentals/${rental.id}`)}
        key={rental.name}
        price={rental.night_price}
        city={rental.airbnb_neighborhood}
        name={rental.name}
        bedrooms={rental.num_of_rooms}
        people={rental.capacity_of_people}
        bathrooms={rental.num_of_baths}
      />
    ));

  const reviewMarkers = reviewResults.slice(0, maxRange).map((review) => (
    <Marker
      // onClick={() => history.push(`/discover/reviews/${review.id}`)}
      key={review.name}
      lat={parseFloat(review.lat?.toString())}
      lng={parseFloat(review.lon?.toString())}
      title={review.name}
    />
  ));

  const rentalMarkers = rentalResults
    .slice(0, maxRangeRentals)
    .map((rental) => (
      <Marker
        // onClick={() => history.push(`/discover/rentals/${rental.id}`)}
        key={rental.name}
        lat={parseFloat(rental.lat?.toString())}
        lng={parseFloat(rental.lon?.toString())}
        title={rental.name}
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
            menuPortalTarget={document.body}
          />
        </HeadingWrapper>
        <Wrapper>
          {selectedValue === "Food reviews" ? (
            <CardWrapper>
              {reviewResults.length >= 3 && loadCards}
              {maxRange <= reviewResults.length && (
                <SButton onClick={loadMore} isInverted={false}>
                  Load More
                </SButton>
              )}
            </CardWrapper>
          ) : (
            <CardWrapper>
              {rentalResults.length >= 3 && loadRentals}
              {maxRangeRentals <= rentalResults.length && (
                <SButton onClick={loadMoreRentals} isInverted={false}>
                  Load More
                </SButton>
              )}
            </CardWrapper>
          )}
          <MapWrapper>
            <MapSubWrapper>
              <GoogleMapReact
                resetBoundsOnResize={true}
                bootstrapURLKeys={{ key: `${process.env.REACT_APP_MAPS_API}` }}
                defaultCenter={center}
                defaultZoom={zoom}
              >
                {selectedValue === "Food reviews"
                  ? reviewMarkers
                  : rentalMarkers}
              </GoogleMapReact>
            </MapSubWrapper>
          </MapWrapper>
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
  float: left;
  margin-right: 20px;
  height: 1000px;
  width: 35%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  ${media(
    "tablet",
    `
    width: 100%;
    `
  )};
`;
const SReviewCard = styled(ReviewCard)`
  margin: 20px 0;
`;
const SResultCard = styled(ResultCard)`
  margin: 20px 0;
`;
const StyledSelect = styled(Select)`
  width: 200px;
`;

const MapWrapper = styled.div`
  margin-left: 100px;
  height: 1000px;
  ${media(
    "tablet",
    `
      display: none;
  `
  )};
`;

const MapSubWrapper = styled.div`
  float: right;
  height: 850px;
  width: 65%;
`;

export default Discover;
