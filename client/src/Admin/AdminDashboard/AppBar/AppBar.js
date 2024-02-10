import React from "react";
import { styled } from "@mui/system";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import { BsBell, BsBellFill } from "react-icons/bs";

const TopNavBar = styled("div")({
  position: "absolute",
  top: "0",
  left: "50%",
  width: "50%",
  height: "100px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  backgroundColor: "transparent",
  zIndex: "2",
  cursor: "pointer",
  listStyle: "none",
  overflow: "hidden",
  textDecoration: "none",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "transform",
  transition: "transform .15s",
});

function TopBar() {
  return (
    <TopNavBar>
      <BsBell
        style={{ color: "#122c8e", padding: "0 40px", fontSize: "24px" }}
      />
    </TopNavBar>
  );
}

export default TopBar;
