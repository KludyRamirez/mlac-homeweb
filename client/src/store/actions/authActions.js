import * as api from "../../api";
import { openAlertMessage } from "./alertActions";

export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
  LOGOUT: "AUTH.LOGOUT",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    register: (userDetails) => dispatch(register(userDetails)),
    waitlist: (userDetails, history) =>
      dispatch(waitlist(userDetails, history)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
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
      history.push("/chat");
    }
  };
};

const register = (userDetails) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    console.log(response);

    if (response.error) {
      dispatch(openAlertMessage(response?.exception?.response?.data));
    } else {
      dispatch(openAlertMessage("Account Successfully Created!"));
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
