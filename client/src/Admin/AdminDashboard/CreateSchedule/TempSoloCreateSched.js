import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";

import axios from "axios";
import TempCreateScheduleForm from "./TempCreateScheduleForm";

import TempSchedule from "../AllSchedule/TempSchedule";
import TempSoloCreateSchedForm from "./TempSoloCreateSchedForm";
import TempSoloSchedule from "../AllSchedule/TempSoloSchedule";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#ffffff",
});

const TempCreateScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "80px 20px",
  flexWrap: "wrap",
  width: "100%",
});

const initialState = {
  tempStudentNames: [],
  tempStudentName: "",
  dateTime: "",
  tempSoloDay: "",
  schedTypes: ["Temporary"],
  schedType: "Temporary",
  //   permanentScheds: [],
  //   permanentSched: "",
  timings: [
    "7 AM to 8 AM",
    "8 AM to 9 AM",
    "9 AM to 10 AM",
    "10 AM to 11 AM",
    "11 AM to 12 NN",
    "12 NN to 1 PM",
    "1 PM to 2 PM",
    "2 PM to 3 PM",
    "3 PM to 4 PM",
    "4 PM to 5 PM",
  ],
  timing: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const TempSoloCreateSched = () => {
  const [values, setValues] = useState(initialState);
  const auth = useSelector(authSelector);

  useEffect(() => {
    getTempSchedules();
  }, []);

  const getTempSchedules = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.get(
        `${process.env.REACT_APP_API}/temp-schedule`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setValues({
        ...values,
        permanentScheds: res.data,
        tempStudentNames: res.data,
      });
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        // Handle the case where the token is missing
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/temp-schedule`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      console.log(res);
      window.location.reload();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  //   const handlePermanentChange = (e) => {
  //     e.preventDefault();
  //     setValues({ ...values, permanentSched: e.target.value });
  //   };

  const handleNameOfStudentChange = (e) => {
    e.preventDefault();
    setValues({ ...values, tempStudentName: e.target.value });
  };

  const handleTempSoloDayChange = (e) => {
    e.preventDefault();
    const newDateTime = e.target.value;
    const dateObj = new Date(newDateTime);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    setValues({ ...values, dateTime: newDateTime, tempSoloDay: dayOfWeek });
  };

  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <TempCreateScheduleContainer>
        <TempSoloCreateSchedForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          //   handlePermanentChange={handlePermanentChange}
          handleNameOfStudentChange={handleNameOfStudentChange}
          handleTempSoloDayChange={handleTempSoloDayChange}
          setValues={setValues}
          values={values}
        />
        <TempSoloSchedule />
      </TempCreateScheduleContainer>
    </Wrapper>
  );
};

export default TempSoloCreateSched;
