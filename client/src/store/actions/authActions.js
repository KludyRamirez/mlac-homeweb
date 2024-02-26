import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    register: (userDetails, history) =>
      dispatch(register(userDetails, history)),
    waitlist: (userDetails, history) =>
      dispatch(waitlist(userDetails, history)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
    refreshToken: (userDetails) => dispatch(refreshToken(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      const { userDetails } = response?.data;
      localStorage.setItem("user", JSON.stringify(userDetails));
      dispatch(setUserDetails(userDetails));
      history.push("/timetable");
    }
  };
};

const register = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    console.log(response);
    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Details Successfully Submitted!"));
      history.push("/timetable");
    }
  };
};

const waitlist = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.waitlist(userDetails);
    console.log(response);

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Details Successfully Submitted!"));
      history.push("/waitlist");
    }
  };
};

const refreshToken = (userDetails) => {
  return async (dispatch) => {
    try {
      const response = await api.refreshToken(userDetails);
      if (!response.error) {
        const { userDetails } = response.data;
        localStorage.setItem("user", JSON.stringify(userDetails));
        dispatch(setUserDetails(userDetails));
      } else {
        console.error("Token refresh failed:", response.error);
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  };
};
