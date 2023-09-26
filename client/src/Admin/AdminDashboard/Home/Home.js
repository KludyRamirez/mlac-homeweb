import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/material/styles";
import AppBar from "../AppBar/AppBar";
import SideBar from "../SideBar/SideBar";

import axios from "axios";
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

const HomeCon = styled("div")({
  flexGrow: 1,
  marginTop: "60px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "85%",
});

const HomeContainer = styled("div")({
  width: "90%",
  height: "100%",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
  padding: "20px",
});

const TitleCon = styled("h1")({
  margin: "0px",
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
});

const TimeTableCon = styled("h1")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  flexWrap: "wrap",
});

const Home = () => {
  return (
    <Wrapper>
      <SideBar />
      <AppBar />
      <HomeCon>
        <HomeContainer>
          <TitleCon>TimeTable</TitleCon>
          <TimeTableCon>
            <Monday />
            <Tuesday />
            <Wednesday />
            <Thursday />
            <Friday />
            <Saturday />
          </TimeTableCon>
        </HomeContainer>
      </HomeCon>
    </Wrapper>
  );
};

export default Home;
