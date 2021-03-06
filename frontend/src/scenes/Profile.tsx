import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { Key } from "@styled-icons/boxicons-solid/Key";
import { Redirect, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { ResponsivePie } from "@nivo/pie";
import { PageLayout } from "../components/hoc/PageLayout";
import { Text, Heading } from "../components/Texts";
import { Input } from "../components/Inputs";
import { Button, SModal, ResultCard, ReviewCard } from "../components/Containers";
import { Container, IconDiv, Icon, Form } from "../components/Containers/Form";
import { deleteAccount } from "../store/actions/authActions";
import { media, PieData, ReviewProps, RentalProps } from "../utils";
import { updateProfile } from "../store/actions/profileActions";

interface IProfile {
  updateProfile: Function;
  deleteAccount: Function;
  budget: number;
  rental_budget: number;
  food_budget: number;
  gym_budget: number;
  transportation_budget: number;
  other_budget: number;
  budget_global: number;
  rental_budget_global: number;
  food_budget_global: number;
  gym_budget_global: number;
  transportation_budget_global: number;
  other_budget_global: number;
  isAuthenticated: boolean;
}

const Profile: React.FC<IProfile> = ({
  updateProfile,
  deleteAccount,
  budget_global,
  rental_budget_global,
  food_budget_global,
  gym_budget_global,
  transportation_budget_global,
  other_budget_global,
  isAuthenticated,
  ...props
}): React.ReactElement => {
  const [formData, setFormData] = useState<
    Partial<Omit<IProfile, "updateProfile">>
  >({
    budget: 0,
    rental_budget: 0,
    food_budget: 0,
    gym_budget: 0,
    transportation_budget: 0,
    other_budget: 0,
  });

  const {
    budget,
    rental_budget,
    food_budget,
    gym_budget,
    transportation_budget,
    other_budget,
  } = formData;

  const [pieData, setPieData] = useState<PieData[]>([]);
  const [rentalsRec, setRentalsRec] = useState<RentalProps[]>([]);
  const [reviewsRec, setReviewsRec] = useState<ReviewProps[]>([]);
  const [error, setError] = useState(true);
  const [error2, setError2] = useState(true);

  let history = useHistory();

  useEffect(() => {
    setFormData({
      budget: budget_global !== null ? budget_global : 0,
      rental_budget: rental_budget_global !== null ? rental_budget_global : 0,
      food_budget: food_budget_global !== null ? food_budget_global : 0,
      gym_budget: gym_budget_global !== null ? gym_budget_global : 0,
      transportation_budget:
        transportation_budget_global !== null
          ? transportation_budget_global
          : 0,
      other_budget: other_budget_global !== null ? other_budget_global : 0,
    });

    setPieData([
      {
        id: "Rental",
        label: "Rental",
        value: rental_budget_global,
        color: "hsl(160, 70%, 50%)",
      },
      {
        id: "Food",
        label: "Food",
        value: food_budget_global,
        color: "hsl(333, 70%, 50%)",
      },
      {
        id: "Gym",
        label: "Gym",
        value: gym_budget_global,
        color: "hsl(127, 70%, 50%)",
      },
      {
        id: "Transportation",
        label: "Transportation",
        value: transportation_budget_global,
        color: "hsl(297, 70%, 50%)",
      },
      {
        id: "Other",
        label: "Other",
        value: other_budget_global,
        color: "hsl(297, 70%, 50%)",
      },
    ]);
    if(food_budget_global >= 0) {
        axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/reviews_rec?price=${food_budget_global}`)
        .then(res => {
            setError(false);
            const data = res.data;
            setReviewsRec(data);
        })
        .catch(err => {
            setError(true);
        });
    } else {
      setReviewsRec([]);
      setError(true);
    }
    if(rental_budget_global >= 1100) {
        axios
        .get(`${process.env.REACT_APP_API_URL}/api/v1/rentals_rec?price=${rental_budget_global}`)
        .then(res => {
            setError2(false);
            const data = res.data;
            setRentalsRec(data);
        })
        .catch(err => {
            setError2(true);
        });
    } else {
      setRentalsRec([]);
      setError2(true);
    }
  }, [
    budget_global,
    rental_budget_global,
    food_budget_global,
    gym_budget_global,
    transportation_budget_global,
    other_budget_global,
  ]);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get("csrftoken");

    updateProfile(
      budget,
      rental_budget,
      food_budget,
      gym_budget,
      transportation_budget,
      other_budget,
      token
    );
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get("csrftoken");

    deleteAccount(token);
  };

  const getTotalBudget = (): number => {
    if (
      rental_budget &&
      food_budget &&
      gym_budget &&
      transportation_budget &&
      other_budget
    ) {
      return (
        parseFloat(rental_budget?.toString()) +
        parseFloat(food_budget?.toString()) +
        parseFloat(gym_budget?.toString()) +
        parseFloat(transportation_budget?.toString()) +
        parseFloat(other_budget?.toString())
      );
    }
    return 0;
  };

  if (!isAuthenticated) {
    return <Redirect to="/signin" />;
  } else {
    return (
      <PageLayout {...props}>
        <Container>
          <IconDiv>
            <Icon as={Key} />
          </IconDiv>
          <Text size="h2" color="primary" align="center" bold>
            User Profile
          </Text>
          <Text size="h3" color="primary" align="center" bold>
            Your total budget is:
            {` $${getTotalBudget()}`}
          </Text>
          <Text size="h4" color="primary" align="center" bold>
            You've indicated your budget is:
            {` $${budget_global}`}
          </Text>
          <PieWrapper>
            <ResponsivePie
              data={pieData}
              margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
              innerRadius={0.5}
              padAngle={0.7}
              cornerRadius={3}
              colors={{ scheme: "nivo" }}
              borderWidth={1}
              borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
              radialLabelsSkipAngle={10}
              radialLabelsTextColor="#333333"
              radialLabelsLinkColor={{ from: "color" }}
              sliceLabelsSkipAngle={10}
              sliceLabelsTextColor="#333333"
              defs={[
                {
                  id: "dots",
                  type: "patternDots",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  size: 4,
                  padding: 1,
                  stagger: true,
                },
                {
                  id: "lines",
                  type: "patternLines",
                  background: "inherit",
                  color: "rgba(255, 255, 255, 0.3)",
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10,
                },
              ]}
              fill={[
                {
                  match: {
                    id: "Rental",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "Transportation",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "Food",
                  },
                  id: "dots",
                },
                {
                  match: {
                    id: "Gym",
                  },
                  id: "lines",
                },
                {
                  match: {
                    id: "Other",
                  },
                  id: "lines",
                },
              ]}
              legends={[
                {
                  anchor: "bottom",
                  direction: "column",
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 5,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: "#999",
                  itemDirection: "left-to-right",
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: "circle",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: "#000",
                      },
                    },
                  ],
                },
              ]}
            />
          </PieWrapper>
          <ModalContainer>
            <SModal
              marginTop
              childComponent={
                <Form>
                  {/* <Text color="primary">Your Budget Plan:</Text> */}
                  <SHeading color="primary">Update Your Budget Plan:</SHeading>
                  <Text color="primary">Overall Budget</Text>
                  <Input
                    placeholder={budget_global?.toString()}
                    type="number"
                    min="0.00"
                    value={budget?.toString()}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFormData({
                        ...formData,
                        budget: parseFloat(e.target.value.trim()),
                      });
                    }}
                  />
                  <Text color="primary">Rent Budget</Text>
                  <Input
                    placeholder={rental_budget_global?.toString()}
                    type="number"
                    min="0"
                    value={rental_budget?.toString()}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFormData({
                        ...formData,
                        rental_budget: parseFloat(e.target.value.trim()),
                      });
                    }}
                  />
                  <Text color="primary">Gym Budget</Text>
                  <Input
                    placeholder={gym_budget_global?.toString()}
                    type="number"
                    min="0"
                    value={gym_budget?.toString()}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFormData({
                        ...formData,
                        gym_budget: parseFloat(e.target.value.trim()),
                      });
                    }}
                  />
                  <Text color="primary">Food Budget</Text>
                  <Input
                    placeholder={food_budget_global?.toString()}
                    type="number"
                    min="0"
                    value={food_budget?.toString()}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFormData({
                        ...formData,
                        food_budget: parseFloat(e.target.value.trim()),
                      });
                    }}
                  />
                  <Text color="primary">Transportation Budget</Text>
                  <Input
                    placeholder={transportation_budget_global?.toString()}
                    type="number"
                    min="0"
                    value={transportation_budget?.toString()}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFormData({
                        ...formData,
                        transportation_budget: parseFloat(
                          e.target.value.trim()
                        ),
                      });
                    }}
                  />
                  <Text color="primary">Other Budget</Text>
                  <Input
                    placeholder={other_budget_global?.toString()}
                    type="number"
                    min="0"
                    value={other_budget?.toString()}
                    onChange={(
                      e: React.ChangeEvent<HTMLInputElement>
                    ): void => {
                      setFormData({
                        ...formData,
                        other_budget: parseFloat(e.target.value.trim()),
                      });
                    }}
                  />
                  <Button style={{ marginTop: "30px" }} onClick={handleUpdate}>
                    Update Profile
                  </Button>
                </Form>
              }
            >
              Update budget
            </SModal>
          </ModalContainer>
          <DeleteContainer>
            <SModal
              isInverted
              childComponent={
                <div>
                  <SHeading color="primary">Warning:</SHeading>
                  <Text align="center">You are about delete your account. This action cannot be undone.</Text>
                  <DeleteWrapper>
                    <Button style={{ marginTop: "30px" }}>
                      Delete Account
                    </Button>
                  </DeleteWrapper>
                </div>
              }
            >
              Delete Account
            </SModal>
          </DeleteContainer>
            <div style={{ paddingTop: '50px' }}>
                <Text size="h3" color="primary" align="center">
                  Based on your budget we recommend:
                </Text>
                <Text size="h4" color="primary" align="center">
                    For food:
                </Text>
            </div>
            <CardWrapper>
              {!!error ? (
                <Text size="h4" color="primary" align="center" bold>
                  No food recommendations based on your budget
                </Text>
              ) : reviewsRec.map((review => (
                  <SReviewCard
                    onClick={() => history.push(`/discover/reviews/${review.id}`)}
                    key={review.name}
                    name={review.name}
                    status={review.status}
                    address={review.address}
                    dollarSigns={review.price}
                    score={review.score}
                  />
                )))}
                <Text size="h4" color="primary" align="center">
                    For rentals:
                </Text>
                {!!error2 ? (
                  <Text size="h4" color="primary" align="center" bold>
                    No rental recommendations based on your budget
                  </Text>
                  ) : rentalsRec.map((rental) => (
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
                ))}
          </CardWrapper>
        </Container>
      </PageLayout>
    );
  }
};

const CardWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 50px;
`;
const SReviewCard = styled(ReviewCard)`
  margin: 20px;
`;
const SResultCard = styled(ResultCard)`
  margin: 20px;
`;

const ModalContainer = styled.div`
  text-align: center;
  padding-bottom: 5%;
`;
const SHeading = styled(Heading)`
  ${({ theme }) => `
        h1 {
          font-size: ${theme.size.h1};
        }
    `};
`;

const PieWrapper = styled.div`
  height: 450px;
  width: 300px;
  align-items: center;
  justify-content: center;
  margin: auto;
  margin-top: -100px;
  ${media(
    "1034",
    `
        height: 450px;
        width: 300px;
        margin-bottom: 40px;
    `
  )};
`;

const DeleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DeleteWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  > Button {
    ${({ theme }) => `
        color: ${theme.colors.background};
        background-color: #E58686;
        border: 1px solid ${theme.colors.accent};
        &:focus,
        &:active,
        &:hover {
            background-color: #B26868;
            outline: none;
        }
      `}
  }
`;

const mapStateToProps = (state: any) => ({
  budget_global: state.profile.budget,
  rental_budget_global: state.profile.rental_budget,
  food_budget_global: state.profile.food_budget,
  gym_budget_global: state.profile.gym_budget,
  transportation_budget_global: state.profile.transportation_budget,
  other_budget_global: state.profile.other_budget,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { updateProfile, deleteAccount })(
  Profile
);
