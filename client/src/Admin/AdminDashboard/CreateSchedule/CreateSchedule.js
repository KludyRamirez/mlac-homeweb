import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

import axios from "axios";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  zIndex: "1",
  backgroundColor: "#ffffff",
});

const CreateScheduleContainer = styled("div")({
  flexGrow: 1,
  marginTop: "60px",
  display: "flex",
  border: "none",
  justifyContent: "center",
  alignItems: "center",
});

const CreateSchedule = () => {
  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <CreateScheduleContainer></CreateScheduleContainer>
    </Wrapper>
  );
};

export default CreateSchedule;
