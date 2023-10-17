import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import SideBar from "../SideBar/SideBar";

import axios from "axios";
import TempCreateScheduleForm from "./TempCreateScheduleForm";

import TempSchedule from "../AllSchedule/TempSchedule";

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

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
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
  permanentScheds: [],
  permanentSched: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const TempCreateSchedule = () => {
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

      const res = await axios.get(`${process.env.REACT_APP_API}/schedule`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
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
      toast.success("Temporary account is created.");
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error.");
      }
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
    setValues({ ...values, tempStudentName: e.target.value });
  };

  const handleTempSoloDayChange = (e) => {
    e.preventDefault();
    const newDateTime = e.target.value;
    const dateObj = new Date(newDateTime);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    setValues({
      ...values,
      dateTime: newDateTime,
      tempSoloDay: dayOfWeek,
    });
  };

  return (
    <Wrapper>
      <SideBar />
      <TempCreateScheduleContainer>
        <TempCreateScheduleForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handlePermanentChange={handlePermanentChange}
          handleNameOfStudentChange={handleNameOfStudentChange}
          handleTempSoloDayChange={handleTempSoloDayChange}
          setValues={setValues}
          values={values}
        />
        <TempSchedule />
      </TempCreateScheduleContainer>
    </Wrapper>
  );
};

export default TempCreateSchedule;
