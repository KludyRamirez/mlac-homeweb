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

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundColor: "#FCFCFC",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});

const TimeTableCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: "#FCFCFC",
  padding: "0px 10px",
  marginTop: "70px",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowX: "scroll",
    padding: "40px 0px",
    marginTop: "20px",
    marginLeft: "-30px",
  },
});

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "12px",
  height: "inherit",
  padding: "0px 40px",
});

const WeekContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "14px",
  marginLeft: "-7px",
  border: "1px solid rgba(0, 0, 0, 0.06)",
  padding: "6px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  borderBottomLeftRadius: "2px",
}));

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AllTimetable = ({ socket, userNotif }) => {
  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const [activeDay, setActiveDay] = useState(dayOfWeek);

  const handleDayChange = (day) => {
    setActiveDay(day);
  };

  return (
    <Wrapper>
      <TopBar />
      <ResponsiveDrawer />
      <TimeTableCon>
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
                fontSize: "11px",
                fontWeight: "bold",
                // borderBottom:
                //   activeDay === "Monday" ? "none" : "1px solid #007bff",
                // borderTop:
                //   activeDay === "Monday" ? "none" : "1px solid #007bff",
                // borderLeft:
                //   activeDay === "Monday" ? "none" : "1px solid #007bff",
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
                fontSize: "11px",
                fontWeight: "bold",
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
                fontSize: "11px",
                fontWeight: "bold",
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
                fontSize: "11px",
                fontWeight: "bold",
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
                fontSize: "11px",
                fontWeight: "bold",
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
                fontSize: "11px",
                fontWeight: "bold",
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
          {activeDay === "Friday" && (
            <Friday socket={socket} userNotif={userNotif} />
          )}
          {activeDay === "Saturday" && <Saturday />}
        </Flexer>
      </TimeTableCon>
    </Wrapper>
  );
};

export default AllTimetable;
