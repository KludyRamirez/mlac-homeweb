import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import {
  BsCheckCircle,
  BsCheckCircleFill,
  BsCheckLg,
  BsQuestion,
  BsQuestionLg,
  BsXCircle,
  BsXCircleFill,
} from "react-icons/bs";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import BlockIcon from "@mui/icons-material/Block";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import TimerIcon from "@mui/icons-material/Timer";
import { ImCheckmark } from "react-icons/im";
import { RxDash } from "react-icons/rx";

const Cell = styled("div")({
  background: "rgba(255, 255, 255, 0.24)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.06) 0px 1px 1px 0px",
  border: "1px solid rgba(7, 187, 255, 0.6)",
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
  cursor: "pointer",
  "&:hover": {
    border: "1px solid rgba(0, 123, 255, 0.6)",
    background: "#fefefe",
    transform: "translateY(-1px)",
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
  background: "#FDDA0D",
  color: "#FDDA0D",
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
  cursor: "pointer",
  background: "#00FF7F",
  color: "#00FF7F",
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

const PermanentCell = ({
  schedule,
  navigateUpdate,
  deleteOneSched,
  socket,
  userNotif,
}) => {
  const [notifications, setNotifications] = useState("");
  const auth = useSelector(authSelector);

  const handleNotifs = (type) => {
    socket.emit("sendNotification", {
      senderName: userNotif,
      receiverName: schedule.parent,
      type,
    });
  };

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log(notifications);

  return (
    <Cell key={schedule._id}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <div
          style={{
            color: "#007bff",
            padding: "0 0 0 3px",
            fontWeight: "500",
          }}
        >
          {schedule.nameOfStudent}
          {schedule.tempStudentName && schedule.tempStudentName.nameOfStudent}
        </div>
        <CloseSharpIcon
          sx={{
            color: "#1434A4",
            fontSize: "16px",
          }}
          onClick={() => deleteOneSched(schedule._id)}
        />
      </div>
      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
        {schedule.isActive === "Present" ? (
          <div
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#2E8B57",
            }}
          >
            {schedule.isActive}
          </div>
        ) : (
          <div
            style={{
              fontSize: "13px",
              fontWeight: "400",
              color: "#ff3131",
            }}
          >
            {schedule.isActive}
          </div>
        )}
        <div
          style={{
            fontSize: "13px",
            fontWeight: "500",
            color: "#1434AF",
          }}
        >
          {schedule.timing} | {schedule.studentType}
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
              <PersonIcon
                sx={{
                  fontSize: "14px",
                }}
              />
            </LowerIconDiv>
            {auth && auth.userDetails.role === "Administrator" && (
              <>
                <LowerIconDiv2 onClick={() => navigateUpdate(schedule._id)}>
                  <EditIcon
                    sx={{
                      fontSize: "14px",
                    }}
                  />
                </LowerIconDiv2>
                <LowerIconDiv3>
                  <BsCheckLg style={{ fontSize: "14px" }} />
                </LowerIconDiv3>
                <LowerIconDiv4>
                  <BlockIcon sx={{ fontSize: "14px" }} />
                </LowerIconDiv4>
              </>
            )}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {schedule.isActive === "Present" && (
              <BsCheckCircleFill
                style={{ color: "#007bff", fontSize: "18px" }}
              />
            )}
            {schedule.isActive === "Absent" && (
              <BsXCircleFill style={{ color: "#ff3131", fontSize: "18px" }} />
            )}
            {schedule.isActive === "No info yet" && (
              <BsQuestionLg style={{ color: "#122c8e", fontSize: "18px" }} />
            )}
          </div>
        </div>
      </div>
    </Cell>
  );
};

export default PermanentCell;
