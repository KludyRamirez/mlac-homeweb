import React, { useState, useEffect } from "react";
import { createSelector } from "reselect";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import Monday from "../Days/Monday";
import Tuesday from "../Days/Tuesday";
import Wednesday from "../Days/Wednesday";
import Friday from "../Days/Friday";
import Thursday from "../Days/Thursday";
import Saturday from "../Days/Saturday";
import TopBar from "../AppBar/AppBar";
import dots from "../../../images/dots.webp";
import { connect } from "react-redux";
import { getActions } from "../../../store/actions/authActions";

const Dots = styled("div")({
  background: "",
});

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",
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

const TimeTableCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  background: "transparent",
  marginTop: "0px",

  "@media (max-width: 767px)": {
    padding: "20px 0px",
    marginTop: "10px",
    alignItems: "flex-start",
    overflow: "hidden",
    overflowX: "scroll",
  },
});

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "12px",
  height: "inherit",
  padding: "0 40px",
});

const WeekContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "14px",
  marginLeft: "-7px",
  alignSelf: "flex-start",
  paddingTop: "30px",
}));

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AllTimetable = ({ setUserDetails }) => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const [activeDay, setActiveDay] = useState(dayOfWeek);

  const auth = useSelector(authSelector);

  useEffect(() => {
    const userDetails = localStorage.getItem("user");
    if (!userDetails) {
      window.location.pathname = "login";
    } else {
      setUserDetails(JSON.parse(userDetails));
    }
  }, []);

  const handleDayChange = (day) => {
    setActiveDay(day);
  };

  return (
    <Dots>
      <Wrapper>
        <TopBar />
        <ResponsiveDrawer />

        <TimeTableCon>
          <TitleCon>
            <FormTitle
              sx={{
                paddingBottom: "0",
              }}
            >
              {"<"} Mlac Homeweb <span style={{ fontSize: "12px" }}>/</span>{" "}
            </FormTitle>
            <FormTitle
              sx={{
                paddingLeft: "6px",
              }}
            >
              Timetable
            </FormTitle>
          </TitleCon>
          <TitleCon>
            <FormTitle
              sx={{
                paddingTop: "0",
                fontSize: "32px",
                fontWeight: "500",
                paddingBottom: "0px",
              }}
            >
              Timetable
            </FormTitle>
          </TitleCon>
          <Flexer>
            <WeekContainer>
              <div
                onClick={() => handleDayChange("Monday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeDay === "Monday" ? "-1px" : "0px",
                  background:
                    activeDay === "Monday"
                      ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                      : "transparent",
                  color: activeDay === "Monday" ? "white" : "#07bbff",

                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "box-shadow .15s, transform .15s",
                  touchAction: "manipulation",
                  willChange: "box-shadow, transform",
                  fontSize: "13px",
                  fontWeight: "500",

                  ":focus": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  },
                  ":hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    transform: "translateY(-2px)",

                    background: "white",
                  },
                }}
              >
                M
              </div>

              <div
                onClick={() => handleDayChange("Tuesday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeDay === "Tuesday" ? "-1px" : "0px",
                  background:
                    activeDay === "Tuesday"
                      ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                      : "transparent",
                  color: activeDay === "Tuesday" ? "white" : "#07bbff",

                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "box-shadow .15s, transform .15s",
                  touchAction: "manipulation",
                  willChange: "box-shadow, transform",
                  fontSize: "13px",
                  fontWeight: "500",
                  // borderBottom:
                  //   activeDay === "Tuesday" ? "none" : "1px solid #007bff",
                  // borderTop:
                  //   activeDay === "Tuesday" ? "none" : "1px solid #007bff",
                  // borderLeft:
                  //   activeDay === "Tuesday" ? "none" : "1px solid #007bff",
                  ":focus": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  },
                  ":hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    transform: "translateY(-2px)",
                    borderBottom: "1px solid #007bff",
                    borderTop: "1px solid #007bff",
                    borderLeft: "1px solid #007bff",
                    background: "white",
                  },
                }}
              >
                T
              </div>
              <div
                onClick={() => handleDayChange("Wednesday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeDay === "Wednesday" ? "-1px" : "0px",
                  background:
                    activeDay === "Wednesday"
                      ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                      : "transparent",
                  color: activeDay === "Wednesday" ? "white" : "#07bbff",

                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "box-shadow .15s, transform .15s",
                  touchAction: "manipulation",
                  willChange: "box-shadow, transform",
                  fontSize: "13px",
                  fontWeight: "500",
                  // borderBottom:
                  //   activeDay === "Wednesday" ? "none" : "1px solid #007bff",
                  // borderTop:
                  //   activeDay === "Wednesday" ? "none" : "1px solid #007bff",
                  // borderLeft:
                  //   activeDay === "Wednesday" ? "none" : "1px solid #007bff",
                  ":focus": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  },
                  ":hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    transform: "translateY(-2px)",
                    borderBottom: "1px solid #007bff",
                    borderTop: "1px solid #007bff",
                    borderLeft: "1px solid #007bff",
                    background: "white",
                  },
                }}
              >
                W
              </div>
              <div
                onClick={() => handleDayChange("Thursday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeDay === "Thursday" ? "-1px" : "0px",
                  background:
                    activeDay === "Thursday"
                      ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                      : "transparent",
                  color: activeDay === "Thursday" ? "white" : "#07bbff",

                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "box-shadow .15s, transform .15s",
                  touchAction: "manipulation",
                  willChange: "box-shadow, transform",
                  fontSize: "13px",
                  fontWeight: "500",
                  // borderBottom:
                  //   activeDay === "Thursday" ? "none" : "1px solid #007bff",
                  // borderTop:
                  //   activeDay === "Thursday" ? "none" : "1px solid #007bff",
                  // borderLeft:
                  //   activeDay === "Thursday" ? "none" : "1px solid #007bff",
                  ":focus": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  },
                  ":hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    transform: "translateY(-2px)",
                    borderBottom: "1px solid #007bff",
                    borderTop: "1px solid #007bff",
                    borderLeft: "1px solid #007bff",
                    background: "white",
                  },
                }}
              >
                Th
              </div>
              <div
                onClick={() => handleDayChange("Friday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeDay === "Friday" ? "-1px" : "0px",
                  background:
                    activeDay === "Friday"
                      ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                      : "transparent",
                  color: activeDay === "Friday" ? "white" : "#07bbff",

                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "box-shadow .15s, transform .15s",
                  touchAction: "manipulation",
                  willChange: "box-shadow, transform",
                  fontSize: "13px",
                  fontWeight: "500",
                  // borderBottom:
                  //   activeDay === "Friday" ? "none" : "1px solid #007bff",
                  // borderTop:
                  //   activeDay === "Friday" ? "none" : "1px solid #007bff",
                  // borderLeft:
                  //   activeDay === "Friday" ? "none" : "1px solid #007bff",
                  ":focus": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  },
                  ":hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    transform: "translateY(-2px)",
                    borderBottom: "1px solid #007bff",
                    borderTop: "1px solid #007bff",
                    borderLeft: "1px solid #007bff",
                    background: "white",
                  },
                }}
              >
                F
              </div>
              <div
                onClick={() => handleDayChange("Saturday")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeDay === "Saturday" ? "-1px" : "0px",
                  background:
                    activeDay === "Saturday"
                      ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                      : "transparent",
                  color: activeDay === "Saturday" ? "white" : "#07bbff",

                  cursor: "pointer",
                  textDecoration: "none",
                  transition: "box-shadow .15s, transform .15s",
                  touchAction: "manipulation",
                  willChange: "box-shadow, transform",
                  fontSize: "13px",
                  fontWeight: "500",
                  // borderBottom:
                  //   activeDay === "Saturday" ? "none" : "1px solid #007bff",
                  // borderTop:
                  //   activeDay === "Saturday" ? "none" : "1px solid #007bff",
                  // borderLeft:
                  //   activeDay === "Saturday" ? "none" : "1px solid #007bff",
                  ":focus": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  },
                  ":hover": {
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    transform: "translateY(-2px)",
                    borderBottom: "1px solid #007bff",
                    borderTop: "1px solid #007bff",
                    borderLeft: "1px solid #007bff",
                    background: "white",
                  },
                }}
              >
                S
              </div>
            </WeekContainer>

            {activeDay === "Sunday" && <Monday />}
            {activeDay === "Monday" && <Monday />}
            {activeDay === "Tuesday" && <Tuesday />}
            {activeDay === "Wednesday" && <Wednesday />}
            {activeDay === "Thursday" && <Thursday />}
            {activeDay === "Friday" && <Friday />}
            {activeDay === "Saturday" && <Saturday />}
          </Flexer>
        </TimeTableCon>
      </Wrapper>
    </Dots>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(null, mapActionsToProps)(AllTimetable);
