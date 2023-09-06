import React from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "#36393f",
  border: "none",
});

const SideBar = () => {
  return <MainContainer></MainContainer>;
};

export default SideBar;
