import React, { useState } from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Tilt from "react-parallax-tilt";
import { BsCalendarWeek, BsHourglassSplit, BsPlus } from "react-icons/bs";

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

const FormContainer = styled("div")({
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
  background: "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)",
  boxShadow:
    "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
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

const FilterRealButton = styled("button")({
  padding: "0",
  border: "none",
  background: "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  boxShadow:
    "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
  width: "86px",
  height: "42px",
  borderRadius: "10px",
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

const InputFields = styled("input")({
  width: "100%",
  background: "rgba(255, 255, 255, 0.8)",
  border: "1px solid white",
  borderRadius: "10px",
  height: "42px",
  padding: "0px 0px 0px 12px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#122c8e",
  letterSpacing: "0.4px",
  outline: "none",
  position: "relative",

  "&:focus": {
    outline: "2px solid #122c8e",
    border: "1px solid transparent",
  },
  "&::placeholder": {
    color: "#122c8e",
    fontSize: "12px",
    fontWeight: "500",
  },
});

const InputTitles = styled("div")({
  width: "100px",
  height: "20px",
  fontSize: "11px",
  margin: "0px",
  color: "#122c8e",
  fontWeight: "700",
  letterSpacing: "0px",
  textTransform: "",
});

const FlexerRow = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  paddingTop: "40px",

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

const WaitListInputs = (props) => {
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    username,
    setUsername,
    password,
    setPassword,
    role,
    setRole,
    mail,
    setMail,
    isFormValid,
    handleWaitList,
  } = props;

  const [showDiv, setShowDiv] = useState(true);

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <>
      <Flexer>
        <TitleCon>
          <div
            style={{
              width: "20px",
              height: "6px",
              borderRadius: "6px",
              background: "#007bff",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "6px",
              borderRadius: "6px",
              background: "orange",
            }}
          ></div>
          <div
            style={{
              width: "20px",
              height: "6px",
              borderRadius: "6px",
              background: "red",
            }}
          ></div>
        </TitleCon>

        <RoleCon>
          <RoleTitle>Parent</RoleTitle>
        </RoleCon>
        <FormContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              width: "100%",
            }}
          >
            <InputTitles>Email*</InputTitles>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <InputFields
                name="Email"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                placeholder="Enter email"
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
              <InputTitles>First name*</InputTitles>
              <InputFields
                sx={{
                  padding: "0",
                  "::placeholder": {
                    paddingLeft: "12px",
                  },
                }}
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
                width: "50%",
              }}
            >
              <InputTitles>Last name*</InputTitles>
              <InputFields
                sx={{
                  padding: "0",
                  "::placeholder": {
                    paddingLeft: "12px",
                  },
                }}
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
            <InputTitles>Username*</InputTitles>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <InputFields
                name="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter email"
              />
            </div>
          </div>
        </FormContainer>

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
                <BsCalendarWeek style={{ fontSize: "18px", color: "white" }} />
              </FilterButton>
            </Link>
            <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
              <FilterButton>
                <BsHourglassSplit
                  style={{ fontSize: "18px", color: "white" }}
                />
              </FilterButton>
            </Link>
          </div>
          <FilterRealButton onClick={handleWaitList} disabled={!isFormValid}>
            <BsPlus style={{ fontSize: "18px", color: "white" }} />
            <div
              style={{
                fontWeight: "600",
                fontSize: "12px",
                color: "white",
                paddingRight: "4px",
              }}
            >
              Submit
            </div>
          </FilterRealButton>
        </div>
      </Flexer>

      <FlexerRow>
        <Tilt>
          <StatsCard
            sx={{
              background: "#122c8e",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "6px",
              }}
            >
              Soon
              <br />
              Schedules
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
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "6px",
              }}
            >
              Present
              <br />
              Schedules
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
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "6px",
              }}
            >
              Absent
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
