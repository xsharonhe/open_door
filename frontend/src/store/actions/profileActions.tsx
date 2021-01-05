import axios from "axios";
import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_ERR } from "../actions/actionTypes";
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
