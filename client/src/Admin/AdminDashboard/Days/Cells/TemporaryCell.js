import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import BlockIcon from "@mui/icons-material/Block";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import TimerIcon from "@mui/icons-material/Timer";
import Tilt from "react-parallax-tilt";

const CellTemp = styled("div")({
  backgroundImage:
    "radial-gradient(100% 0% at 0% 100%, #5468ff 0, #5adaff 100%)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.06) 0px 1px 1px 0px",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid #5adaff",
  borderRadius: "10px",
  width: "176px",
  height: "106px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  fontSize: "16px",
  fontWeight: "600",
  padding: "10px",
  color: "white",
  cursor: "pointer",
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  "&:hover": {
    background: "white",
    transform: "translateY(-1px)",
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 4px",
    color: "#07bbff",
  },
});

const LowerIconDiv = styled("div")({
  background: "#007bff",
  color: "#007bff",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv2 = styled("div")({
  background: "#FFBF00",
  color: "#FFBF00",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv3 = styled("div")({
  background: "#7CFC00",
  color: "#7CFC00",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv4 = styled("div")({
  background: "#FF3131",
  color: "#FF3131",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const TemporaryCell = ({ schedule, deleteOneSched }) => {
  const auth = useSelector(authSelector);
  return (
    <CellTemp key={schedule._id}>
      <div
        style={{
          color: "white",
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#007bff",
            padding: "0px 0 0 3px",
          }}
        >
          {schedule.nameOfStudent}
          {schedule.tempStudentName && schedule.tempStudentName.nameOfStudent}
        </div>
        {auth && auth.userDetails.role === "Administrator" && (
          <CloseSharpIcon
            sx={{
              color: "white",
              fontSize: "16px",
            }}
            onClick={() => deleteOneSched(schedule._id)}
          />
        )}
      </div>
      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "500",
          }}
        >
          {schedule.dateTime ? schedule.dateTime.slice(0, -5) : ""}
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "400",
            color: "white",
          }}
        >
          {schedule.tempStudentName && schedule.tempStudentName.studentType}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "4px",
            }}
          >
            <LowerIconDiv>
              <PersonIcon sx={{ fontSize: "14px" }} />
            </LowerIconDiv>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {schedule.schedType === "Temporary" ? (
              <TimerIcon fontSize="small" sx={{ color: "#007bff" }} />
            ) : (
              <BookmarkAddedIcon fontSize="small" sx={{ color: "white" }} />
            )}
          </div>
        </div>
      </div>
    </CellTemp>
  );
};

export default TemporaryCell;
