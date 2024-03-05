import React, { useState } from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createSelector } from "reselect";
import Tilt from "react-parallax-tilt";
import {
  BsArrowRightShort,
  BsCalendarWeek,
  BsClockFill,
  BsHourglassSplit,
} from "react-icons/bs";
import WaitListStudentForm from "./WaitListStudentForm";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import WaitListStudentFormSecond from "./WaitListStudentFormSecond";

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: "14px",
  background: "transparent",
  "@media (max-width: 767px)": {
    padding: "40px 20px",
    borderRadius: "20px",
    boxShadow: "none",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },
});

const FormContainer = styled("form")({
  width: "100%",
  borderRadius: "12px",
  "@media (max-width: 767px)": {
    borderRadius: "0px",
  },
});

const FilterButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  width: "88px",
  height: "40px",
  background: "#fefefe",
  border: "1px solid rgba(0, 123, 255, 0.6)",
  borderRadius: "36px",
  cursor: "pointer",
  color: "#122c8e",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.16s ease-in-out",
  "&:hover": {
    border: "none",
    color: "white",
    transform: "translateY(-1px)",
    background: "#33f641",
    backgroundImage:
      "radial-gradient(at 16.0% 15.0%, hsl(55, 99%, 44%) 0px, transparent 50%),radial-gradient(at 12.0% 94.0%, hsl(74, 34%, 61%) 0px, transparent 50%),radial-gradient(at 98.0% 29.0%, hsl(90, 60%, 24%) 0px, transparent 50%),radial-gradient(at 1.0% 16.0%, hsl(105, 10%, 31%) 0px, transparent 50%),radial-gradient(at 28.0% 88.0%, hsl(148, 67%, 56%) 0px, transparent 50%)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const NextRoundButton = styled("button")({
  padding: "0",
  border: "none",
  background: "#33f641",
  backgroundImage:
    "radial-gradient(at 16.0% 15.0%, hsl(55, 99%, 44%) 0px, transparent 50%),radial-gradient(at 12.0% 94.0%, hsl(74, 34%, 61%) 0px, transparent 50%),radial-gradient(at 98.0% 29.0%, hsl(90, 60%, 24%) 0px, transparent 50%),radial-gradient(at 1.0% 16.0%, hsl(105, 10%, 31%) 0px, transparent 50%),radial-gradient(at 28.0% 88.0%, hsl(148, 67%, 56%) 0px, transparent 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "38px",
  height: "36px",
  borderRadius: "24px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const NextDisabledButton = styled("button")({
  padding: "0",
  background: "transparent",
  border: "none",
  outline: "1px solid rgba(0, 123, 255, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "38px",
  height: "36px",
  borderRadius: "24px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
});

const InputFields = styled("input")({
  width: "100%",
  background: "#fefefe",
  outline: "1px solid rgba(0, 123, 255, 0.6)",
  border: "none",
  borderRadius: "24px",
  height: "44px",
  padding: "0px 0px 0px 20px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#122c8e",
  letterSpacing: "0.2px",
  position: "relative",
  fontFamily: "Poppins, sans-serif",

  "&:focus": {
    outline: "2px solid #007bff",
    border: "none",
  },
  "&::placeholder": {
    color: "RGBA(18, 44, 142, 0.6)",
    fontSize: "12px",
    fontWeight: "500",
  },
});

const InputTitles = styled("div")({
  width: "200px",
  height: "20px",
  fontSize: "13px",
  margin: "0px",
  color: "#122c8e",
  fontWeight: "500",
  letterSpacing: "0.4px",
});

const FlexerRow = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "16px",

  "@media (max-width: 767px)": {
    flexWrap: "wrap",
  },
});

const StatsCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "136px",
  height: "112px",
  overflow: "hidden",
  borderRadius: "10px",
  padding: "0px 12px",
  gap: "4px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  gap: "4px",
  paddingTop: "10px",
});

const RoleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const RoleTitle = styled("div")({
  margin: "0px",
  padding: "32px 4px 37px 0px",
  fontSize: "48px",
  fontWeight: "700",
  marginLeft: "-3.5px",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",
  letterSpacing: "-2px",
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
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 NN",
    "12:00 NN - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ],
  timing: "",
  notifLocator: "",
  isWaitlisteds: ["Yes"],
  isWaitlisted: "Yes",
  age: "",
  sexs: ["Male", "Female"],
  sex: "",
  birthday: "",
  previousCenter: "",
  currentCenter: "",
  doctor: "",
  medicalHistory: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const WaitListInputs = (props) => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    mail,
    setMail,
    isFormValid,
    handleWaitList,
    setPhone,
    phone,
  } = props;

  const [values, setValues] = useState(initialState);
  const [activeWaitlistForm, setActiveWaitlistForm] = useState("Parent");
  const [inputValue, setInputValue] = useState("");
  const maxLength = 50;
  const auth = useSelector(authSelector);

  const handleFormChange = (form) => {
    setActiveWaitlistForm(form);
    setValues({
      ...values,
      parent: `${firstname} ${lastname} ${username}`,
      notifLocator: username,
    });
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
      toast.success(`Schedule created.`);
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

  return (
    <>
      {activeWaitlistForm === "Parent" && (
        <Flexer>
          <TitleCon>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "#007bff",
              }}
            ></div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "orange",
              }}
            ></div>
            <div
              style={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                background: "red",
              }}
            ></div>
          </TitleCon>

          <RoleCon>
            <RoleTitle>Parent</RoleTitle>
          </RoleCon>
          <FormContainer onSubmit={() => handleFormChange("Student")}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <InputTitles>
                <div>Email *</div>
              </InputTitles>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <InputFields
                  type="email"
                  name="Email"
                  autoComplete="off"
                  value={mail}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setMail(e.target.value);
                    }
                  }}
                  placeholder=""
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  width: "50%",
                }}
              >
                <InputTitles
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>First name *</div>
                </InputTitles>
                <InputFields
                  sx={{ width: "91.7%" }}
                  type="text"
                  required
                  name="first name"
                  value={username}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setUsername(e.target.value);
                    }
                  }}
                  placeholder=""
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  width: "50%",
                }}
              >
                <InputTitles
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>Phone *</div>
                </InputTitles>
                <InputFields
                  sx={{ width: "91.7%" }}
                  type="text"
                  required
                  name="phone"
                  value={phone}
                  onChange={(e) => {
                    if (e.target.value.length <= 11) {
                      setPhone(e.target.value);
                    }
                  }}
                  placeholder=""
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "10px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  width: "50%",
                }}
              >
                <InputTitles
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>First name *</div>
                </InputTitles>
                <InputFields
                  sx={{ width: "91.7%" }}
                  type="text"
                  required
                  name="first name"
                  value={firstname}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setFirstname(e.target.value);
                    }
                  }}
                  placeholder=""
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  width: "50%",
                }}
              >
                <InputTitles
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>Last name *</div>
                </InputTitles>
                <InputFields
                  sx={{ width: "91.7%" }}
                  type="text"
                  required
                  name="last name"
                  value={lastname}
                  onChange={(e) => {
                    if (e.target.value.length <= 50) {
                      setLastname(e.target.value);
                    }
                  }}
                  placeholder=""
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "40px 0 0 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                }}
              >
                <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
                  <FilterButton sx={{ borderBottomRightRadius: "4px" }}>
                    <BsClockFill style={{ fontSize: "18px" }} />
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Dyad
                    </span>
                  </FilterButton>
                </Link>
                <Link
                  to="/temp-soloschedule"
                  style={{ textDecoration: "none" }}
                >
                  <FilterButton sx={{ borderBottomLeftRadius: "4px" }}>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      Solo
                    </span>
                    <BsHourglassSplit style={{ fontSize: "18px" }} />
                  </FilterButton>
                </Link>
              </div>

              {isFormValid ? (
                <NextRoundButton>
                  <BsArrowRightShort
                    style={{ fontSize: "24px", color: "white" }}
                  />
                </NextRoundButton>
              ) : (
                <NextDisabledButton disabled>
                  <BsArrowRightShort
                    style={{ fontSize: "24px", color: "#122c8e" }}
                  />
                </NextDisabledButton>
              )}
            </div>
          </FormContainer>
        </Flexer>
      )}

      {activeWaitlistForm === "Student" && (
        <WaitListStudentForm
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleStudentTypeChange={handleStudentTypeChange}
          handleWaitList={handleWaitList}
          isFormValid={isFormValid}
          setValues={setValues}
          values={values}
          firstname={firstname}
          lastname={lastname}
          username={username}
          handleFormChange={handleFormChange}
        />
      )}

      {activeWaitlistForm === "StudentSecond" && (
        <WaitListStudentFormSecond
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          handleStudentTypeChange={handleStudentTypeChange}
          handleWaitList={handleWaitList}
          isFormValid={isFormValid}
          setValues={setValues}
          values={values}
          firstname={firstname}
          lastname={lastname}
          username={username}
          handleFormChange={handleFormChange}
        />
      )}
    </>
  );
};

export default WaitListInputs;
