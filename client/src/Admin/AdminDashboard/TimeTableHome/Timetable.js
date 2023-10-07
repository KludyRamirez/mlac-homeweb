import React from "react";
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
  justifyContent: "flex-start",
  width: "80%",
  gap: "20px",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
  overflow: "hidden",
  overflowX: "scroll",
  scrollbarWidth: "thin",
  scrollbarColor: "transparent transparent",
  // backgroundColor: "#8BC6EC",
  backgroundImage:
    "linear-gradient(179.7deg, rgb(197, 214, 227) 2.9%, rgb(144, 175, 202) 97.1%)",
  padding: "40px",
  marginTop: "60px",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "5px",
  height: "inherit",
  padding: "0px 0px",
});

const Timetable = () => {
  return (
    <Wrapper>
      <SideBar />
      <TimeTableCon>
        {/* <DateDetails></DateDetails> */}
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
