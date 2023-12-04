import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import TopBar from "../AppBar/AppBar";
import UserUpdateForm from "./UserUpdateForm";
import AllUser from "./AllUser";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
});

const UpdateUserContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowY: "scroll",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "34px 38px 20px 38px",
  color: "#f7fff7",
  textShadow:
    "-1px -1px 1px rgba(255, 255, 255, 1), 1px 1px 1px rgba(0, 0, 0, 0.2)",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "-0.4px",

  "&:hover": {
    backgroundImage:
      "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
    textShadow: "none",
  },

  "@media (max-width: 767px)": {
    fontSize: "48px",
  },
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  gap: "48px",
  paddingTop: "24px",

  "@media (max-width: 767px)": {
    gap: "10px",
    justifyContent: "flex-start",
  },
});

const FormCon1 = styled("div")({
  width: "30%",
  "@media (max-width: 767px)": {
    width: "100%",
  },
});

const FormCon2 = styled("div")({
  width: "62%",
  "@media (max-width: 767px)": {
    width: "fit-content",
  },
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
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setValues({ ...values, role: e.target.value });
  };

  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <UpdateUserContainer>
        <TitleCon>
          <FormTitle>Edit User</FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon1>
            <UserUpdateForm
              handleSubmit={handleSubmit}
              handleInputChange={handleInputChange}
              handleRoleChange={handleRoleChange}
              setValues={setValues}
              values={values}
            />
          </FormCon1>
          <FormCon2>
            <AllUser />
          </FormCon2>
        </Flexer>
      </UpdateUserContainer>
    </Wrapper>
  );
};

export default UpdateUserPage;
