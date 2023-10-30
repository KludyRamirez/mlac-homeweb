import React from "react";
import { styled } from "@mui/system";
import TopBar from "../Admin/AdminDashboard/AppBar/AppBar";
import { ResponsiveDrawer } from "../Admin/AdminDashboard/SideBar/SideBar";

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

const Dashboard = () => {
  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <ChatCon></ChatCon>
    </Wrapper>
  );
};

export default Dashboard;
