import React from "react";
import { styled } from "@mui/system";
import SideBarContent from "./SideBarContent";

const MainContainer = styled("div")({
  width: "62px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",
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
