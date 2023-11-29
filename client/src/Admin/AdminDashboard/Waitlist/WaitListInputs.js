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
  BsHourglassSplit,
} from "react-icons/bs";
import WaitListStudentForm from "./WaitListStudentForm";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

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
  width: "40px",
  height: "38px",
  background: "rgba(7, 187, 255, 0.3)",
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 1px",
  borderRadius: "50%",
  cursor: "pointer",
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

const NextRoundButton = styled("button")({
  padding: "0",
  border: "none",
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 1px",
  backgroundColor: "#07bbff",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #007bff 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
  width: "40px",
  height: "38px",
  borderRadius: "12px",
  cursor: "pointer",
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
  border: "none",
  background: "white",
  border: "none",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 123, 255, 0.1) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
  width: "40px",
  height: "38px",
  borderRadius: "12px",
  cursor: "pointer",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
});

const InputFields = styled("input")({
  width: "100%",
  background: "rgba(7, 187, 255, 0.2)",
  border: "1px solid white",
  borderRadius: "10px",
  height: "42px",
  padding: "0px 0px 0px 12px",
  fontSize: "11px",
  fontWeight: "600",
  color: "#343434",
  letterSpacing: "0.2px",
  outline: "none",
  position: "relative",
  fontFamily: "Poppins, sans-serif",

  "&:focus": {
    outline: "2px solid #228B22",
    border: "1px solid rgba(7, 187, 255, 0.2)",
  },
  "&::placeholder": {
    color: "#343434",
    fontSize: "11px",
    fontWeight: "600",
    textTransform: "none",
  },
});

const InputTitles = styled("div")({
  width: "100%",
  height: "20px",
  fontSize: "12px",
  margin: "0px",
  color: "#122c8e",
  fontWeight: "700",
  letterSpacing: "0px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
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
    "rgba(0, 0, 0, 0.1) 0px 5px 10px -2px, rgba(0, 0, 0, 0.05) 0px 2px 4px -1px",
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
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  padding: "32px 0 37px 0",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "48px",
  fontWeight: "700",
  letterSpacing: "-2.5px",
  marginLeft: "-3.5px",

  "@media (max-width: 767px)": {},
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
  isWaitlisteds: ["Yes"],
  isWaitlisted: "Yes",
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
  } = props;

  const [showDiv, setShowDiv] = useState(true);
  const [values, setValues] = useState(initialState);
  const [activeWaitlistForm, setActiveWaitlistForm] = useState("Parent");
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
      toast.success(`${res.data.nameOfStudent} is created.`);
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

  const handleStudentTypeChange = (e) => {
    setValues({ ...values, studentType: e.target.value });
  };

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  const LightTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: "#228B22",
    },
    [`& .${tooltipClasses.tooltip}`]: {
      background: "#228B22",
      color: "white",
      fontSize: "11px",
      fontFamily: "Poppins, sans-serif",
      fontWeight: "500",
      borderRadius: "4px",
      boxShadow:
        "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    },
  }));

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
                {mail.length > 3 &&
                mail.length < 24 &&
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                  mail
                ) ? (
                  <div
                    style={{
                      color: "#007bff",
                    }}
                  >
                    Valid
                  </div>
                ) : (
                  <div
                    style={{
                      color: "#ff3131",
                    }}
                  >
                    Invalid
                  </div>
                )}
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
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "24px",
                width: "100%",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  width: "46%",
                }}
              >
                <InputTitles
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>First Name *</div>
                  {firstname.length > 3 && firstname.length < 24 ? (
                    <div
                      style={{
                        color: "#007bff",
                      }}
                    >
                      Valid
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "#ff3131",
                      }}
                    >
                      Invalid
                    </div>
                  )}
                </InputTitles>
                <InputFields
                  sx={{ textTransform: "capitalize" }}
                  type="text"
                  required
                  name="first name"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder="Enter first name"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  gap: "8px",
                  width: "46%",
                }}
              >
                <InputTitles
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <div>Last Name *</div>
                  {lastname.length > 3 && lastname.length < 24 ? (
                    <div
                      style={{
                        color: "#007bff",
                      }}
                    >
                      Valid
                    </div>
                  ) : (
                    <div
                      style={{
                        color: "#ff3131",
                      }}
                    >
                      Invalid
                    </div>
                  )}
                </InputTitles>
                <InputFields
                  sx={{ textTransform: "capitalize" }}
                  type="text"
                  required
                  name="last name"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder="Enter last name"
                />
              </div>
            </div>
            <br />
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
                <div>Username *</div>
                {username.length > 3 && username.length < 24 ? (
                  <div
                    style={{
                      color: "#007bff",
                    }}
                  >
                    Valid
                  </div>
                ) : (
                  <div
                    style={{
                      color: "#ff3131",
                    }}
                  >
                    Invalid
                  </div>
                )}
              </InputTitles>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <InputFields
                  type="text"
                  required
                  name="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter username"
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
                  gap: "8px",
                }}
              >
                <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
                  <FilterButton>
                    <BsCalendarWeek
                      style={{ fontSize: "18px", color: "#122c8e" }}
                    />
                  </FilterButton>
                </Link>
                <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
                  <FilterButton>
                    <BsHourglassSplit
                      style={{ fontSize: "18px", color: "#122c8e" }}
                    />
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
        />
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "40px",
          alignItems: "center",
          gap: "24px",
          margin: "20px 0px 30px 0",
        }}
      >
        <div
          style={{
            width: "33%",
            height: "1px",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />
        <span
          style={{
            fontSize: "16px",
            color: "#122c8e",
            fontWeight: "600",
            marginTop: "-4px",
            whiteSpace: "nowrap",
          }}
        >
          Global Statistics
        </span>
        <div
          style={{
            width: "33%",
            height: "1px",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
      <FlexerRow>
        <Tilt>
          <StatsCard
            sx={{
              background: "#122c8e",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Soon</div>
              <div>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              19
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard
            sx={{
              background: "rgba(255, 170, 51, 1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Soon</div>
              <div>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              7
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard
            sx={{
              background: "rgba(255, 49, 49, 1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Total</div>
              <div>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              7
            </div>
          </StatsCard>
        </Tilt>
      </FlexerRow>
    </>
  );
};

export default WaitListInputs;
