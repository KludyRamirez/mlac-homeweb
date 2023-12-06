import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import CreateScheduleForm from "./CreateScheduleForm";
import AllSchedule from "../AllSchedule/AllSchedule";
import TopBar from "../AppBar/AppBar";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
});

const CreateScheduleContainer = styled("div")({
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
  padding: "34px 0px 20px 38px",
  fontSize: "16px",
  fontWeight: "500",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",

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
  nameOfStudent: "",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  day: "",
  parents: [],
  parent: "",
  schedTypes: ["Permanent"],
  schedType: "Permanent",
  studentTypes: ["Solo", "Dyad"],
  studentType: "",
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
  notifLocator: "",
  isWaitlisteds: ["No"],
  isWaitlisted: "No",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateSchedule = () => {
  const [values, setValues] = useState(initialState);
  const [inputValue, setInputValue] = useState("");
  const auth = useSelector(authSelector);

  const maxLength = 50;

  useEffect(() => {
    getParents();
  }, []);

  const getParents = async () => {
    try {
      if (!auth.userDetails.token) {
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
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/schedule`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success(`Schedule created!`);
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
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleStudentTypeChange = (e) => {
    setValues({ ...values, studentType: e.target.value });
  };

  const handleParentChange = (e) => {
    e.preventDefault();
    const parentName = e.target.value;
    console.log(parentName);
    setValues({
      ...values,
      parent: parentName,
    });
  };

  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <CreateScheduleContainer>
        <TitleCon>
          <FormTitle>
            {"<"} Create Schedule <span style={{ fontSize: "12px" }}>/</span>{" "}
          </FormTitle>
          <FormTitle sx={{ paddingLeft: "6px", paddingRight: "0" }}>
            Permanent
          </FormTitle>
        </TitleCon>
        <Flexer>
          <FormCon1>
            <CreateScheduleForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              handleParentChange={handleParentChange}
              handleStudentTypeChange={handleStudentTypeChange}
              maxLength={maxLength}
            />
          </FormCon1>
          <FormCon2>
            <AllSchedule />
          </FormCon2>
        </Flexer>
      </CreateScheduleContainer>
    </Wrapper>
  );
};

export default CreateSchedule;
