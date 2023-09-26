import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";

const AllScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "end",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
  height: "100%",
  width: "65%",
});

const ContentCon = styled("div")({
  width: "90%",
  height: "100%",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "start",
});

export const StyledButton = styled("div")(({ theme }) => ({
  alignItems: "center",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  border: 0,
  borderRadius: "30px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset",
  boxSizing: "border-box",
  color: "#fff",
  cursor: "pointer",
  display: "inline-flex",
  fontFamily: '"JetBrains Mono", monospace',
  width: "60px",
  height: "60px",
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

const TitleCon = styled(Button)(({ theme }) => ({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  border: 0,
  borderRadius: "3px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset",
  boxSizing: "border-box",
  cursor: "pointer",
  fontFamily: '"JetBrains Mono", monospace',
  width: "140px",
  height: "60px",
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

const YellowBox = styled("div")({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #FFFAA0 0, #F4C430 100%)",
  border: 0,
  borderRadius: "30px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset",
  boxSizing: "border-box",
  cursor: "pointer",
  fontFamily: '"JetBrains Mono", monospace',
  width: "60px",
  height: "60px",

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
    boxShadow: `#F4BB44 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #F4BB44 0 -3px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #F4BB44 0 -3px 0 inset ",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `#F4BB44 0 3px 7px inset`,
    transform: "translateY(2px)",
  },
});

const RedBox = styled("div")({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #FAA0A0 0, #FF2400 100%)",
  border: 0,
  borderRadius: "20px",
  boxShadow:
    "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 -3px 0 inset",
  boxSizing: "border-box",
  cursor: "pointer",
  fontFamily: '"JetBrains Mono", monospace',
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
    boxShadow: `#FF4433 0 0 0 1.5px inset, rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #FF4433 0 -3px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(45, 35, 66, .4) 0 4px 8px, rgba(45, 35, 66, .3) 0 7px 13px -3px, #FF4433 0 -3px 0 inset ",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `#FF4433 0 3px 7px inset`,
    transform: "translateY(2px)",
  },
});

const ColorBoxCon = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
});

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
  width: "100%",
  gap: "30px",
});

const DetailsCon = styled("div")({
  height: "80%",
  width: "100%",
  borderTop: "1px solid #B6D0E2",
  borderRight: "1px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});
const TDetailsCon = styled("div")({
  height: "80%",
  width: "100%",
  borderTop: "1px solid #B6D0E2",
  borderLeft: "1px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  textAlign: "center",
  flexDirection: "column",
});
const BDetailsCon = styled("div")({
  height: "80%",
  width: "100%",
  borderBottom: "1px solid #B6D0E2",
  borderLeft: "1px solid #B6D0E2",
  borderRadius: "1px",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  textAlign: "center",
});

const MapCon = styled("div")({
  height: "40px",
  width: "120px",
  color: "#007bff",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderBottom: "1px solid #B6D0E2",
  fontSize: "14px",
  fontWeight: "600",
  fontFamily: '"JetBrains Mono", monospace',
  textAlign: "center",
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AllSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const auth = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    getSchedules();
  }, [auth]);

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
          <TitleCon>Name [Student]</TitleCon>
          <DetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.nameOfStudent}</MapCon>
            ))}
          </DetailsCon>
        </Columner>
        <Columner>
          <TitleCon>Day [Schedule]</TitleCon>
          <BDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.day}</MapCon>
            ))}
          </BDetailsCon>
        </Columner>
        <Columner>
          <TitleCon>Time [Schedule]</TitleCon>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.timing}</MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <TitleCon>Parents</TitleCon>
          <BDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                {schedule.parent.firstname} {schedule.parent.lastname}
              </MapCon>
            ))}
          </BDetailsCon>
        </Columner>
        <Columner>
          <TitleCon>Type [Student]</TitleCon>
          <TDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>{schedule.studentType}</MapCon>
            ))}
          </TDetailsCon>
        </Columner>
        <Columner>
          <ColorBoxCon>
            <YellowBox />
            <RedBox />
          </ColorBoxCon>
          <BDetailsCon>
            {schedules.map((schedule) => (
              <MapCon key={schedule._id}>
                <ActionEdit onClick={() => navigateUpdate(schedule._id)}>
                  <EditNoteIcon fontSize="small" />
                </ActionEdit>
                <ActionDel onClick={() => deleteOneSched(schedule._id)}>
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

export default AllSchedule;
