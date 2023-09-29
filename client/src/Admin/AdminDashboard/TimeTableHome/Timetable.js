import React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "../AppBar/AppBar";
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
  zIndex: "1",
  backgroundColor: "#ffffff",
});

const TimeTableCon = styled("div")({
  flexGrow: 1,
  marginTop: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "89%",
});

const TableContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "95%",
  height: "100%",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
});

const DateDetails = styled("div")({
  width: "200px",
  height: "200px",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "100%",
});

const Timetable = () => {
  return (
    <div>
      <Wrapper>
        <SideBar />
        <AppBar />
        <TimeTableCon>
          <TableContainer>
            <DateDetails></DateDetails>
            <Flexer>
              <Monday />
              <Tuesday />
              <Wednesday></Wednesday>
              <Thursday />
              <Friday />
              <Saturday />
            </Flexer>
          </TableContainer>
        </TimeTableCon>
      </Wrapper>
    </div>
  );
};

export default Timetable;
