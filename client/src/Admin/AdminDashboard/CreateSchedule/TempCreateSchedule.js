import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";

import axios from "axios";
import TempCreateScheduleForm from "./TempCreateScheduleForm";
import AllSchedule from "../AllSchedule/AllSchedule";

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
  nameOfStudents: [],
  nameOfStudent: "",
  dateTime: "",
  schedTypes: ["Temporary"],
  schedType: "Temporary",
  permanentScheds: [],
  permanentSched: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const TempCreateSchedule = () => {
  const [values, setValues] = useState(initialState);
  const auth = useSelector(authSelector);

  useEffect(() => {
    getSchedules();
  }, []);

  const getSchedules = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.get(`${process.env.REACT_APP_API}/schedule`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setValues({
        ...values,
        permanentScheds: res.data,
        nameOfStudents: res.data,
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
      window.alert(`"${res.data.nameOfStudent}" is created`);
      window.location.reload();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handlePermanentChange = (e) => {
    e.preventDefault();
    setValues({ ...values, permanentSched: e.target.value });
  };

  const handleNameOfStudentChange = (e) => {
    e.preventDefault();
    setValues({ ...values, nameOfStudent: e.target.value });
  };

  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <TempCreateScheduleContainer>
        <TempCreateScheduleForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handlePermanentChange={handlePermanentChange}
          handleNameOfStudentChange={handleNameOfStudentChange}
          setValues={setValues}
          values={values}
        />
        <AllSchedule />
      </TempCreateScheduleContainer>
    </Wrapper>
  );
};

export default TempCreateSchedule;
