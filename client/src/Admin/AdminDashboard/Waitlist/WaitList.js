import React, { useState, useEffect } from "react";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import RegisterPageInputs from "../../../authPages/RegisterPage/RegisterPageInputs";
import { validateWaitListForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/alertActions";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import EditUser from "../UserPages/AllUser";
import WaitListInputs from "./WaitListInputs";
import AllSchedule from "../AllSchedule/AllSchedule";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#fafafa",
  backgroundImage:
    "url(data:image/png;base64,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)",
});

const CreateWaitListUserContainer = styled("div")({
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
  padding: "30px",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "56px",
  fontWeight: "700",
  letterSpacing: "-2.5px",

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
  gap: "40px",
  paddingTop: "30px",

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
  width: "56%",
  "@media (max-width: 767px)": {
    width: "fit-content",
  },
});

const WaitList = ({ waitList }) => {
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");

  const [isFormValid, setIsFormValid] = useState("");

  useEffect(() => {
    setIsFormValid(
      validateWaitListForm({ firstname, lastname, username, role, mail })
    );
  }, [firstname, lastname, username, role, mail, setIsFormValid]);

  const handleWaitList = () => {
    const userDetails = {
      firstname,
      lastname,
      username,
      role,
      mail,
    };

    waitList(userDetails, history);
    setUsername("");
    setFirstname("");
    setLastname("");
    setRole("");
    setMail("");
    // window.location.reload();
  };

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <CreateWaitListUserContainer>
        <TitleCon>
          <FormTitle>Waitlist</FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon1>
            <WaitListInputs
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
              mail={mail}
              setMail={setMail}
              isFormValid={isFormValid}
              handleWaitList={handleWaitList}
            />
          </FormCon1>
          <FormCon2>
            <AllSchedule />
          </FormCon2>
        </Flexer>
      </CreateWaitListUserContainer>
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(WaitList);
