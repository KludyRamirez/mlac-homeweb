import React from "react";
import { styled } from "@mui/system";

const AllScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
  height: "85vh",
  flexGrow: "1",
});

const AllSchedule = () => {
  return <AllScheduleContainer></AllScheduleContainer>;
};

export default AllSchedule;
