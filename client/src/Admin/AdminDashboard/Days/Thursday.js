import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import SwitchLeftIcon from "@mui/icons-material/SwitchLeft";
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
import Tilt from "react-parallax-tilt";

const ThursdayWrapper = styled("div")({
  // border: "2px solid #white",
  // padding: "40px",
  // borderRadius: "7px"
});

const FormTitle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "0",
  padding: "0",
});

const TableTitle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "0",
  padding: "12px 0px 8px 0px",
  width: "100%",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  // width: "inherit",
  // height: "inherit",
  gap: "10px",
});

const Permanent = styled("div")({
  // width: "33%",
  // height: "91%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
});

const Temporary = styled("div")({
  // width: "67%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  padding: "0 0px 10px 10px",
});

const CellCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  gap: "10px",
});

const CellCon2 = styled("div")({
  display: "flex",
  justifyContent: "center",
});

const Cell = styled("div")({
  backgroundImage:
    "radial-gradient(at bottom left, rgba(117, 255, 220, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(248, 215, 251, 0.15) 87.8%)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
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
  color: "white",
  fontSize: "16px",
  fontWeight: "600",
  padding: "10px",
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
  "&:focus": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  },
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    transform: "translateY(-3px)",
  },
  "&:active": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
    transform: "translateY(3px)",
  },
});

const CellTemp = styled("div")({
  backgroundImage:
    "radial-gradient(at top right, rgba(117, 255, 220, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(248, 215, 251, 0.15) 87.8%)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
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
  "&:focus": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
  },
  "&:hover": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
    transform: "translateY(-3px)",
  },
  "&:active": {
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 8px",
    transform: "translateY(3px)",
  },
});

const Cell2 = styled("div")({
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  border: "1px dashed #07bbff",
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
});

