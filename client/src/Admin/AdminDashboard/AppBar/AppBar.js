import React from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "60px",
  backgroundColor: "#ffffff",
  width: "calc(100% - 90px)",
  alignItems: "center",
  padding: "0px 15px",
  border: "none",
  display: "flex",
  justifyContent: "center",
});

const AppBar = () => {
  return <MainContainer></MainContainer>;
};

export default AppBar;
