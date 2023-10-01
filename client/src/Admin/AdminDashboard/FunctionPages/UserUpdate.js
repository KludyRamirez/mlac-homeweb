import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import SideBar from "../SideBar/SideBar";
import EditUser from "./AllUser";
import UserUpdateForm from "./UserUpdateForm";
// import { validateRegisterForm } from "../../../shared/utils/validators";

import axios from "axios";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#ffffff",
});

const UpdateUserContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "80px 20px",
  flexWrap: "wrap",
  width: "100%",
});

const initialState = {
  username: "",
  firstname: "",
  lastname: "",
  password: "",
  roles: ["Parent", "Therapist", "Administrator"],
  role: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const UpdateUserPage = () => {
  const [values, setValues] = useState(initialState);
  // const [isFormValid, setIsFormValid] = useState("");
  const { id } = useParams();

  const auth = useSelector(authSelector);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.get(`${process.env.REACT_APP_API}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setValues({ ...values, ...res.data });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `${process.env.REACT_APP_API}/user/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );

      console.log(res.data);
      window.alert(`"${values.username}" is updated`);
      // window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    setValues({ ...values, role: e.target.value });
  };

  return (
    <Wrapper>
      <SideBar />
      <UpdateUserContainer>
        <UserUpdateForm
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleRadioChange={handleRadioChange}
          setValues={setValues}
          values={values}
          // isFormValid={isFormValid}
        />
        <EditUser />
      </UpdateUserContainer>
    </Wrapper>
  );
};

export default UpdateUserPage;
