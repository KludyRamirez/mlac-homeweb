import React from "react";
import { styled } from "@mui/material/styles";

const SaturdayWrapper = styled("div")({
  width: "255px",
  height: "77vh",

  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Permanent = styled("div")({
  borderRight: "1px solid #B6D0E2",
  height: "85%",
  width: "45%",
});
const Temporary = styled("div")({
  height: "85%",
  width: "45%",
});
const Day = styled("div")({
  fontSize: "18px",
  fontWeight: "600",
});

const Saturday = () => {
  return (
    <SaturdayWrapper>
      <Permanent></Permanent>
      <Temporary></Temporary>
    </SaturdayWrapper>
  );
};

export default Saturday;
