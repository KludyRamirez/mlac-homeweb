import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import TopBar from "../Admin/AdminDashboard/AppBar/AppBar";
import { ResponsiveDrawer } from "../Admin/AdminDashboard/SideBar/SideBar";
import { connect } from "react-redux";
import { getActions } from "../store/actions/authActions";
import { connectWithSocketServer } from "../realtimeCommunication/socketConnection";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundColor: "#FAFAFA",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});

const ChatCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: "#FAFAFA",
  padding: "40px 10px",
  marginTop: "30px",
});

const Chat = ({ setUserDetails }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      window.location.pathname = "login";
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, []);

  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <ChatCon></ChatCon>
    </Wrapper>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(Chat);
