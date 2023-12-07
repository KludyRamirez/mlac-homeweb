import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import WelcomeMessage from "./WelcomeMessage";
import MessengerContentNew from "./MessengerContentNew";
import TopBar from "../../Admin/AdminDashboard/AppBar/AppBar";
import { ResponsiveDrawer } from "../../Admin/AdminDashboard/SideBar/SideBar";

const MainContainer = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundColor: "green",
  display: "flex",
});

const Messenger = ({ chosenChatDetails }) => {
  return (
    <MainContainer>
      <TopBar />
      <ResponsiveDrawer />
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContentNew chosenChatDetails={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chat }) => {
  return {
    ...chat,
  };
};

export default connect(mapStoreStateToProps)(Messenger);
