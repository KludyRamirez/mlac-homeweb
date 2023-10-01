import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import { useParams } from "react-router-dom";

import axios from "axios";
import AllSchedule from "../AllSchedule/AllSchedule";
import UpdateScheduleForm from "./UpdateScheduleForm";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#ffffff",
});

const UpdateScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "flex-start",
  padding: "80px 20px",
  flexWrap: "wrap",
  width: "100%",
});

const initialState = {
  nameOfStudent: "",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  day: "",
  parent: "",
  schedTypes: ["Permanent"],
  schedType: "Permanent",
  studentTypes: ["Solo", "Dyad"],
  studentType: "",
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

const UpdateSchedule = () => {
  const [values, setValues] = useState(initialState);
  const [parents, setParents] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const { id } = useParams();

  const auth = useSelector(authSelector);

  useEffect(() => {
    getParents();
    getOneSchedule();
  }, []);

  const getParents = async () => {
    try {
      if (!auth.userDetails.token) {
        // Handle the case where the token is missing
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.get(`${process.env.REACT_APP_API}/user`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setParents(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const getOneSchedule = async () => {
    if (!auth.userDetails.token) {
      // Handle the case where the token is missing
      console.error("Authentication token not found.");
      return;
    }
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/schedule/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setValues({ ...values, ...res.data });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    values.parent = selectedParent ? selectedParent : values.parent;
    try {
      if (!auth.userDetails.token) {
        // Handle the case where the token is missing
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.put(
        `${process.env.REACT_APP_API}/schedule/${id}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      console.log(res);
      window.alert(`"${res.data.nameOfStudent}" is updated`);
      window.location.reload();
    } catch (err) {
      console.error("Error updating schedules:", err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleParentChange = (e) => {
    e.preventDefault();
    console.log("CLICKED Parent", e.target.value);
    setValues({ ...values });

    setSelectedParent(e.target.value);
    if (values.parent._id === e.target.value) {
      getOneSchedule();
    }
  };

  const handleStudentTypeChange = (e) => {
    setValues({ ...values, studentType: e.target.value });
  };

  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <UpdateScheduleContainer>
        <UpdateScheduleForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setValues={setValues}
          values={values}
          handleParentChange={handleParentChange}
          handleStudentTypeChange={handleStudentTypeChange}
          parents={parents}
          selectedParent={selectedParent}
        />
        <AllSchedule />
      </UpdateScheduleContainer>
    </Wrapper>
  );
};

export default UpdateSchedule;
