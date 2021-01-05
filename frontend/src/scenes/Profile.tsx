import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Key } from "@styled-icons/boxicons-solid/Key";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Cookies from "js-cookie";
import { ResponsivePie } from "@nivo/pie";
import { PageLayout } from "../components/hoc/PageLayout";
import { Text, Heading } from "../components/Texts";
import { Input } from "../components/Inputs";
import { Button, SModal } from "../components/Containers";
import { Container, IconDiv, Icon, Form } from "../components/Containers/Form";
import { media, PieData } from "../utils";
import { updateProfile } from "../store/actions/profileActions";

interface IProfile {
  updateProfile: Function;
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
}

const Profile: React.FC<IProfile> = ({
  updateProfile,
  budget_global,
  rental_budget_global,
  food_budget_global,
  gym_budget_global,
  transportation_budget_global,
  other_budget_global,
  ...props
}): React.ReactElement => {

  const [profileUpdated, setProfileUpdated] = useState(false);

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

  useEffect(() => {
    setFormData({
      budget: budget_global !== null ? budget_global : 0,
      rental_budget: rental_budget_global !== null ? rental_budget_global : 0,
      food_budget: food_budget_global !== null ? food_budget_global : 0,
      gym_budget: gym_budget_global !== null ? gym_budget_global : 0,
      transportation_budget: transportation_budget_global !== null ? transportation_budget_global : 0,
      other_budget: other_budget_global !== null ? other_budget_global : 0
    });

    setPieData([
      {
        "id": "Rental",
        "label": "Rental",
        "value": rental_budget_global,
        "color": "hsl(160, 70%, 50%)"
      },
      {
        "id": "Food",
        "label": "Food",
        "value": food_budget_global,
        "color": "hsl(333, 70%, 50%)"
      },
      {
        "id": "Gym",
        "label": "Gym",
        "value": gym_budget_global,
        "color": "hsl(127, 70%, 50%)"
      },
      {
        "id": "Transportation",
        "label": "Transportation",
        "value": transportation_budget_global,
        "color": "hsl(297, 70%, 50%)"
      },
      {
        "id": "Other",
        "label": "Other",
        "value": other_budget_global,
        "color": "hsl(297, 70%, 50%)"
      }
    ])
  }, [budget_global, rental_budget_global, food_budget_global, gym_budget_global, transportation_budget_global, other_budget_global]);

  const handleUpdate = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const token = Cookies.get("csrftoken");

    const updateUserProfile = async () => {
      await updateProfile(
        budget,
        rental_budget,
        food_budget,
        gym_budget,
        transportation_budget,
        other_budget,
        token
      );
      setProfileUpdated(!profileUpdated);
    }

    updateUserProfile();

  };

  const getTotalBudget = (): number => {
    if(rental_budget && food_budget && gym_budget && transportation_budget && other_budget) {
        return parseFloat(rental_budget?.toString()) + parseFloat(food_budget?.toString()) +
          parseFloat(gym_budget?.toString()) + parseFloat(transportation_budget?.toString()) + 
          parseFloat(other_budget?.toString());
    }
    return 0;
  }

  const getBudgetLogic = () => {
      if(rental_budget && food_budget && gym_budget && transportation_budget && other_budget) {
          const calculatedTotal = parseFloat(rental_budget?.toString()) + parseFloat(food_budget?.toString()) +
            parseFloat(gym_budget?.toString()) + parseFloat(transportation_budget?.toString()) + 
            parseFloat(other_budget?.toString());

          if(calculatedTotal > budget_global) {
            return (
              <Text size="h4" align="center"> You are over budget by <Text size="h4" align="center" color="error">
                ${calculatedTotal - budget_global}
              </Text></Text>
            );
          } else if (calculatedTotal < budget_global) {
            return (
              <Text size="h4" align="center"> You are under budget by <Text size="h4" align="center" color="success">
                ${budget_global - calculatedTotal}
              </Text></Text>
            );
          } 
          return (
            <Text size="h4" align="center" color="success"> You are on budget! </Text>
          )
      }
  }

  // if (isAuthenticated) {
  //   return <Redirect to="/profile" />;
  // } else {
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
        {getBudgetLogic()}
        <PieWrapper>
        <ResponsivePie
          data={pieData}
          margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
          innerRadius={0.5}
          padAngle={0.7}
          cornerRadius={3}
          colors={{ scheme: 'nivo' }}
          borderWidth={1}
          borderColor={{ from: 'color', modifiers: [ [ 'darker', 0.2 ] ] }}
          radialLabelsSkipAngle={10}
          radialLabelsTextColor="#333333"
          radialLabelsLinkColor={{ from: 'color' }}
          sliceLabelsSkipAngle={10}
          sliceLabelsTextColor="#333333"
          defs={[
              {
                  id: 'dots',
                  type: 'patternDots',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  size: 4,
                  padding: 1,
                  stagger: true
              },
              {
                  id: 'lines',
                  type: 'patternLines',
                  background: 'inherit',
                  color: 'rgba(255, 255, 255, 0.3)',
                  rotation: -45,
                  lineWidth: 6,
                  spacing: 10
              }
          ]}
          fill={[
              {
                  match: {
                      id: 'Rental'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'Transportation'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'Food'
                  },
                  id: 'dots'
              },
              {
                  match: {
                      id: 'Gym'
                  },
                  id: 'lines'
              },
              {
                  match: {
                      id: 'Other'
                  },
                  id: 'lines'
              }
          ]}
          legends={[
              {
                  anchor: 'bottom',
                  direction: 'column',
                  justify: false,
                  translateX: 0,
                  translateY: 56,
                  itemsSpacing: 5,
                  itemWidth: 100,
                  itemHeight: 18,
                  itemTextColor: '#999',
                  itemDirection: 'left-to-right',
                  itemOpacity: 1,
                  symbolSize: 18,
                  symbolShape: 'circle',
                  effects: [
                      {
                          on: 'hover',
                          style: {
                              itemTextColor: '#000'
                          }
                      }
                  ]
              }
          ]}
      />
        </PieWrapper>
        <ModalContainer>
          <SModal
            childComponent={(
              <Form>
                {/* <Text color="primary">Your Budget Plan:</Text> */}
                <SHeading color="primary">Update Your Budget Plan:</SHeading>
                <Text color="primary">Overall Budget</Text>
                <Input
                  placeholder={budget_global?.toString()}
                  type="number"
                  min="0.00"
                  value={budget?.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
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
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setFormData({
                      ...formData,
                      transportation_budget: parseFloat(e.target.value.trim()),
                    });
                  }}
                />
                <Text color="primary">Other Budget</Text>
                <Input
                  placeholder={other_budget_global?.toString()}
                  type="number"
                  min="0"
                  value={other_budget?.toString()}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
                    setFormData({
                      ...formData,
                      other_budget: parseFloat(e.target.value.trim()),
                    });
                  }}
                />
                <Button style={{ marginTop: '30px' }} onClick={handleUpdate}>
                  Update Profile
                </Button>
              </Form>
            )}
          >
            Update budget 
          </SModal>
        </ModalContainer>
      </Container>
    </PageLayout>
  );
  // }
};

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
    ${media("1034",
    `
        height: 450px;
        width: 300px;
        margin-bottom: 40px;
    `)};
`;

const mapStateToProps = (state: any) => ({
  budget_global: state.profile.budget,
  rental_budget_global: state.profile.rental_budget,
  food_budget_global: state.profile.food_budget,
  gym_budget_global: state.profile.gym_budget,
  transportation_budget_global: state.profile.transportation_budget,
  other_budget_global: state.profile.other_budget,
});

export default connect(mapStateToProps, { updateProfile })(Profile);
