import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { toast } from "react-toastify";
import axios from "axios";
import IndTempCreateScheduleForm from "./IndTempCreateScheduleForm";
import moment from "moment";

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
  schedTypes: ["Temporary"],
  schedType: "Temporary",
  studentTypes: ["Dyad"],
  studentType: "Dyad",
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

const IndTempCreateSchedule = ({ toggleDiv }) => {
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
    <IndTempCreateScheduleForm
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleNameOfStudentChange={handleNameOfStudentChange}
      handleTempSoloDayChange={handleTempSoloDayChange}
      setValues={setValues}
      values={values}
      toggleDiv={toggleDiv}
    />
  );
};

export default IndTempCreateSchedule;
