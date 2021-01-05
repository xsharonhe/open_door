import axios from "axios";
import {
  LOAD_PROFILE_SUCCESS,
  LOAD_PROFILE_ERR,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERR,
} from "../actions/actionTypes";
import { Dispatch } from "redux";

export const loadProfile = () => async (dispatch: Dispatch<any>) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/user/profile`,
      config
    );

    if (res.data.error) {
      dispatch({
        type: LOAD_PROFILE_ERR,
      });
    } else {
      dispatch({
        type: LOAD_PROFILE_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: LOAD_PROFILE_ERR,
    });
  }
};

export const updateProfile = (
  budget: Number,
  rental_budget: Number,
  food_budget: Number,
  gym_budget: Number,
  transportation_budget: Number,
  other_budget: Number,
  token: any
) => async (dispatch: Dispatch<any>) => {
  const body = JSON.stringify({ 
    withCredentials: true,
    budget,
    rental_budget,
    food_budget,
    gym_budget,
    transportation_budget,
    other_budget
  });

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  try {
    const res = await axios.put(
      `${process.env.REACT_APP_API_URL}/api/v1/user/update`,
      body,
      config
    );

    if (res.data.profile && res.data.username) {
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data,
      });
    } else {
      dispatch({
        type: UPDATE_PROFILE_ERR,
      });
    }
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_ERR,
    });
  }
};
