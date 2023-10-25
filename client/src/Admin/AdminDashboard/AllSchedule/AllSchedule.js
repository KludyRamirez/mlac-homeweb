import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";

import FaceIcon from "@mui/icons-material/Face";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TodayIcon from "@mui/icons-material/Today";
import Face2Icon from "@mui/icons-material/Face2";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TouchAppIcon from "@mui/icons-material/TouchApp";
import arrow from "../../../images/arrow.svg";

const AllScheduleContainer = styled("div")({
  display: "flex",
  boxShadow: "rgba(0, 123, 255, 0.20) 0px 25px 50px -12px",
  padding: "40px",
  "@media (max-width: 1366px)": {
    width: "555px",
    overflow: "hidden",
    overflowX: "scroll",
  },
});

const ContentCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  gap: "10px",
});

export const StyledButton = styled("div")(({ theme }) => ({
  alignItems: "center",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  border: 0,
  borderRadius: "25px",
  boxShadow:
    "rgba(0, 123, 255, 0.25) 0 2px 4px, rgba(0, 123, 255, 0.25) 0 7px 13px -3px, rgba(0, 123, 255, 0.25) 0 -3px 0 inset",
  boxSizing: "border-box",
  color: "#fff",
  cursor: "pointer",
  display: "inline-flex",
  width: "50px",
  height: "50px",
  justifyContent: "center",
  lineHeight: 1,
  listStyle: "none",
  overflow: "hidden",
  paddingLeft: "16px",
  paddingRight: "16px",
  position: "relative",
  textAlign: "left",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  whiteSpace: "nowrap",
  willChange: "box-shadow, transform",
  fontSize: "18px",
  "&:focus": {
    boxShadow: `rgba(0, 123, 255, 0.25) 0 0 0 1.5px inset, rgba(0, 123, 255, 0.25) 0 2px 4px, rgba(0, 123, 255, 0.25) 0 7px 13px -3px, rgba(0, 123, 255, 0.25) 0 -3px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 123, 255, 0.25) 0 4px 8px, rgba(0, 123, 255, 0.25) 0 7px 13px -3px, rgba(0, 123, 255, 0.25) 0 -3px 0 inset",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `rgba(0, 123, 255, 0.25) 0 3px 7px inset`,
    transform: "translateY(2px)",
  },
}));

const TitleCon = styled("div")(({ theme }) => ({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #FFFFFF, #FFFFFF  100%)",
  border: 0,
  borderRadius: "34px",
  boxShadow:
    "rgba(0, 123, 255, 0.25) 0 2px 4px, rgba(0, 123, 255, 0.25) 0 7px 13px 0px, rgba(0, 123, 255, 0.25) 0 0px 0",
  boxSizing: "border-box",
  cursor: "pointer",
  width: "34px",
  height: "34px",
  lineHeight: 1,
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textAlign: "left",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  whiteSpace: "nowrap",
  willChange: "box-shadow, transform",
  fontSize: "14px",
  zIndex: "2",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontWeight: "600",
  "&:focus": {
    boxShadow: `rgba(0, 123, 255, 0.25) 0 0 0 1.5px, rgba(0, 123, 255, 0.25) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px 0px, rgba(0, 123, 255, 0.25) 0 0px 0`,
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 123, 255, 0.25) 0 4px 8px, rgba(0, 123, 255, 0.25) 0 7px 13px 0px, rgba(0, 123, 255, 0.25) 0 0px 0 ",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `rgba(0, 123, 255, 0.25) 0 3px 7px`,
    transform: "translateY(2px)",
  },
}));

const TitleCon2 = styled("div")(({ theme }) => ({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  border: 0,
  borderRadius: "6px",
  boxShadow:
    "rgba(0, 123, 255, 0.25) 0 2px 4px, rgba(0, 123, 255, 0.25) 0 7px 13px 0px, rgba(0, 123, 255, 0.25) 0 0px 0",
  boxSizing: "border-box",
  cursor: "pointer",
  width: "90px",
  height: "34px",
  lineHeight: 1,
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textAlign: "left",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  whiteSpace: "nowrap",
  willChange: "box-shadow, transform",
  fontSize: "14px",
  textTransform: "uppercase",
  textAlign: "center",
  paddingTop: "10px",
  color: "white",
  fontWeight: "bold",
  "&:focus": {
    boxShadow: `rgba(0, 123, 255, 0.25) 0 0 0 1.5px, rgba(0, 123, 255, 0.25) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px 0px, rgba(0, 123, 255, 0.25) 0 0px 0`,
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 123, 255, 0.25) 0 4px 8px, rgba(0, 123, 255, 0.25) 0 7px 13px 0px, rgba(0, 123, 255, 0.25) 0 0px 0 ",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `rgba(0, 123, 255, 0.25) 0 3px 7px`,
    transform: "translateY(2px)",
  },
}));

const ActionDel = styled(Button)({
  color: "#007bff",
});

const ActionEdit = styled(Button)({
  color: "#007bff",
});

const Columner = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "165px",
  gap: "10px",
});

const DetailsCon = styled("div")({
  width: "100%",
  // height: "75vh",
  // borderTop: "2px solid #B6D0E2",
  // borderLeft: "2px solid #B6D0E2",
  // borderBottom: "2px solid #B6D0E2",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});
const TDetailsCon = styled("div")({
  width: "100%",
  // height: "75vh",
  // borderTop: "2px solid #B6D0E2",
  // borderBottom: "2px solid #B6D0E2",
  borderLeft: "1px solid #B6D0E2",
  // borderRight: "1px solid #B6D0E2",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
});
const BDetailsCon = styled("div")({
  width: "100%",
  // height: "75vh",
  // borderTop: "2px solid #B6D0E2",
  // borderRight: "2px solid #B6D0E2",
  // borderBottom: "2px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});

const MapCon = styled("div")({
  height: "40px",
  width: "120%",
  color: "#007bff",
  paddingLeft: "8px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid #B6D0E2",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  "&:last-child": {
    border: "none",
  },
});

const MapCon1 = styled("div")({
  height: "40px",
  width: "100%",
  color: "#007bff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid #B6D0E2",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  "&:last-child": {
    border: "none",
  },
});

const MapCon2 = styled("div")({
  height: "40px",
  width: "100%",
  color: "#007bff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid #B6D0E2",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
  "&:last-child": {
    border: "none",
  },
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AllSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const auth = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    getSchedules();
  }, []);

  const getSchedules = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.get(`${process.env.REACT_APP_API}/schedule`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      const filteredSchedules = res.data.filter(
        (schedule) => schedule.schedType === "Permanent"
      );
      setSchedules(filteredSchedules);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const deleteOneSched = async (id) => {
    if (!auth.userDetails.token) {
      // Handle the case where the token is missing
      console.error("Authentication token not found.");
      return;
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API}/schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      getSchedules();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const navigateUpdate = (id) => {
    history.push(`/schedule/${id}`);
    window.location.reload();
  };

  return (
    <AllScheduleContainer>
      <ContentCon>
        <Columner>
          <Flexer>
            <TitleCon>
              <FaceIcon fontSize="small" sx={{ color: "#007bff" }} />
            </TitleCon>
            <img
              src={arrow}
              alt=""
              style={{ margin: "12px 0 0 2px", transform: "rotate(30deg)" }}
            />
            <TitleCon2>Student</TitleCon2>
          </Flexer>
          <DetailsCon>
            {schedules.map((schedule) => (
              <MapCon1 key={schedule._id}>{schedule.nameOfStudent}</MapCon1>
            ))}
          </DetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <TodayIcon fontSize="small" sx={{ color: "#007bff" }} />
            </TitleCon>
            <img
              src={arrow}
              alt=""
              style={{ margin: "12px 0 0 2px", transform: "rotate(30deg)" }}
            />
            <TitleCon2>Day</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.day}</MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <AccessTimeFilledIcon
                fontSize="small"
                sx={{ color: "#007bff" }}
              />
            </TitleCon>
            <img
              src={arrow}
              alt=""
              style={{ margin: "12px 0 0 2px", transform: "rotate(30deg)" }}
            />
            <TitleCon2>Time</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.timing}</MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <Face2Icon fontSize="small" sx={{ color: "#007bff" }} />
            </TitleCon>
            <img
              src={arrow}
              alt=""
              style={{ margin: "12px 0 0 2px", transform: "rotate(30deg)" }}
            />
            <TitleCon2>Parent</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.parent}</MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <ConnectWithoutContactIcon
                fontSize="small"
                sx={{ color: "#007bff" }}
              />
            </TitleCon>
            <img
              src={arrow}
              alt=""
              style={{ margin: "12px 0 0 2px", transform: "rotate(30deg)" }}
            />
            <TitleCon2>Type</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                {schedule.studentType}/
                {schedule.isActive ? "Present" : "Absent"}
              </MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <TouchAppIcon fontSize="small" sx={{ color: "#007bff" }} />
            </TitleCon>
            <img
              src={arrow}
              alt=""
              style={{ margin: "12px 0 0 2px", transform: "rotate(30deg)" }}
            />
            <TitleCon2>Action</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon2 key={schedule._id}>
                <ActionEdit onClick={() => navigateUpdate(schedule._id)}>
                  <EditNoteIcon fontSize="small" />
                </ActionEdit>
                <ActionDel onClick={() => deleteOneSched(schedule._id)}>
                  <DeleteOutlineIcon fontSize="small" sx={{ color: "red" }} />
                </ActionDel>
              </MapCon2>
            ))}
          </TDetailsCon>
        </Columner>
      </ContentCon>
    </AllScheduleContainer>
  );
};

export default AllSchedule;
