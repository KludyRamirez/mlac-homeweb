import axios from "axios";

export const currentUser = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-user`,
    {},
    {
      headers: {
        token,
      },
    }
  );
};

export const currentAdmin = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_API}/current-admin`,
    {},
    {
      headers: {
        token,
      },
    }
  );
};
