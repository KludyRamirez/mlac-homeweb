import React from "react";
import { styled } from "@mui/material/styles";
import SideBar from "../SideBar/SideBar";
import Monday from "../Days/Monday";
import Tuesday from "../Days/Tuesday";
import Wednesday from "../Days/Wednesday";
import Friday from "../Days/Friday";
import Thursday from "../Days/Thursday";
import Saturday from "../Days/Saturday";
import ParentSortSchedule from "../AllSchedule/ParentSortSchedule";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});

const TimeTableCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  overflow: "hidden",
  overflowX: "scroll",
  backgroundColor: "#FAFAFA",
  backgroundImage: "url('images/dots.webp')",
  padding: "40px 0px",
  marginTop: "40px",
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
  return (
    <Wrapper>
      <SideBar />
      <TimeTableCon>
        <Flexer>
          <Monday />
          <Tuesday />
          <Wednesday></Wednesday>
          <Thursday />
          <Friday />
          <Saturday />
        </Flexer>
      </TimeTableCon>
    </Wrapper>
  );
};

export default Timetable;
