import React from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "48px",
  borderBottom: "1px solid black",
  backgroundColor: "yellow",
  width: "calc(100% - 326px)",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 15px",
  border: "none",
});

const AppBar = () => {
  return <MainContainer></MainContainer>;
};

export default AppBar;
