import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import TempSoloCreateSchedForm from "./TempSoloCreateSchedForm";
import TempSoloSchedule from "../AllSchedule/TempSoloSchedule";
import TopBar from "../AppBar/AppBar";
import moment from "moment-timezone";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
});

const TempCreateScheduleContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  width: "100%",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowX: "scroll",
    overflowY: "scroll",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "34px 38px 20px 38px",
  color: "#f7fff7",
  textShadow:
    "-1px -1px 1px rgba(255, 255, 255, 1), 1px 1px 1px rgba(0, 0, 0, 0.2)",
  fontSize: "32px",
  fontWeight: "700",
  letterSpacing: "-0.4px",

  "&:hover": {
    backgroundImage:
      "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
    backgroundSize: "100%",
    backgroundRepeat: "repeat",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    MozBackgroundClip: "text",
    MozTextFillColor: "transparent",
    textShadow: "none",
  },

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
  gap: "48px",
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
  width: "62%",
  "@media (max-width: 767px)": {
    width: "fit-content",
  },
});

const tomorrow = moment().add(1, "day");

if (tomorrow.day() === 0) {
  tomorrow.add(1, "day");
}

const formattedTomorrow = tomorrow.format("YYYY-MM-DD");

const initialState = {
  tempStudentNames: [],
  tempStudentName: "",
  dateTime: formattedTomorrow,
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
  const [currentDate, setCurrentDate] = useState("");
  const auth = useSelector(authSelector);

  useEffect(() => {
    const today = moment().tz("Asia/Manila").format("YYYY-MM-DD");
    setCurrentDate(today);
    console.log(currentDate);
  }, []);

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

  const handleTempSoloDayChange = (newSelectedDate) => {
    const dateObj = new Date(newSelectedDate);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

    if (dayOfWeek === "Sunday") {
      toast.error("Closed on Sundays");
    } else {
      setValues({
        ...values,
        dateTime: newSelectedDate,
        day: dayOfWeek,
      });
    }
  };

  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <TempCreateScheduleContainer>
        <TitleCon>
          <FormTitle>Create Schedule</FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon1>
            <TempSoloCreateSchedForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
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
