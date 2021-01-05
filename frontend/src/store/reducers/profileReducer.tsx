import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_ERR } from "../actions/actionTypes";

const initState = {
  username: "",
  budget: 0,
  rental_budget: 0,
  food_budget: 0,
  gym_budget: 0,
  transportation_budget: 0,
  other_budget: 0,
  //   fav_rental_id: "",
  //   fav_food_id: "",
};

// FIXME: type action
const profileReducer = (state = initState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        username: payload.username,
        budget: payload.profile.budget,
        rental_budget: payload.profile.rental_budget,
        food_budget: payload.profile.food_budget,
        gym_budget: payload.profile.gym_budget,
        transportation_budget: payload.profile.transportation_budget,
        other_budget: payload.profile.other_budget,
      };

    case LOAD_PROFILE_ERR:
      return {
        ...state,
        username: "",
        budget: 0,
        rental_budget: 0,
        food_budget: 0,
        gym_budget: 0,
        transportation_budget: 0,
        other_budget: 0,
      };

    default:
      return state;
  }
};

export default profileReducer;
