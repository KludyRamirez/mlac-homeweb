import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";

import TempCreateScheduleForm from "./TempCreateScheduleForm";
import TempSchedule from "../AllSchedule/TempSchedule";
import IndTempCreateSchedule from "./IndTempCreateSchedule";

import { BsBlockquoteLeft } from "react-icons/bs";
import dots from "../../../images/dots.webp";

const Dots = styled("div")({
  background: "#F0FFFf",
});

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage: `url(${dots})`,
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
  alignItems: "center",
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

const NextRoundButton = styled("button")({
  padding: "0",
  border: "none",
  background: "rgba(7, 187, 255, 0.1)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "40px",
  height: "38px",
  borderRadius: "12px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(-3px)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const TempCreateSchedule = () => {
  const [values, setValues] = useState(initialState);
  const [showDiv, setShowDiv] = useState(true);
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

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <Dots>
      <Wrapper>
        <ResponsiveDrawer />
        <TempCreateScheduleContainer>
          <TitleCon>
            <FormTitle>Temp Schedule</FormTitle>
            <NextRoundButton onClick={toggleDiv}>
              <BsBlockquoteLeft
                style={{ fontSize: "18px", color: "#122c8e" }}
              />
            </NextRoundButton>
          </TitleCon>
          <Flexer>
            <FormCon1>
              {showDiv ? (
                <TempCreateScheduleForm
                  handleSubmit={handleSubmit}
                  handleChange={handleChange}
                  handlePermanentChange={handlePermanentChange}
                  handleNameOfStudentChange={handleNameOfStudentChange}
                  handleTempSoloDayChange={handleTempSoloDayChange}
                  setValues={setValues}
                  values={values}
                />
              ) : (
                <IndTempCreateSchedule />
              )}
            </FormCon1>
            <FormCon2>
              <TempSchedule />
            </FormCon2>
          </Flexer>
        </TempCreateScheduleContainer>
      </Wrapper>
    </Dots>
  );
};

export default TempCreateSchedule;
