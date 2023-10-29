import React from "react";
import { styled } from "@mui/system";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

const TopNavBar = styled("div")({
  position: "absolute",
  top: "0",
  left: "50%",
  width: "50%",
  height: "34px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "transparent",
  borderCollapse: "collapse",
  zIndex: "2",
});

function TopBar() {
  return (
    <TopNavBar>
      <BubbleChartIcon sx={{ color: "#07bbff", padding: "0 10px" }} />
    </TopNavBar>
  );
}

export default TopBar;
