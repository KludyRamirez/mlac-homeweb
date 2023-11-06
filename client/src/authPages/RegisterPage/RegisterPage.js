import React, { useState, useEffect } from "react";
import { ResponsiveDrawer } from "../../Admin/AdminDashboard/SideBar/SideBar";
import RegisterPageInputs from "./RegisterPageInputs";
import { validateRegisterForm } from "../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import EditUser from "../../Admin/AdminDashboard/UserPages/AllUser";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#ffffff",
});

const CreateUserContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "80px 20px",
  flexWrap: "wrap",
  width: "100%",
});

const RegisterPage = ({ register }) => {
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [isFormValid, setIsFormValid] = useState("");

  useEffect(() => {
    setIsFormValid(
      validateRegisterForm({ firstname, lastname, password, username, role })
    );
  }, [firstname, lastname, password, username, role, setIsFormValid]);

  const handleRegister = () => {
    const userDetails = {
      firstname,
      lastname,
      password,
      username,
      role,
    };

    register(userDetails, history);
    setUsername("");
    setFirstname("");
    setLastname("");
    setPassword("");
    setRole("");
    // window.location.reload();
  };

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <CreateUserContainer>
        <RegisterPageInputs
          firstname={firstname}
          setFirstname={setFirstname}
          lastname={lastname}
          setLastname={setLastname}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          role={role}
          setRole={setRole}
          isFormValid={isFormValid}
          handleRegister={handleRegister}
        />
        <EditUser />
      </CreateUserContainer>
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(RegisterPage);
