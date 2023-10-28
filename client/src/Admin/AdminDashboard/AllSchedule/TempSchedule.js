import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import axios from "axios";
import FaceIcon from "@mui/icons-material/Face";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import TodayIcon from "@mui/icons-material/Today";
import Face2Icon from "@mui/icons-material/Face2";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import TouchAppIcon from "@mui/icons-material/TouchApp";

const AllScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
  height: "100%",
  width: "70%",
});

const ContentCon = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "start",
  padding: "35px 30px",
  gap: "10px",
  flexWrap: "wrap",
});

export const StyledButton = styled("div")(({ theme }) => ({
  alignItems: "center",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  border: 0,
  borderRadius: "25px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset",
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
    boxShadow: `${theme.palette.primary.main} 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, ${theme.palette.primary.main} 0 -3px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, " +
      theme.palette.primary.main +
      " 0 -3px 0 inset",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `${theme.palette.primary.main} 0 3px 7px inset`,
    transform: "translateY(2px)",
  },
}));

const TitleCon = styled("div")(({ theme }) => ({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #FFFFFF, #FFFFFF  100%)",
  border: 0,
  borderRadius: "5px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px 0px, rgba(58, 65, 111, .5) 0 0px 0",
  boxSizing: "border-box",
  cursor: "pointer",
  width: "40px",
  height: "40px",
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
  fontSize: "14px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontWeight: "600",
  "&:focus": {
    boxShadow: `#B6D0E2 0 0 0 1.5px, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px 0px, #B6D0E2 0 -3px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px 0px, #B6D0E2 0 0px 0",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `#B6D0E2 0 3px 7px`,
    transform: "translateY(2px)",
  },
}));

const TitleCon2 = styled(Button)(({ theme }) => ({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  border: 0,
  borderRadius: "5px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset",
  boxSizing: "border-box",
  cursor: "pointer",
  width: "115px",
  height: "40px",
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
  fontSize: "1 4px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  fontWeight: "600",
  "&:focus": {
    boxShadow: `${theme.palette.primary.main} 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, ${theme.palette.primary.main} 0 -3px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, " +
      theme.palette.primary.main +
      " 0 -3px 0 inset",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `${theme.palette.primary.main} 0 3px 7px inset`,
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
  height: "100%",
  width: "165px",
  gap: "20px",
});

const DetailsCon = styled("div")({
  height: "100%",
  width: "100%",
  border: "2px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});
const TDetailsCon = styled("div")({
  height: "100%",
  width: "100%",
  border: "2px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
});
const BDetailsCon = styled("div")({
  height: "100%",
  width: "100%",
  border: "2px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});

const MapCon = styled("div")({
  height: "40px",
  width: "130px",
  color: "#007bff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid #B6D0E2",
  fontSize: "13px",
  fontWeight: "600",
  textAlign: "center",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const TempSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const auth = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    getTempSchedules();
  }, [auth]);

  const getTempSchedules = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.get(
        `${process.env.REACT_APP_API}/temp-schedule`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      const filteredSchedules = res.data.filter(
        (schedule) =>
          schedule.schedType === "Temporary" &&
          schedule.tempStudentName &&
          schedule.tempStudentName.studentType === "Dyad"
      );
      setSchedules(filteredSchedules);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const deleteOneTempSched = async (id) => {
    if (!auth.userDetails.token) {
      // Handle the case where the token is missing
      console.error("Authentication token not found.");
      return;
    }
    try {
      await axios.delete(`${process.env.REACT_APP_API}/temp-schedule/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      getTempSchedules();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  return (
    <AllScheduleContainer>
      <ContentCon>
        <Columner>
          <Flexer>
            <TitleCon>
              <FaceIcon sx={{ color: "#007bff" }} />
            </TitleCon>
            <TitleCon2>Student</TitleCon2>
          </Flexer>
          <DetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                {schedule.tempStudentName &&
                  schedule.tempStudentName.nameOfStudent}
              </MapCon>
            ))}
          </DetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <TodayIcon sx={{ color: "#007bff" }} />
            </TitleCon>
            <TitleCon2>Day</TitleCon2>
          </Flexer>
          <BDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                {schedule.permanentSched && schedule.permanentSched.day}
              </MapCon>
            ))}
          </BDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <AccessTimeFilledIcon sx={{ color: "#007bff" }} />
            </TitleCon>
            <TitleCon2>Time</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                {schedule.permanentSched && schedule.permanentSched.timing}
              </MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <Face2Icon sx={{ color: "#007bff" }} />
            </TitleCon>
            <TitleCon2>Date</TitleCon2>
          </Flexer>
          <BDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.dateTime}</MapCon>
            ))}
          </BDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <ConnectWithoutContactIcon sx={{ color: "#007bff" }} />
            </TitleCon>
            <TitleCon2>With</TitleCon2>
          </Flexer>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                {schedule.permanentSched &&
                  schedule.permanentSched.nameOfStudent}
              </MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <Flexer>
            <TitleCon>
              <TouchAppIcon sx={{ color: "#007bff" }} />
            </TitleCon>
            <TitleCon2>Action</TitleCon2>
          </Flexer>
          <BDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                <ActionDel onClick={() => deleteOneTempSched(schedule._id)}>
                  <DeleteOutlineIcon fontSize="small" />
                </ActionDel>
              </MapCon>
            ))}
          </BDetailsCon>
        </Columner>
      </ContentCon>
    </AllScheduleContainer>
  );
};

export default TempSchedule;
