import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import moment from "moment";

const StudentParentCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "80%",
  overflow: "hidden",
  overflowX: "scroll",
  backgroundColor: "#ffffff",
  padding: "20px 40px",
});

const Cell = styled("div")({
  backgroundImage:
    "radial-gradient(at bottom left, rgba(117, 255, 220, 0.20) 6%, rgba(204, 251, 241, 0.15) 47.6%, rgba(248, 215, 251, 0.15) 87.8%)",
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

  useEffect(() => {
    deleteExpiredTemporarySchedule();
    getSchedules();
  }, []);

  const deleteExpiredTemporarySchedule = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/schedule`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
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
      await axios.patch(
        `${process.env.REACT_APP_API}/schedule/${id}/setActive`,
        {
          isActive: false,
        }
      );
    } catch (error) {
      console.log(error);
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
    <>
      <StudentParentCon>
        {schedules
          .filter(
            (schedule) =>
              (schedule.parent ===
                (auth && `${auth.firstname} ${auth.lastname}`) &&
                schedule.isActive === true) ||
              (schedule.permanentSched && schedule.permanentSched.parent) ===
                (auth && auth._id)
          )
          .map((schedule) => (
            <Cell key={schedule._id}></Cell>
          ))}
      </StudentParentCon>
    </>
  );
};
export default ParentSortSchedule;
