import React, { useState, useEffect } from "react";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import { validateWaitListForm } from "../../../shared/utils/validators";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { styled } from "@mui/material/styles";
import WaitlistExternalChild from "./WaitlistExternalChild";

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

const WaitlistExternal = ({ waitlist }) => {
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
  }, [firstname, lastname, username, mail, phone, setIsFormValid]);

  const handleWaitList = async () => {
    const userDetails = {
      firstname,
      lastname,
      username,
      mail,
      phone,
    };

    await waitlist(userDetails, history);
    setUsername("");
    setFirstname("");
    setLastname("");
    setMail("");
    setPhone("");
    // window.location.reload();

    console.log("---->", userDetails);
  };

  return (
    <CreateWaitListUserContainer>
      <Flexer>
        <WaitlistExternalChild
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
      </Flexer>
    </CreateWaitListUserContainer>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(WaitlistExternal);
