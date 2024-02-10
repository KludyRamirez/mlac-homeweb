import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { useParams } from "react-router-dom";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import AllSchedule from "../AllSchedule/AllSchedule";
import EditScheduleForm from "./EditScheduleForm";

const Dots = styled("div")({
  background:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
});

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
});

const EditScheduleContainer = styled("div")({
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
  fontWeight: "700",
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

const EditSchedule = () => {
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
  const handleParentChange = (e) => {
    e.preventDefault();
    console.log("CLICKED Parent", e.target.value);
    setValues({ ...values, parent: e.target.value });
    setSelectedParent(e.target.value);
    if (values.parent._id === e.target.value) {
      getOneSchedule();
    }
  };
  const handleStudentTypeChange = (e) => {
    setValues({ ...values, studentType: e.target.value });
  };

  return (
    <Dots>
      <Wrapper>
        <ResponsiveDrawer />
        <EditScheduleContainer>
          <TitleCon>
            <FormTitle>Edit Schedule</FormTitle>
          </TitleCon>
          <Flexer>
            <FormCon1>
              <EditScheduleForm
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                setValues={setValues}
                values={values}
                handleParentChange={handleParentChange}
                handleStudentTypeChange={handleStudentTypeChange}
                parents={parents}
              />
            </FormCon1>
            <FormCon2>
              <AllSchedule />
            </FormCon2>
          </Flexer>
        </EditScheduleContainer>
      </Wrapper>
    </Dots>
  );
};

export default EditSchedule;
