import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

import axios from "axios";
import CreateScheduleForm from "./CreateScheduleForm";

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

const initialState = {
  nameOfStudent: "",
  // images: [],

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
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  day: "",
  parents: [],
  parent: "",
  schedTypes: ["Permanent"],
  schedType: "Permanent",
  studentTypes: ["Solo", "Dyad"],
  studentType: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateSchedule = () => {
  const [values, setValues] = useState(initialState);
  const auth = useSelector(authSelector);

  useEffect(() => {
    getParents();
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
      setValues({ ...values, parents: res.data });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
    try {
      if (!auth.userDetails.token) {
        // Handle the case where the token is missing
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.post(`${process.env.REACT_APP_API}/schedule`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      console.log(res);
      window.alert(`"${res.data.title}" is created`);
      window.location.reload();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleParentChange = (e) => {
    e.preventDefault();
    console.log("CLICKED Parent", e.target.value);
    setValues({ ...values, parent: e.target.value });
  };

  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <CreateScheduleContainer>
        <CreateScheduleForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setValues={setValues}
          values={values}
          handleParentChange={handleParentChange}
        />
      </CreateScheduleContainer>
    </Wrapper>
  );
};

export default CreateSchedule;
