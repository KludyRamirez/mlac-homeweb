import React from "react";
import { styled } from "@mui/material/styles";

const SaturdayWrapper = styled("div")({
  width: "255px",
  height: "100%",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "inherit",
  height: "inherit",
});

const Permanent = styled("div")({
  height: "91%",
  width: "30%",
  display: "flex",
  justifyContent: "flex-start",
});

const Temporary = styled("div")({
  height: "91%",
  width: "60%",
  border: "1px solid black",
  display: "flex",
  justifyContent: "flex-start",
});

const FormTitle = styled("h2")({
  margin: "10px 0px 10px 0px",
  backgroundColor: "#007bff",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const Saturday = () => {
  return (
    <SaturdayWrapper>
      <FormTitle>
        <span>Saturday</span>
      </FormTitle>
      <Flexer>
        <Permanent></Permanent>
        <Temporary></Temporary>
      </Flexer>
    </SaturdayWrapper>
  );
};

export default Saturday;
