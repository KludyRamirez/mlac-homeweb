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
  alignItems: "center",
  backgroundColor: "#ffffff",
  margin: "0",
});

const TimeTableCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "85%",
  height: "90%",
  marginTop: "60px",
  gap: "20px",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
  overflow: "hidden",
  overflowX: "scroll",
  backgroundColor: "#8BC6EC",
  backgroundImage: "linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%)",
  borderRadius: "5px",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "5px",
  height: "inherit",
  padding: "0px 40px",
});

const Timetable = () => {
  return (
    <div>
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
    </div>
  );
};

export default Timetable;
