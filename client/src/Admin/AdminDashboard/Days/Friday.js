// Bukas ang task mo ay chat, at ang iniwan mo kagabi ay scheduleExists na studentType = Solo
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import PermanentCell from "./Cells/PermanentCell";
import TemporaryCell from "./Cells/TemporaryCell";
import { FaCircleCheck } from "react-icons/fa6";
import { FaCircleXmark } from "react-icons/fa6";

const FridayWrapper = styled("div")({});

const FormTitle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-end",
  margin: "0",
  padding: "0",
});

const TableTitle = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  margin: "0",
  padding: "24px 0px 0px 0px",
  width: "100%",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
  width: "100%",
});

const Permanent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "12px",
});

const Solo = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "12px",
  padding: "0 0px 10px 10px",
});

const Temporary = styled("div")({
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "12px",
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
  gap: "16px",
});

const Cell2 = styled("div")({
  background: "rgba(0, 0, 0, 0.02)",
  border: "1px solid rgba(0, 123, 255, 0.1)",
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
    background: "white",
  },
});

const IniFlex = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  gap: "40px",

  // "@media (max-width: 767px)": {
  //   overflow: "hidden",
  //   overflowX: "scroll",
  // },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Friday = ({ socket, userNotif }) => {
  const [schedules, setSchedules] = useState([]);
  const [tempSchedules, setTempSchedules] = useState([]);
  const [tempSoloSchedules, setTempSoloSchedules] = useState([]);
  const [nextSixDays, setNextSixDays] = useState([]);
  const [cell2Count, setCell2Count] = useState(0);
  const auth = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    handleNextSixDays();
    getSchedules();
    getTempSchedules();
    getTempSoloSchedules();
  }, []);

  useEffect(() => {
    handleEmptyScheduleCount();
  }, [schedules]);

  const handleNextSixDays = () => {
    const today = new Date();
    const nextSixDays = [];

    for (let i = 0; nextSixDays.length < 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      if (nextDate.getDay() !== 0) {
        const formattedDate = nextDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        const dayOfWeek = nextDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        nextSixDays.push({
          date: formattedDate,
          day: dayOfWeek,
        });
      }
    }

    setNextSixDays(nextSixDays);
  };

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
      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

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
      setTempSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const getTempSoloSchedules = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.get(
        `${process.env.REACT_APP_API}/temp-soloschedule`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      setTempSoloSchedules(res.data);
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

  const deleteOneTempSoloSched = async (id) => {
    if (!auth.userDetails.token) {
      // Handle the case where the token is missing
      console.error("Authentication token not found.");
      return;
    }
    try {
      await axios.delete(
        `${process.env.REACT_APP_API}/temp-soloschedule/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      getTempSoloSchedules();
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEmptyScheduleCount = () => {
    const count =
      schedules.filter(
        (schedule) =>
          (schedule.day === "Friday" &&
            schedule.timing === "8 AM to 9 AM" &&
            schedule.schedType === "Permanent" &&
            schedule.isActive === true) ||
          (schedule.tempSoloDay === "Friday" &&
            schedule.timing === "8 AM to 9 AM" &&
            schedule.schedType === "Temporary" &&
            schedule.isActive === true)
      ).length +
      schedules.filter(
        (schedule) =>
          (schedule.day === "Friday" &&
            schedule.timing === "9 AM to 10 AM" &&
            schedule.schedType === "Permanent" &&
            schedule.isActive === true) ||
          (schedule.tempSoloDay === "Friday" &&
            schedule.timing === "9 AM to 10 AM" &&
            schedule.schedType === "Temporary" &&
            schedule.isActive === true)
      ).length;

    setCell2Count(count);
  };

  const navigateUpdate = (id) => {
    history.push(`/schedule/${id}`);
    window.location.reload();
  };

  return (
    <FridayWrapper>
      <FormTitle>
        <h2 style={{ color: "#007bff", margin: "14px 0 0 0", padding: "0" }}>
          Friday,
        </h2>
      </FormTitle>
      {nextSixDays
        .filter((date) => date.day === "Friday")
        .map((date, index) => (
          <div
            key={index}
            style={{
              fontSize: "52px",
              color: "#07bbff",
              marginTop: "10px",
              marginLeft: "-5px",
              fontWeight: "300",
            }}
          >
            {date.date}
          </div>
        ))}
      <IniFlex>
        <Flexer>
          <Permanent>
            <TableTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "70%",
                }}
              >
                <h6
                  style={{
                    color: "#007bff",
                    margin: "0",
                    padding: "0",
                    fontWeight: "600",
                    letterSpacing: "0.3px",
                  }}
                >
                  Permanent
                </h6>
              </div>
            </TableTitle>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    schedule.day === "Friday" &&
                    schedule.timing === "8 AM to 9 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  schedule.day === "Friday" &&
                  schedule.timing === "8 AM to 9 AM" &&
                  schedule.schedType === "Permanent" &&
                  schedule.isActive === true
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "8 AM to 9 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    schedule.day === "Friday" &&
                    schedule.timing === "9 AM to 10 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  schedule.day === "Friday" &&
                  schedule.timing === "9 AM to 10 AM" &&
                  schedule.schedType === "Permanent" &&
                  schedule.isActive === true
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "9 AM to 10 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    schedule.day === "Friday" &&
                    schedule.timing === "10 AM to 11 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  schedule.day === "Friday" &&
                  schedule.timing === "10 AM to 11 AM" &&
                  schedule.schedType === "Permanent" &&
                  schedule.isActive === true
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "10 AM to 11 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    schedule.day === "Friday" &&
                    schedule.timing === "11 AM to 12 NN" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  schedule.day === "Friday" &&
                  schedule.timing === "11 AM to 12 NN" &&
                  schedule.schedType === "Permanent" &&
                  schedule.isActive === true
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "11 AM to 12 NN" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
          </Permanent>

          <Temporary>
            <TableTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "70%",
                }}
              >
                <h6
                  style={{
                    color: "#007bff",
                    margin: "0",
                    padding: "0",
                    fontWeight: "600",
                    letterSpacing: "0.3px",
                  }}
                >
                  Dyad Temporary
                </h6>
              </div>
            </TableTitle>
            <CellCon>
              {tempSchedules
                .filter(
                  (schedule) =>
                    ((schedule.permanentSched &&
                      schedule.permanentSched.day) === "Friday" &&
                      (schedule.permanentSched &&
                        schedule.permanentSched.timing) === "8 AM to 9 AM" &&
                      schedule.schedType === "Temporary") ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "8 AM to 9 AM" &&
                      schedule.schedType === "Temporary")
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSchedules.filter(
                (schedule) =>
                  ((schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "8 AM to 9 AM" &&
                    schedule.schedType === "Temporary") ||
                  (schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "8 AM to 9 AM" &&
                    schedule.schedType === "Temporary")
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "8 AM to 9 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 &&
                    schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "8 AM to 9 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.studentType === "Solo" &&
                        schedule.isActive === true
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {tempSchedules
                .filter(
                  (schedule) =>
                    ((schedule.permanentSched &&
                      schedule.permanentSched.day) === "Friday" &&
                      (schedule.permanentSched &&
                        schedule.permanentSched.timing) === "9 AM to 10 AM" &&
                      schedule.schedType === "Temporary") ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "9 AM to 10 AM" &&
                      schedule.schedType === "Temporary")
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSchedules.filter(
                (schedule) =>
                  ((schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "9 AM to 10 AM" &&
                    schedule.schedType === "Temporary") ||
                  (schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "9 AM to 10 AM" &&
                    schedule.schedType === "Temporary")
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "9 AM to 10 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 &&
                    schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "9 AM to 10 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.studentType === "Solo" &&
                        schedule.isActive === true
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {tempSchedules
                .filter(
                  (schedule) =>
                    ((schedule.permanentSched &&
                      schedule.permanentSched.day) === "Friday" &&
                      (schedule.permanentSched &&
                        schedule.permanentSched.timing) === "10 AM to 11 AM" &&
                      schedule.schedType === "Temporary") ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "10 AM to 11 AM" &&
                      schedule.schedType === "Temporary")
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSchedules.filter(
                (schedule) =>
                  ((schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "10 AM to 11 AM" &&
                    schedule.schedType === "Temporary") ||
                  (schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "10 AM to 11 AM" &&
                    schedule.schedType === "Temporary")
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "10 AM to 11 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 &&
                    schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "10 AM to 11 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.studentType === "Solo" &&
                        schedule.isActive === true
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
            <CellCon>
              {tempSchedules
                .filter(
                  (schedule) =>
                    ((schedule.permanentSched &&
                      schedule.permanentSched.day) === "Friday" &&
                      (schedule.permanentSched &&
                        schedule.permanentSched.timing) === "11 AM to 12 NN" &&
                      schedule.schedType === "Temporary") ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "11 AM to 12 NN" &&
                      schedule.schedType === "Temporary")
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSchedules.filter(
                (schedule) =>
                  ((schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "11 AM to 12 NN" &&
                    schedule.schedType === "Temporary") ||
                  (schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "11 AM to 12 NN" &&
                    schedule.schedType === "Temporary")
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {tempSoloSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "11 AM to 12 NN" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 &&
                    schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "11 AM to 12 NN" &&
                        schedule.schedType === "Permanent" &&
                        schedule.studentType === "Solo" &&
                        schedule.isActive === true
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon>
          </Temporary>

          <Solo>
            <TableTitle>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "70%",
                }}
              >
                <h6
                  style={{
                    color: "#007bff",
                    margin: "0",
                    padding: "0",
                    fontWeight: "600",
                    letterSpacing: "0.3px",
                  }}
                >
                  Solo Temporary
                </h6>
              </div>
            </TableTitle>
            <CellCon2>
              {tempSoloSchedules
                .filter(
                  (schedule) =>
                    schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "8 AM to 9 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSoloSchedules.filter(
                (schedule) =>
                  schedule.tempSoloDay === "Friday" &&
                  schedule.timing === "8 AM to 9 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "8 AM to 9 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.isActive === true
                    ).length === 0 &&
                    tempSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "8 AM to 9 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {tempSoloSchedules
                .filter(
                  (schedule) =>
                    schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "9 AM to 10 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSoloSchedules.filter(
                (schedule) =>
                  schedule.tempSoloDay === "Friday" &&
                  schedule.timing === "9 AM to 10 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "9 AM to 10 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.isActive === true
                    ).length === 0 &&
                    tempSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "9 AM to 10 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {tempSoloSchedules
                .filter(
                  (schedule) =>
                    schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "10 AM to 11 AM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSoloSchedules.filter(
                (schedule) =>
                  schedule.tempSoloDay === "Friday" &&
                  schedule.timing === "10 AM to 11 AM" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "10 AM to 11 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.isActive === true
                    ).length === 0 &&
                    tempSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "10 AM to 11 AM" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
            <CellCon2>
              {tempSoloSchedules
                .filter(
                  (schedule) =>
                    schedule.tempSoloDay === "Friday" &&
                    schedule.timing === "11 AM to 12 NN" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      userNotif={userNotif}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {tempSoloSchedules.filter(
                (schedule) =>
                  schedule.tempSoloDay === "Friday" &&
                  schedule.timing === "11 AM to 12 NN" &&
                  schedule.schedType === "Temporary"
              ).length === 0 && (
                <Tilt>
                  <Cell2>
                    {schedules.filter(
                      (schedule) =>
                        schedule.day === "Friday" &&
                        schedule.timing === "11 AM to 12 NN" &&
                        schedule.schedType === "Permanent" &&
                        schedule.isActive === true
                    ).length === 0 &&
                    tempSchedules.filter(
                      (schedule) =>
                        schedule.tempSoloDay === "Friday" &&
                        schedule.timing === "11 AM to 12 NN" &&
                        schedule.schedType === "Temporary"
                    ).length === 0 ? (
                      <div
                        style={{
                          color: "#007bff",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Available
                      </div>
                    ) : (
                      <div
                        style={{
                          color: "#ff3131",
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                          padding: "0",
                          fontSize: "11px",
                          fontWeight: "500",
                          letterSpacing: "0.3px",
                        }}
                      >
                        Occupied
                      </div>
                    )}
                  </Cell2>
                </Tilt>
              )}
            </CellCon2>
          </Solo>
        </Flexer>
      </IniFlex>
    </FridayWrapper>
  );
};

export default Friday;
