import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { createSelector } from "reselect";
import axios from "axios";
import ccchip from "../../../images/ccchip.png";

const MondayWrapper = styled("div")({
  width: "620px",
  height: "100%",
  margin: "0",
  padding: "0",
});

const FormTitle = styled("h2")({
  color: "white",
  textShadow: "2px 2px 2px rgba(0,0,0,0.3)",
  display: "flex",
  justifyContent: "space-between",
  margin: "0",
  padding: "0",
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "inherit",
  height: "inherit",
  gap: "10px",
});

const Permanent = styled("div")({
  width: "33%",
  height: "91%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
});

const Temporary = styled("div")({
  width: "67%",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  gap: "10px",
  borderBottom: "0.5px solid rgba(255, 255, 255, 0.15)",
  borderLeft: "0.5px solid rgba(255, 255, 255, 0.15)",
  padding: "0 0px 10px 10px",
});

const CellCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  gap: "10px",
});

const CellCon2 = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
});

const Cell = styled("div")({
  background:
    "radial-gradient(328px at 2.9% 15%, rgba(191, 224, 251, 0.45) 0%, rgba(232, 233, 251, 0.2) 25.8%, rgba(252, 239, 250, 0.35) 50.8%, rgba(234, 251, 251, 0.15) 77.6%, rgba(240, 251, 244, 0.15) 100.7%)",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "5px",
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

const IconContainer = styled("div")(({ theme }) => ({
  background:
    "linear-gradient(135deg, rgba(255, 255, 255, 0.17), rgba(255, 255, 255, 0))",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  borderRadius: "5px",
  cursor: "pointer",
  padding: "8px",
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

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Monday = () => {
  const [showDiv, setShowDiv] = useState(true);
  const [schedules, setSchedules] = useState([]);
  const [tempSchedules, setTempSchedules] = useState([]);
  const auth = useSelector(authSelector);

  useEffect(() => {
    getSchedules();
    getTempSchedules();
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
      setTempSchedules(filteredSchedules);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <MondayWrapper>
      <FormTitle>
        <div>Monday</div>
        <IconContainer onClick={toggleDiv}>
          <SwapHorizOutlinedIcon sx={{ color: "white" }} />
        </IconContainer>
      </FormTitle>
      <br />
      {showDiv ? (
        <Flexer>
          <Permanent>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      (schedule.day === "Monday" &&
                        schedule.timing === "7 AM to 8 AM" &&
                        schedule.schedType === "Permanent" &&
                        schedule.isActive === true) ||
                      (schedule.tempSoloDay === "Monday" &&
                        schedule.timing === "7 AM to 8 AM" &&
                        schedule.schedType === "Temporary")
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.tempStudentName &&
                          schedule.tempStudentName.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.dateTime}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "8 AM to 9 AM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "9 AM to 10 AM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "10 AM to 11 AM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "11 AM to 12 NN" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
          </Permanent>

          <Temporary>
            <CellCon>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      (schedule.permanentSched &&
                        schedule.permanentSched.day) === "Monday" &&
                      (schedule.permanentSched &&
                        schedule.permanentSched.timing) === "8 AM to 9 AM" &&
                      schedule.schedType === "Temporary"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.tempStudentName &&
                          schedule.tempStudentName.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
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
                    schedule.day === "Monday" &&
                    schedule.timing === "12 NN to 1 PM" &&
                    schedule.schedType === "Permanent"
                )
                .map((schedule) => (
                  <Cell key={schedule.id}>
                    <div
                      style={{
                        padding: "4px 0 0 7px",

                        color: "#1434A4",
                      }}
                    >
                      {schedule.nameOfStudent}
                    </div>
                    <img
                      style={{
                        width: "32px",
                        height: "32px",
                        padding: "0px 0 0 4px",
                      }}
                      src={ccchip}
                      alt=""
                    />
                    <div
                      style={{
                        padding: "0px 8px 8px 8px",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        width: "92%",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            fontSize: "13px",
                            fontWeight: "500",
                            color: "white",
                          }}
                        >
                          {schedule.timing}
                        </div>
                        <div style={{ fontSize: "11px", fontWeight: "400" }}>
                          {schedule.studentType}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          width: "fit-content",
                          height: "fit-content",
                        }}
                      >
                        {schedule.isActive ? (
                          <CheckCircleIcon sx={{ color: "#1434A4" }} />
                        ) : (
                          <CancelIcon sx={{ color: "#FF3131" }} />
                        )}
                      </div>
                    </div>
                  </Cell>
                ))}
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "1 PM to 2 PM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "2 PM to 3 PM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "3 PM to 4 PM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
            <CellCon2>
              <Cell>
                {schedules
                  .filter(
                    (schedule) =>
                      schedule.day === "Monday" &&
                      schedule.timing === "4 PM to 5 PM" &&
                      schedule.schedType === "Permanent"
                  )
                  .map((schedule) => (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        width: "100%",
                        height: "inherit",
                      }}
                      key={schedule.id}
                    >
                      <div
                        style={{
                          padding: "4px 0 0 7px",

                          color: "#1434A4",
                        }}
                      >
                        {schedule.nameOfStudent}
                      </div>
                      <img
                        style={{
                          width: "32px",
                          height: "32px",
                          padding: "0px 0 0 4px",
                        }}
                        src={ccchip}
                        alt=""
                      />
                      <div
                        style={{
                          padding: "0px 8px 8px 8px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-end",
                          width: "92%",
                        }}
                      >
                        <div>
                          <div
                            style={{
                              fontSize: "13px",
                              fontWeight: "500",
                              color: "white",
                            }}
                          >
                            {schedule.timing}
                          </div>
                          <div style={{ fontSize: "11px", fontWeight: "400" }}>
                            {schedule.studentType}
                          </div>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            width: "fit-content",
                            height: "fit-content",
                          }}
                        >
                          {schedule.isActive ? (
                            <CheckCircleIcon sx={{ color: "#1434A4" }} />
                          ) : (
                            <CancelIcon sx={{ color: "#FF3131" }} />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </Cell>
            </CellCon2>
          </Permanent>

          <Temporary>
            <CellCon>
              <Cell>Kludy</Cell>
              <Cell>Kludy</Cell>
            </CellCon>
            <CellCon>
              <Cell>Kludy</Cell>
              <Cell>Kludy</Cell>
            </CellCon>
            <CellCon>
              <Cell>Kludy</Cell>
              <Cell>Kludy</Cell>
            </CellCon>
            <CellCon>
              <Cell>Kludy</Cell>
              <Cell>Kludy</Cell>
            </CellCon>
          </Temporary>
        </Flexer>
      )}
    </MondayWrapper>
  );
};

export default Monday;
