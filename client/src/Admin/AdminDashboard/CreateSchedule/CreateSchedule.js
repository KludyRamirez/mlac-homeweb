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
      <CreateScheduleContainer>
        <FirstWeekOfMonth />
      </CreateScheduleContainer>
    </Wrapper>
  );
};

export default CreateSchedule;

function getFirstMondayOfMonth(date) {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay();

  if (dayOfWeek === 1) {
    // If the first day is already a Monday, return it.
    return firstDayOfMonth;
  } else {
    // Calculate the number of days to the next Monday.
    const daysUntilMonday = 8 - dayOfWeek + 1;
    const firstMondayOfMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      daysUntilMonday
    );
    return firstMondayOfMonth;
  }
}

function FirstWeekOfMonth() {
  const today = new Date();
  const firstMondayOfMonth = getFirstMondayOfMonth(today);
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  const weekDays = [];

  for (let i = 0; i < 5; i++) {
    const day = new Date(firstMondayOfMonth);
    day.setDate(firstMondayOfMonth.getDate() + i);
    weekDays.push(
      <div key={i}>
        {daysOfWeek[i]} - {day.getDate()}
      </div>
    );
  }

  return (
    <div>
      <h2>First Week of the Month</h2>
      <div>{weekDays}</div>
    </div>
  );
}
