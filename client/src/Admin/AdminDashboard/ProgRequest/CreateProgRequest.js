import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import CreateProgRequestForm from "./CreateProgRequestForm";
import ProgressReportTable from "../AllSchedule/ProgressReportTable";
import TopBar from "../AppBar/AppBar";
import moment from "moment";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
});

const CreateProgRequestContainer = styled("div")({
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
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "34px 38px 20px 38px",
  color: "#f7fff7",
  textShadow:
    "-1px -1px 1px rgba(255, 255, 255, 1), 1px 1px 1px rgba(0, 0, 0, 0.2)",
  fontSize: "32px",
  fontWeight: "400",
  letterSpacing: "-0.2px",

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
  nameOfStudents: [],
  nameOfStudent: "",
  dateTime: formattedTomorrow,
  statuses: ["Pending", "Overdue", "Completed"],
  status: "Pending",
  day: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateProgRequest = () => {
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
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/progrep`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success(`Progress report has been requested.`);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error.");
      }
    }
  };

  const handleNameOfStudentChange = (e) => {
    e.preventDefault();
    setValues({ ...values, nameOfStudent: e.target.value });
  };

  const handleDayChange = (newSelectedDate) => {
    const dateObj = new Date(newSelectedDate);
    const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
    console.log("-------------------------------------->", dateObj);
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
      <CreateProgRequestContainer>
        <TitleCon>
          <FormTitle>Progress Report</FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon1>
            <CreateProgRequestForm
              handleSubmit={handleSubmit}
              handleDayChange={handleDayChange}
              handleNameOfStudentChange={handleNameOfStudentChange}
              values={values}
            />
          </FormCon1>
          <FormCon2>
            <ProgressReportTable />
          </FormCon2>
        </Flexer>
      </CreateProgRequestContainer>
    </Wrapper>
  );
};

export default CreateProgRequest;
