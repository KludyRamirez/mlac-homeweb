import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import axios from "axios";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import TimerIcon from "@mui/icons-material/Timer";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import CheckIcon from "@mui/icons-material/Check";
import BlockIcon from "@mui/icons-material/Block";
import Tilt from "react-parallax-tilt";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
});

const StudentParentCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "100%",
  height: "inherit",
  backgroundColor: "#FAFAFA",
  marginTop: "40px",
  gap: "20px",
  flexWrap: "wrap",
});

const Cell = styled("div")({
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  border: "1px dashed #007bff",
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

const selectCon = (state) => state.con;
const conSelector = createSelector([selectCon], (con) => con);

const selectAudit = (state) => state.audit;
const auditSelector = createSelector([selectAudit], (audit) => audit);

const ParentSortSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const auth = useSelector(authSelector);
  const con = useSelector(conSelector);
  const audit = useSelector(auditSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    deleteExpiredTemporarySchedule();
    deleteExpiredTemporarySoloSchedule();
    getSchedules();
  }, []);

  const deleteExpiredTemporarySchedule = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/temp-schedule`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error deleting schedules:", error);
    }
  };

  const deleteExpiredTemporarySoloSchedule = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/temp-soloschedule`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      console.log(res.data);
    } catch (error) {
      console.error("Error deleting schedules:", error);
    }
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

  const handleSetActiveToFalse = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API}/schedule/${id}/setActive`,
        {
          isActive: false,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  };

  const handleAddToContainer = async (schedule) => {
    let updatedContainer = [];
    if (localStorage.getItem("con")) {
      updatedContainer = JSON.parse(localStorage.getItem("con"));
    }

    const existingScheduleIndex = updatedContainer.findIndex(
      (s) => s._id === schedule._id
    );
    if (existingScheduleIndex !== -1) {
      updatedContainer[existingScheduleIndex] = {
        ...schedule,
        count: updatedContainer[existingScheduleIndex].count + 1,
      };
    } else {
      updatedContainer = [];
      updatedContainer.push({
        ...schedule,
        count: 1,
      });
    }

    localStorage.setItem("con", JSON.stringify(updatedContainer));

    dispatch({
      type: "ADD_TO_CON",
      payload: updatedContainer,
    });
    console.log("success");
  };

  const saveOrderedSchedToDb = async () => {
    dispatch({
      type: "AUDIT",
      payload: true,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/con`,
        con,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      console.log("Con POST RES", res);
    } catch (err) {
      console.log("con save err", err);
    }
  };

  const createSchedOrder = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/sched-order`,
        audit,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );

      console.log("USER CASH ORDER CREATED RES ", res);

      if (res.data.ok) {
        localStorage.removeItem("con");

        dispatch({
          type: "ADD_TO_CON",
          payload: [],
        });

        dispatch({
          type: "AUDIT",
          payload: false,
        });

        await axios.delete(`${process.env.REACT_APP_API}/user/con`, {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        });

        setTimeout(() => {
          history.push("/timetable");
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Wrapper>
      <SideBar />
      <StudentParentCon>
        {/* <div
          style={{
            color: "#07bbff",
            fontSize: "48px",
            fontWeight: "600",
            padding: "30px 0 0 0",
          }}
        >
          Children
        </div> */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
            flexWrap: "wrap",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
              flexWrap: "wrap",

              width: "700px",
              height: "fit-content",
              padding: "40px",
              borderRadius: "10px",
            }}
          >
            {schedules
              .filter(
                (schedule) =>
                  schedule.parent === (auth && auth.userDetails.fullname) &&
                  schedule.schedType === "Permanent"
              )
              .map((schedule) => (
                <Tilt>
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
                          padding: "0px 0 0 3px",
                        }}
                      >
                        {schedule.nameOfStudent}
                        {schedule.tempStudentName &&
                          schedule.tempStudentName.nameOfStudent}
                      </div>
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
                                // onClick={() => navigateUpdate(schedule._id)}
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
                                <LowerIconDiv4
                                  onClick={() =>
                                    handleSetActiveToFalse(schedule._id)
                                  }
                                >
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
                            color: "#007bff",
                            fontSize: "12px",
                          }}
                        >
                          {schedule.day}
                        </div>
                      </div>
                    </div>
                  </Cell>
                </Tilt>
              ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "20px",
              flexWrap: "wrap",
              border: "1px solid #07bbff",
              width: "416px",
              padding: "40px",
              background: "#FCFCFC",
            }}
          >
            {schedules
              .filter(
                (schedule) =>
                  (schedule.parent === (auth && auth.userDetails.fullname) &&
                    schedule.schedType === "Temporary") ||
                  (schedule.tempStudentName &&
                    schedule.tempStudentName.parent ===
                      (auth && auth.userDetails.fullname) &&
                    schedule.schedType === "Temporary")
              )
              .map((schedule) => (
                <Tilt style={{ height: "fit-content" }}>
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
                          padding: "0px 0 0 3px",
                        }}
                      >
                        {schedule.nameOfStudent}
                        {schedule.tempStudentName &&
                          schedule.tempStudentName.nameOfStudent}
                      </div>
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
                          padding: "0 0 1px 0",
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
                                // onClick={() => navigateUpdate(schedule._id)}
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
                            color: "#007bff",
                            fontSize: "12px",
                          }}
                        >
                          {schedule.day}
                        </div>
                      </div>
                    </div>
                  </Cell>
                </Tilt>
              ))}
          </div>
        </div>
      </StudentParentCon>
    </Wrapper>
  );
};
export default ParentSortSchedule;
