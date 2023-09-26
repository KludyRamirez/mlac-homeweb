import React from "react";
import { styled } from "@mui/material/styles";

const FridayWrapper = styled("div")({
  width: "255px",
  height: "77vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Permanent = styled("div")({
  borderRight: "1px solid #B6D0E2",
  height: "95%",
  width: "45%",
});
const Temporary = styled("div")({
  height: "95%",
  width: "45%",
});

const Friday = () => {
  return (
    <FridayWrapper>
      <Permanent></Permanent>
      <Temporary></Temporary>
    </FridayWrapper>
  );
};

export default Friday;
