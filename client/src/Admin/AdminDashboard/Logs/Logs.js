import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import AllSchedule from "../AllSchedule/AllSchedule";
import Modal from "@mui/material/Modal";
import LogsCon from "./LogsCon";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#ffffff",
});

const CreateScheduleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowY: "scroll",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "30px",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "58px",
  fontWeight: "700",
  letterSpacing: "-2px",

  "@media (max-width: 767px)": {
    fontSize: "48px",
  },
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  gap: "56px",
  paddingTop: "24px",

  "@media (max-width: 767px)": {
    gap: "10px",
    justifyContent: "flex-start",
  },
});

const FormCon1 = styled("div")({
  width: "30%",
  "@media (max-width: 767px)": {
    width: "100%",
  },
});

const FormCon2 = styled("div")({
  width: "70%",
  "@media (max-width: 767px)": {
    width: "fit-content",
  },
});

const Logs = () => {
  return (
    <Wrapper>
      <ResponsiveDrawer />
      <CreateScheduleContainer>
        <TitleCon>
          <FormTitle>Logs</FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon2>
            <LogsCon />
          </FormCon2>
        </Flexer>
      </CreateScheduleContainer>
    </Wrapper>
  );
};

export default Logs;
