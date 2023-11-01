import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { ResponsiveDrawer } from "../SideBar/SideBar";
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
  backgroundColor: "#FAFAFA",
});

const StudentParentCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  padding: "10px 40px",
  gap: "20px",
  backgroundColor: "#FAFAFA",
  marginTop: "70px",
  width: "100%",
  overflow: "hidden",
  overflowX: "scroll",
});

const Flexer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "center",
  gap: "40px",
  flexWrap: "wrap",
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
      <ResponsiveDrawer />
      <StudentParentCon>
        <Flexer>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "600px",
              height: "300px",
              border: "1px solid black",
              fontSize: "100px",
              whiteSpace: "nowrap",
            }}
          >
            Kludy Kludy
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "600px",
              height: "300px",
              border: "1px solid black",
              fontSize: "100px",
              whiteSpace: "nowrap",
            }}
          >
            Kludy Kludy
          </div>
        </Flexer>
      </StudentParentCon>
    </Wrapper>
  );
};
export default ParentSortSchedule;
