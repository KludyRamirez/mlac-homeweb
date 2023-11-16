import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
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
  alignItems: "center",
  width: "100%",
  gap: "8px",
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
  width: "fit-content",
  "@media (max-width: 767px)": {
    width: "fit-content",
  },
});

const initialState = {
  tempStudentNames: [],
  tempStudentName: "",
  dateTime: "",
  tempSoloDay: "",
  day: "",
  schedTypes: ["Temporary"],
  schedType: "Temporary",
  timings: [
    "8 AM to 9 AM",
    "9 AM to 10 AM",
    "10 AM to 11 AM",
    "11 AM to 12 NN",
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
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/temp-soloschedule`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success("Solo temporary account is created.");
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
      day: dayOfWeek,
    });
  };

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <TempCreateScheduleContainer>
        <TitleCon>
          <FormTitle>Solo Schedule</FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon1>
            <TempSoloCreateSchedForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              //   handlePermanentChange={handlePermanentChange}
              handleNameOfStudentChange={handleNameOfStudentChange}
              handleTempSoloDayChange={handleTempSoloDayChange}
              setValues={setValues}
              values={values}
            />
          </FormCon1>
          <FormCon2>
            <TempSoloSchedule />
          </FormCon2>
        </Flexer>
      </TempCreateScheduleContainer>
    </Wrapper>
  );
};

export default TempSoloCreateSched;
