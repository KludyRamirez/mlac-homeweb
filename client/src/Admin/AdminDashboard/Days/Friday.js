import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import Tilt from "react-parallax-tilt";
import PermanentCell from "./Cells/PermanentCell";
import TemporaryCell from "./Cells/TemporaryCell";

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
  padding: "10px 0px 0px 0px",
  width: "100%",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "10px",
});

const Permanent = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
});

const Temporary = styled("div")({
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

const Cell2 = styled("div")({
  background: "rgba(0, 0, 0, 0.02)",
  border: "1px solid rgba(0, 0, 0, 0.05)",
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

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Friday = ({ socket, user }) => {
  const [schedules, setSchedules] = useState([]);
  const [tempSchedules, setTempSchedules] = useState([]);
  const [nextSixDays, setNextSixDays] = useState([]);
  const [cell2Count, setCell2Count] = useState(0);
  const auth = useSelector(authSelector);
  const history = useHistory();

  useEffect(() => {
    handleNextSixDays();
    getSchedules();
    getTempSchedules();
  }, [auth]);

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
      getSchedules();
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
      {/* <div> {cell2Count}</div> */}
      <FormTitle>
        <h2 style={{ color: "#007bff", margin: "6px 0 0 0", padding: "0" }}>
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
              marginTop: "8px",
              marginLeft: "-5px",
              fontWeight: "300",
            }}
          >
            {date.date}
          </div>
        ))}
      <div
        style={{ display: "flex", justifyContent: "flex-start", gap: "40px" }}
      >
        <Flexer>
          <Permanent>
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
                    color: "rgba(0, 0, 0, 0.06)",
                    margin: "0",
                    padding: "0",
                    fontWeight: "400",
                  }}
                >
                  Permanent
                </h5>
              </div>
            </TableTitle>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Friday" &&
                      schedule.timing === "8 AM to 9 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "8 AM to 9 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "8 AM to 9 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    (schedule.day === "Friday" &&
                      schedule.timing === "9 AM to 10 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "9 AM to 10 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "9 AM to 10 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    (schedule.day === "Friday" &&
                      schedule.timing === "10 AM to 11 AM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "10 AM to 11 AM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "10 AM to 11 AM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    (schedule.day === "Friday" &&
                      schedule.timing === "11 AM to 12 NN" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "11 AM to 12 NN" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "11 AM to 12 NN" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    color: "rgba(0, 0, 0, 0.06)",
                    margin: "0",
                    padding: "0",
                    fontWeight: "400",
                  }}
                >
                  Temporary
                </h5>
              </div>
            </TableTitle>
            <CellCon>
              {tempSchedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "8 AM to 9 AM" &&
                    schedule.schedType === "Temporary"
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
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
              {tempSchedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "9 AM to 10 AM" &&
                    schedule.schedType === "Temporary"
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
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
              {tempSchedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "10 AM to 11 AM" &&
                    schedule.schedType === "Temporary"
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
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
              {tempSchedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "11 AM to 12 NN" &&
                    schedule.schedType === "Temporary"
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
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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

        <Flexer>
          <Permanent>
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
                    color: "transparent",
                    margin: "0",
                    padding: "0",
                    fontWeight: "400",
                  }}
                >
                  Permanent
                </h5>
              </div>
            </TableTitle>
            <CellCon2>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.day === "Friday" &&
                      schedule.timing === "1 PM to 2 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "1 PM to 2 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "1 PM to 2 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    (schedule.day === "Friday" &&
                      schedule.timing === "2 PM to 3 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "2 PM to 3 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "2 PM to 3 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    (schedule.day === "Friday" &&
                      schedule.timing === "3 PM to 4 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "3 PM to 4 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "3 PM to 4 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    (schedule.day === "Friday" &&
                      schedule.timing === "4 PM to 5 PM" &&
                      schedule.schedType === "Permanent" &&
                      schedule.isActive === true) ||
                    (schedule.tempSoloDay === "Friday" &&
                      schedule.timing === "4 PM to 5 PM" &&
                      schedule.schedType === "Temporary" &&
                      schedule.isActive === true)
                )
                .map((schedule) => (
                  <Tilt>
                    <PermanentCell
                      socket={socket}
                      user={user}
                      schedule={schedule}
                      navigateUpdate={navigateUpdate}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.day === "Friday" &&
                    schedule.timing === "4 PM to 5 PM" &&
                    schedule.schedType === "Permanent" &&
                    schedule.isActive === true) ||
                  (schedule.tempSoloDay === "Friday" &&
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
                    color: "transparent",
                    margin: "0",
                    padding: "0",
                    fontWeight: "400",
                  }}
                >
                  *Temporary
                </h5>
              </div>
            </TableTitle>
            <CellCon>
              {schedules
                .filter(
                  (schedule) =>
                    (schedule.permanentSched && schedule.permanentSched.day) ===
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "1 PM to 2 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "2 PM to 3 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "3 PM to 4 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
                      "Friday" &&
                    (schedule.permanentSched &&
                      schedule.permanentSched.timing) === "4 PM to 5 PM" &&
                    schedule.schedType === "Temporary"
                )
                .map((schedule) => (
                  <Tilt>
                    <TemporaryCell
                      schedule={schedule}
                      deleteOneSched={deleteOneSched}
                    />
                  </Tilt>
                ))}
              {schedules.filter(
                (schedule) =>
                  (schedule.permanentSched && schedule.permanentSched.day) ===
                    "Friday" &&
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
      </div>
    </FridayWrapper>
  );
};

export default Friday;
