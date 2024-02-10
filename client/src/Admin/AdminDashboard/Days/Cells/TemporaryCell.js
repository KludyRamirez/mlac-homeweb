import React from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/system";
import { keyframes } from "@mui/styled-engine";
import { createSelector } from "reselect";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import BlockIcon from "@mui/icons-material/Block";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import TimerIcon from "@mui/icons-material/Timer";

const flowyBackground = keyframes`
  0% {
   background-image: rgba(255, 255, 255, 1);
}
  25% {
    background-image: radial-gradient(at bottom left, rgba(7, 187, 255, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(255, 255, 255, 0.15) 87.8%);
  }
  50% {
    background-image: radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%);
  }
  75% {
    background-image: radial-gradient(at bottom left, rgba(204, 251, 241, 0.15) 6%, rgba(255, 255, 255, 0.15) 47.6%, rgba(7, 187, 255, 0.20) 87.8%);
  }
  100% {
    background-image: radial-gradient(at bottom left, rgba(7, 187, 255, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(255, 255, 255, 0.15) 87.8%);
  }
`;

const CellTemp = styled("div")({
  backgroundImage:
    "radial-gradient(at bottom left, rgba(7,187,255, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(209, 213, 219, 0.06) 87.8%)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  border: "1px solid #07bbff",
  borderRadius: "10px",
  width: "176px",
  height: "106px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "space-between",
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  padding: "10px",
  cursor: "pointer",
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textDecoration: "none",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition: "box-shadow .15s, transform .15s",

  "&:hover": {
    animation: `${flowyBackground} 0.1s ease-in`,
    boxShadow: "rgba(0, 0, 0, 0.06) 0px 2px 4px",
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

const LowerIconDiv3 = styled("div")({
  background: "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)",
  color: "transparent",
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

const TemporaryCell = ({ schedule, deleteOneTempSched }) => {
  const auth = useSelector(authSelector);
  return (
    <CellTemp key={schedule._id}>
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
            padding: "0px 0 0 3px",
          }}
        >
          {schedule.nameOfStudent}
          {schedule.tempStudentName && schedule.tempStudentName.nameOfStudent}
        </div>
        {auth && auth.userDetails.role === "Administrator" && (
          <CloseSharpIcon
            sx={{
              color: "#007bff",
              fontSize: "16px",
            }}
            onClick={() => deleteOneTempSched(schedule._id)}
          />
        )}
      </div>
      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "500",
            color: "#1434A4",
          }}
        >
          {schedule.dateTime ? schedule.dateTime.slice(0, -5) : ""}
        </div>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "400",
            color: "#1434A4",
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
            <LowerIconDiv3>
              <CheckIcon
                sx={{
                  fontSize: "14px",
                }}
              />
            </LowerIconDiv3>
            <LowerIconDiv4>
              <BlockIcon
                sx={{
                  fontSize: "14px",
                }}
              />
            </LowerIconDiv4>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            {schedule.schedType === "Temporary" ? (
              <TimerIcon fontSize="small" sx={{ color: "#07bbff" }} />
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
