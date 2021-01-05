import {
  SIGNUP_SUCCESS,
  SIGNUP_ERR,
  SIGNIN_SUCCESS,
  SIGNIN_ERR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERR,
  AUTH_SUCCESS,
  AUTH_ERR,
  DELETE_SUCCESS,
  DELETE_ERR
} from "../actions/actionTypes";

const initState = {
  isAuthenticated: null
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
        isAuthenticated: true
      };

    case SIGNOUT_SUCCESS:
    case DELETE_SUCCESS:
      return {
        ...state,
        isAuthenticated: false
      };

    case SIGNUP_ERR:
    case SIGNIN_ERR:
    case SIGNOUT_ERR:
    case DELETE_ERR:
      return state;

    default:
      return state;
  }
};

export default authReducer;
