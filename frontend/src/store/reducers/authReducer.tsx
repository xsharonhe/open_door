import {
  SIGNUP_SUCCESS,
  SIGNUP_ERR,
  SIGNIN_SUCCESS,
  SIGNIN_ERR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERR,
  AUTH_SUCCESS,
  AUTH_ERR,
} from "../actions/actionTypes";

const initState = {
  isAuthenticated: null,
  username: 0,
  budget: 0,
  rental_budget: 0,
  food_budget: 0,
  gym_budget: 0,
  transportation_budget: 0,
  other_budget: 0,
  fav_rental_id: "",
  fav_food_id: "",
};

// FIXME: type action
const authReducer = (state = initState, action: any) => {
  const { type, payload } = action;

  switch (type) {

    case AUTH_SUCCESS:
    case AUTH_ERR:
      return {
        ...state,
        isAuthenticated: payload
      }

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
      };

    case SIGNIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        username: payload,
      };

    case SIGNOUT_SUCCESS:
      return {
        ...state,
        isAuthenticated: false,
        username: "",
      };

    case SIGNUP_ERR:
    case SIGNIN_ERR:
    case SIGNOUT_ERR:
      return state;

    default:
      return state;
  }
};

export default authReducer;
