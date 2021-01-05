import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_ERR,
  SIGNIN_SUCCESS,
  SIGNIN_ERR,
  SIGNOUT_SUCCESS,
  SIGNOUT_ERR,
  AUTH_SUCCESS,
  AUTH_ERR,
} from "./actionTypes";
import { loadProfile } from './profileActions';
import { Dispatch } from "redux";

// FIXME: dispatch type, interface

export const checkAuth = () => async (dispatch: Dispatch<any>) => {
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };

  try {

    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/auth`,
      config
    );

    if (res.data.error || res.data.isAuthenticated === 'error') {
      dispatch({
        type: AUTH_ERR,
        payload: false
      })
    }
    else if (res.data.isAuthenticated === 'success') {
      dispatch({
        type: AUTH_SUCCESS,
        payload: true
      })
    }
    else {
      dispatch({
        type: AUTH_ERR,
        payload: false
      })
    }

  } catch(err) {
    dispatch({
      type: AUTH_ERR,
      payload: false
    })
  }
};

export const signin = (
  username: string,
  password: string,
  token: any,
) => async (dispatch: Dispatch<any>) => {
  const body = JSON.stringify({ username, password });

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/signin`,
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: SIGNIN_SUCCESS
      });

      dispatch(loadProfile());

    } else {
      dispatch({
        type: SIGNIN_ERR,
      });
    }
  } catch (err) {
    dispatch({
      type: SIGNIN_ERR,
    });
  }
};

export const signup = (
  username: string,
  password: string,
  verifyPassword: string,
  token: any
) => async (dispatch: Dispatch<any>) => {
  const body = JSON.stringify({ username, password, verifyPassword });

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/signup`,
      body,
      config
    );

    if (res.data.error) {
      dispatch({
        type: SIGNUP_ERR,
      });
    } else {
      dispatch({
        type: SIGNUP_SUCCESS,
      });
    }
  } catch (err) {
    dispatch({
      type: SIGNUP_ERR,
    });
  }
};

export const signout = (token: any) => async (dispatch: Dispatch<any>) => {
  const body = JSON.stringify({ withCredentials: true });

  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "X-CSRFToken": token,
    },
  };

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/v1/accounts/signout`,
      body,
      config
    );

    if (res.data.success) {
      dispatch({
        type: SIGNOUT_SUCCESS,
      });
    } else {
      dispatch({
        type: SIGNOUT_ERR,
      });
    }
  } catch (err) {
    dispatch({
      type: SIGNOUT_ERR,
    });
  }
};