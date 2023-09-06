import React from "react";
import { styled } from "@mui/system";

const MainContainer = styled("div")({
  position: "absolute",
  right: "0",
  top: "0",
  height: "60px",
  backgroundColor: "#f9f9f9",
  width: "calc(100% - 105px)",
  alignItems: "center",
  padding: "0px 15px",
  border: "none",
  display: "flex",
  justifyContent: "center",
});
// const LogoContainer = styled("div")({
//   width: "500px",
//   height: "500px",
//   display: "flex",
//   justifyContent: "center",
// });

// const Logo = styled("img")({
//   width: "100%",
//   height: "100%",
// });

const AppBar = () => {
  return (
    <MainContainer>
      {/* <LogoContainer>
        <Logo src={logo} />
      </LogoContainer> */}
    </MainContainer>
  );
};

export default AppBar;
