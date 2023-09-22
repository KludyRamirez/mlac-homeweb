import React from "react";
import { styled } from "@mui/system";
import SideBarContent from "./SideBarContent";

const MainContainer = styled("div")({
  width: "60px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#007bff",
  border: "none",
});

const SideBar = () => {
  return (
    <MainContainer>
      <SideBarContent />
    </MainContainer>
  );
};

export default SideBar;
