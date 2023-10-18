import React, { useState, useEffect } from "react";
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
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});

const TimeTableCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  width: "100%",
  overflow: "hidden",
  overflowX: "scroll",
  backgroundColor: "#FAFAFA",
  padding: "40px 20px",
  marginTop: "30px",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "26px",
  height: "inherit",
  padding: "0px 40px",
});

const rainbowTable = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "40px",
  height: "inherit",
  padding: "0px 0px",
});

const Timetable = () => {
  const [nextSixDays, setNextSixDays] = useState([]);

  const today = new Date();
  const dayOfWeek = today.toLocaleDateString("en-US", { weekday: "long" });

  useEffect(() => {
    const dates = [];

    for (let i = 0; dates.length < 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      // Check if the day is not Sunday (0) before adding it to the list
      if (nextDate.getDay() !== 0) {
        const formattedDate = nextDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });
        dates.push(formattedDate);
      }
    }

    setNextSixDays(dates);
  }, []);

  return (
    <Wrapper>
      <SideBar />
      <TimeTableCon>
        <Flexer>
          {nextSixDays.map((date, index) => (
            <div
              style={{
                width: "416px",
              }}
              key={index}
            >
              <div
                style={{
                  width: "416px",
                  color: "#07bbff",
                  fontSize: "52px",
                  letterSpacing: "0px",
                  marginLeft: "-4px",
                }}
              >
                {date}
              </div>
            </div>
          ))}
        </Flexer>
        {dayOfWeek === "Monday" && (
          <Flexer>
            <Monday />
            <Tuesday />
            <Wednesday />
            <Thursday />
            <Friday />
            <Saturday />
          </Flexer>
        )}
        {dayOfWeek === "Tuesday" && (
          <Flexer>
            <Tuesday />
            <Wednesday />
            <Thursday />
            <Friday />
            <Saturday />
            <Monday />
          </Flexer>
        )}
        {dayOfWeek === "Wednesday" && (
          <Flexer>
            <Wednesday />
            <Thursday />
            <Friday />
            <Saturday />
            <Monday />
            <Tuesday />
          </Flexer>
        )}
        {dayOfWeek === "Thursday" && (
          <Flexer>
            <Thursday />
            <Friday />
            <Saturday />
            <Monday />
            <Tuesday />
            <Wednesday />
          </Flexer>
        )}
        {dayOfWeek === "Friday" && (
          <Flexer>
            <Friday />
            <Saturday />
            <Monday />
            <Tuesday />
            <Wednesday />
            <Thursday />
          </Flexer>
        )}
        {dayOfWeek === "Saturday" && (
          <Flexer>
            <Saturday />
            <Monday />
            <Tuesday />
            <Wednesday />
            <Thursday />
            <Friday />
          </Flexer>
        )}
        {dayOfWeek === "Sunday" && (
          <Flexer>
            <Monday />
            <Tuesday />
            <Wednesday />
            <Thursday />
            <Friday />
            <Saturday />
          </Flexer>
        )}
      </TimeTableCon>
    </Wrapper>
  );
};

export default Timetable;
