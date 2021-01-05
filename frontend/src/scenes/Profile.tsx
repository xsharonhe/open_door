import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { PageLayout } from "../components/hoc/PageLayout";
import { Key } from "@styled-icons/boxicons-solid/Key";
import { Text } from "../components/Texts";
import { Input } from "../components/Inputs";
import { Button } from "../components/Containers";
import { Container, IconDiv, Icon, Form } from "../components/Containers/Form";
import { updateProfile } from "../store/actions/profileActions";
import { connect } from "react-redux";
import Cookies from "js-cookie";

interface IProfile {
  updateProfile: Function;
  budget: Number;
  rental_budget: Number;
  food_budget: Number;
  gym_budget: Number;
  transportation_budget: Number;
  other_budget: Number;
  budget_global: Number;
  rental_budget_global: Number;
  food_budget_global: Number;
  gym_budget_global: Number;
  transportation_budget_global: Number;
  other_budget_global: Number;
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

  useEffect(() => {
    setFormData({
      budget: budget_global !== null ? budget_global : 0,
      rental_budget: rental_budget_global !== null ? rental_budget_global : 0,
      food_budget: food_budget_global !== null ? food_budget_global : 0,
      gym_budget: gym_budget_global !== null ? gym_budget_global : 0,
      transportation_budget: transportation_budget_global !== null ? transportation_budget_global : 0,
      other_budget: other_budget_global !== null ? other_budget_global : 0
    });
  }, [budget_global]);

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

  // if (isAuthenticated) {
  //   return <Redirect to="/profile" />;
  // } else {
  return (
    <PageLayout {...props}>
      <Container>
        <IconDiv>
          <Icon as={Key} />
        </IconDiv>
        <Text size="h3" color="primary" align="center" bold>
          User Profile
        </Text>
        <Form>
          {/* <Text color="primary">Your Budget Plan:</Text> */}
          {/* <Text color="primary">Update Budget Plan:</Text> */}
          <Text color="primary">Overall Budget</Text>
          <Input
            placeholder={budget_global?.toString()}
            type="number"
            min="0"
            value={budget?.toString()}
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void => {
              setFormData({
                ...formData,
                budget: parseInt(e.target.value.trim()),
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
                rental_budget: parseInt(e.target.value.trim()),
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
                gym_budget: parseInt(e.target.value.trim()),
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
                food_budget: parseInt(e.target.value.trim()),
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
                transportation_budget: parseInt(e.target.value.trim()),
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
                other_budget: parseInt(e.target.value.trim()),
              });
            }}
          />
          <Button onClick={handleUpdate}>Update Profile</Button>
        </Form>
      </Container>
    </PageLayout>
  );
  // }
};

const mapStateToProps = (state: any) => ({
  budget_global: state.profile.budget,
  rental_budget_global: state.profile.rental_budget,
  food_budget_global: state.profile.food_budget,
  gym_budget_global: state.profile.gym_budget,
  transportation_budget_global: state.profile.transportation_budget,
  other_budget_global: state.profile.other_budget,
});

export default connect(mapStateToProps, { updateProfile })(Profile);
