import React from "react";
import { styled } from "@mui/material/styles";

const MondayWrapper = styled("div")({
  width: "255px",
  height: "77vh",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

const Permanent = styled("div")({
  borderRight: "1px solid #B6D0E2",
  height: "93%",
  width: "30%",
  display: "flex",
  justifyContent: "flex-start",
});

const Temporary = styled("div")({
  height: "93%",
  width: "60%",
});

const FormTitle = styled("h2")({
  margin: "0px",
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

const Monday = () => {
  return (
    <MondayWrapper>
      <FormTitle>
        <span>Monday</span>
      </FormTitle>

      <Flexer>
        <Permanent></Permanent>
        <Temporary></Temporary>
      </Flexer>
    </MondayWrapper>
  );
};

export default Monday;
