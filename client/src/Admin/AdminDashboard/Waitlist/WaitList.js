import React, { useState, useEffect } from "react";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import { validateWaitListForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import WaitListInputs from "./WaitListInputs";
import WaitlistSchedule from "../AllSchedule/WaitlistSchedule";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
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
  padding: "34px 0px 20px 38px",
  fontSize: "16px",
  fontWeight: "500",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",

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

const WaitList = ({ waitlist }) => {
  const history = useHistory();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");

  const [isFormValid, setIsFormValid] = useState("");

  useEffect(() => {
    setIsFormValid(
      validateWaitListForm({ firstname, lastname, username, mail, phone })
    );
  }, [firstname, lastname, username, mail, setIsFormValid]);

  const handleWaitList = () => {
    const userDetails = {
      firstname,
      lastname,
      username,
      mail,
      phone,
    };

    waitlist(userDetails, history);
    setUsername("");
    setFirstname("");
    setLastname("");
    setMail("");
    setPhone("");
    // window.location.reload();

    console.log("---->", userDetails);
  };

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <CreateWaitListUserContainer>
        <TitleCon>
          <FormTitle>
            {"<"} Mlac Homeweb <span style={{ fontSize: "12px" }}>/</span>{" "}
          </FormTitle>
          <FormTitle sx={{ paddingLeft: "6px", paddingRight: "0" }}>
            Waitlist
          </FormTitle>
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
              phone={phone}
              setPhone={setPhone}
              isFormValid={isFormValid}
              handleWaitList={handleWaitList}
            />
          </FormCon1>
          <FormCon2>
            <WaitlistSchedule />
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
