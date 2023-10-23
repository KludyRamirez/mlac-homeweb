import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import SideBar from "../SideBar/SideBar";
import Monday from "../Days/Monday";
import Tuesday from "../Days/Tuesday";
import Wednesday from "../Days/Wednesday";
import Friday from "../Days/Friday";
import Thursday from "../Days/Thursday";
import Saturday from "../Days/Saturday";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundColor: "#FAFAFA",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});

const TimeTableCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  backgroundColor: "#FAFAFA",
  padding: "40px 20px",
  marginTop: "30px",
  overflow: "hidden",
  overflowX: "scroll",
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
  gap: "10px",
  marginLeft: "-8px",
}));

const AllTimetable = () => {
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
      <SideBar />
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
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: activeDay === "Monday" ? "-1px" : "0px",
                backgroundColor:
                  activeDay === "Monday" ? "white" : "transparent",
                color: "#07bbff",
                borderBottom:
                  activeDay === "Monday" ? "1px solid #007bff" : "none",
                borderTop:
                  activeDay === "Monday" ? "1px solid #007bff" : "none",
                borderLeft:
                  activeDay === "Monday" ? "1px solid #007bff" : "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "12px",
                fontWeight: "bold",
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
              M
            </div>

            <div
              onClick={() => handleDayChange("Tuesday")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: activeDay === "Tuesday" ? "-1px" : "0px",
                backgroundColor:
                  activeDay === "Tuesday" ? "white" : "transparent",
                color: "#07bbff",
                borderBottom:
                  activeDay === "Tuesday" ? "1px solid #007bff" : "none",
                borderTop:
                  activeDay === "Tuesday" ? "1px solid #007bff" : "none",
                borderLeft:
                  activeDay === "Tuesday" ? "1px solid #007bff" : "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "12px",
                fontWeight: "bold",
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
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: activeDay === "Wednesday" ? "-1px" : "0px",
                backgroundColor:
                  activeDay === "Wednesday" ? "white" : "transparent",
                color: "#07bbff",
                borderBottom:
                  activeDay === "Wednesday" ? "1px solid #007bff" : "none",
                borderTop:
                  activeDay === "Wednesday" ? "1px solid #007bff" : "none",
                borderLeft:
                  activeDay === "Wednesday" ? "1px solid #007bff" : "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "12px",
                fontWeight: "bold",
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
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: activeDay === "Thursday" ? "-1px" : "0px",
                backgroundColor:
                  activeDay === "Thursday" ? "white" : "transparent",
                color: "#07bbff",
                borderBottom:
                  activeDay === "Thursday" ? "1px solid #007bff" : "none",
                borderTop:
                  activeDay === "Thursday" ? "1px solid #007bff" : "none",
                borderLeft:
                  activeDay === "Thursday" ? "1px solid #007bff" : "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "12px",
                fontWeight: "bold",
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
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: activeDay === "Friday" ? "-1px" : "0px",
                backgroundColor:
                  activeDay === "Friday" ? "white" : "transparent",
                color: "#07bbff",
                borderBottom:
                  activeDay === "Friday" ? "1px solid #007bff" : "none",
                borderTop:
                  activeDay === "Friday" ? "1px solid #007bff" : "none",
                borderLeft:
                  activeDay === "Friday" ? "1px solid #007bff" : "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "12px",
                fontWeight: "bold",
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
                width: "28px",
                height: "28px",
                borderRadius: "50%",
                marginTop: activeDay === "Saturday" ? "-1px" : "0px",
                backgroundColor:
                  activeDay === "Saturday" ? "white" : "transparent",
                color: "#07bbff",
                borderBottom:
                  activeDay === "Saturday" ? "1px solid #007bff" : "none",
                borderTop:
                  activeDay === "Saturday" ? "1px solid #007bff" : "none",
                borderLeft:
                  activeDay === "Saturday" ? "1px solid #007bff" : "none",
                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "12px",
                fontWeight: "bold",
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
  );
};

export default AllTimetable;