const IconContainer = styled("div")(({ theme }) => ({
  backgroundImage:
    "radial-gradient(at bottom left, rgba(117, 255, 220, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(248, 215, 251, 0.15) 87.8%)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid #5adaff",
  borderRadius: "24px",
  cursor: "pointer",
  padding: "6px",
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
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "600",
  "&:focus": {
    boxShadow: `rgba(0, 0, 0, 0.1) 0 0 0 1.5px, rgba(0, 0, 0, 0.1) 0 2px 4px, rgba(0, 0, 0, 0.1) 0 7px 13px 0px, rgba(0, 0, 0, 0.1) 0 0px 0 inset`,
  },
  "&:hover": {
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0 4px 8px, rgba(0, 0, 0, 0.1) 0 7px 13px 0px, rgba(0, 0, 0, 0.1) 0 0px 0",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `rgba(0, 0, 0, 0.1) 0 3px 7px`,
    transform: "translateY(2px)",
  },
}));

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
  transition: "width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
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
  transition: "width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
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
  transition: "width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
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
  transition: "width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Thursday = () => {
  const [showDiv, setShowDiv] = useState(true);
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
      // const filteredSchedules = res.data.filter(
      //   (schedule) => schedule.schedType === "Permanent"
      // );
      setSchedules(res.data);
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

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <ThursdayWrapper>
      <FormTitle>
        <h2 style={{ color: "#007bff", margin: "0", padding: "0" }}>
          Thursday
        </h2>
        <IconContainer onClick={toggleDiv}>
          <SwitchLeftIcon fontSize="small" sx={{ color: "#007bff" }} />
        </IconContainer>
      </FormTitle>
      <TableTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "52.3%",
          }}
        >
          <h5
            style={{
              color: "#e4e4e4",
              margin: "0",
              padding: "0",
              fontWeight: "400",
            }}
          >
            *Permanent
          </h5>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "47.7%",
          }}
        >
          <h5
            style={{
              color: "#e4e4e4",
              margin: "0",
              padding: "0",
              fontWeight: "400",
            }}
          >
            *Temporary
          </h5>
        </div>
      </TableTitle>
      {showDiv ? (
        <Flexer>
          <Permanent>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "7 AM to 8 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "7 AM to 8 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "7 AM to 8 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "7 AM to 8 AM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "8 AM to 9 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "8 AM to 9 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "8 AM to 9 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "8 AM to 9 AM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "9 AM to 10 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "9 AM to 10 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "9 AM to 10 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "9 AM to 10 AM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "10 AM to 11 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "10 AM to 11 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "10 AM to 11 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "10 AM to 11 AM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "11 AM to 12 NN" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "11 AM to 12 NN" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "11 AM to 12 NN" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "11 AM to 12 NN" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
          </Permanent>

          <Temporary>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "7 AM to 8 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#1434A4",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "7 AM to 8 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "8 AM to 9 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#1434A4",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "8 AM to 9 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "9 AM to 10 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#1434A4",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "9 AM to 10 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "10 AM to 11 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "10 AM to 11 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "11 AM to 12 NN" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "11 AM to 12 NN" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
          </Temporary>
        </Flexer>
      ) : (
        //second page
        <Flexer>
          <Permanent>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "12 NN to 1 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "12 NN to 1 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "12 NN to 1 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "12 NN to 1 PM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "1 PM to 2 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "1 PM to 2 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "1 PM to 2 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "1 PM to 2 PM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "2 PM to 3 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "2 PM to 3 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "2 PM to 3 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "2 PM to 3 PM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "3 PM to 4 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "3 PM to 4 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "3 PM to 4 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "3 PM to 4 PM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Thursday" &&
                      schedule.timing === "4 PM to 5 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Thursday" &&
                      schedule.timing === "4 PM to 5 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <Cell key={schedule.id}>
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
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
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
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "#1434AF",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#1434A4",
                          }}
                        >
                          {schedule.studentType}
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
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
                            {auth &&
                              auth.userDetails.role === "Administrator" && (
                                <>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon
                                      sx={{
                                        fontSize: "14px",
                                      }}
                                    />
                                  </LowerIconDiv2>
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
                                </>
                              )}
                          </div>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "flex-end",
                            }}
                          >
                            {schedule.schedType === "Temporary" ? (
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "white" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </Cell>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Thursday" &&
                    schedule.timing === "4 PM to 5 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Thursday" &&
                    schedule.timing === "4 PM to 5 PM" &&
                    schedule.schedType === "Temporary" &&
                    schedule.isActive === true)
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
          </Permanent>

          <Temporary>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "12 NN to 1 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "12 NN to 1 PM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "1 PM to 2 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "1 PM to 2 PM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "2 PM to 3 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "2 PM to 3 PM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "3 PM to 4 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "3 PM to 4 PM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Thursday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "4 PM to 5 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <CellTemp key={schedule.id}>
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
                            color: "#5D3FD3",
                            padding: "0px 0 0 3px",
                          }}
                        >
                          {schedule.nameOfStudent}
                          {schedule.tempStudentName &&
                            schedule.tempStudentName.nameOfStudent}
                        </div>
                        {auth && auth.userDetails.role === "Administrator" && (
                          <CloseSharpIcon
                            sx={{
                              color: "#1434A4",
                              fontSize: "16px",
                            }}
                            onClick={() => deleteOneSched(schedule._id)}
                          />
                        )}
                      </div>
                      <div style={{ padding: "0 0 0 3px", marginTop: "0px" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            fontWeight: "500",
                            color: "#07bbff",
                          }}
                        >
                          {schedule.dateTime
                            ? schedule.dateTime.slice(0, -5)
                            : ""}
                        </div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "400",
                            color: "#007bff",
                          }}
                        >
                          [
                          {schedule.permanentSched &&
                            schedule.permanentSched.nameOfStudent}
                          ]
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
                              <WatchLaterIcon
                                fontSize="small"
                                sx={{ color: "#FFBF00" }}
                              />
                            ) : (
                              ""
                            )}
                            {schedule.isActive ? (
                              <CheckCircleIcon
                                fontSize="small"
                                sx={{ color: "#1434A4" }}
                              />
                            ) : (
                              <CancelIcon
                                fontSize="small"
                                sx={{ color: "#FF3131" }}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </CellTemp>
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Thursday" &&
                  (schedule.permanentSched &&
                    schedule.permanentSched.timing) === "4 PM to 5 PM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    <div
                      style={{
                        color: "#07bbff",
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                        padding: "0",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      Empty
                    </div>
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
          </Temporary>
        </Flexer>
      )}
    </ThursdayWrapper>
  );
};

export default Thursday;
