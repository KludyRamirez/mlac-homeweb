import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/material/styles";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import Tilt from "react-parallax-tilt";
import { HiSortDescending, HiSortAscending } from "react-icons/hi";
import { RiSearchLine } from "react-icons/ri";
import TopBar from "../AppBar/AppBar";
import Modal from "@mui/material/Modal";
import AbsentScheduleCard from "./AbsentScheduleCard";
import AuditModal from "./AuditModal";
import { BsCheckLg } from "react-icons/bs";
import { MdVideocam } from "react-icons/md";
import { toast } from "react-toastify";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  backgroundColor: "#FEFEFE",
});

const LowerBox = styled("div")({
  display: "flex",
  alignSelf: "flex-start",
  justifyContent: "center",
  width: "100%",
  height: "400px",
  borderTopRightRadius: "25px",
  borderBottomRightRadius: "25px",
  borderBottomLeftRadius: "25px",
  background:
    "radial-gradient(at bottom left, rgba(204, 251, 241, 0.15) 6%, rgba(255, 255, 255, 0.15) 47.6%, rgba(67, 207, 255, 0.20) 87.8%)",
  "@media (max-width: 767px)": {
    justifyContent: "flex-start",
    overflow: "hidden",
  },
});

const StudentParentCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#FEFEFE",
  marginTop: "40px",
  gap: "20px",
  padding: "20px",
  "@media (max-width: 767px)": {
    justifyContent: "flex-start",
    overflow: "hidden",
    marginTop: "30px",
  },
});

const Flexer = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "center",
  gap: "40px",
  paddingTop: "10px",
  flexWrap: "wrap",
  "@media (max-width: 767px)": {
    justifyContent: "flex-start",
    overflow: "hidden",
    overflowX: "scroll",
  },
});

const Cell = styled("div")({
  padding: "10px",
  color: "#007bff",
  fontSize: "13px",
  fontWeight: "400",
  letterSpacing: "0.3px",
  background: "white",
  borderBottom: "1px dashed #007bff",
  width: "100%",
  "&:last-child": {
    border: "none",
  },
});

const Cell2 = styled("div")({
  padding: "10px",
  color: "#007bff",
  fontSize: "13px",
  fontWeight: "400",
  letterSpacing: "0.3px",
  background: "white",
  borderBottom: "1px dashed #07bbff",
  width: "100%",
  "&:last-child": {
    border: "none",
  },
});

const Cell3 = styled("div")({
  padding: "10px",
  color: "white",
  fontSize: "13px",
  fontWeight: "400",
  letterSpacing: "0.3px",
  background: "transparent",
  borderBottom: "1px dashed white",
  width: "100%",

  "&:last-child": {
    border: "none",
    borderRadius: "10px",
  },
});

const Cell4 = styled("div")({
  padding: "10px",
  color: "#007bff",
  fontSize: "13px",
  fontWeight: "400",
  letterSpacing: "0.3px",
  background: "white",
  borderBottom: "1px dashed #007bff",
  width: "100%",
  display: "flex",
  justifyContent: "flex-start",
  gap: "4px",
  "&:last-child": {
    border: "none",
  },
});

const CellId = styled("div")({
  padding: "10px",
  color: "white",
  fontSize: "13px",
  fontWeight: "400",
  letterSpacing: "0.3px",
  background: "transparent",
  borderBottom: "1px dashed white",
  width: "100%",
  textTransform: "uppercase",

  "&:last-child": {
    border: "none",
    borderRadius: "10px",
  },
});

const LowerIconDiv = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
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
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv2 = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  background: "#FDDA0D",
  color: "#FDDA0D",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv3 = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  background: "#00FF7F",
  color: "#00FF7F",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv4 = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  background: "#FF7F50",
  color: "#FF7F50",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv5 = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  background: "#800020",
  color: "#800020",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "16px",
  height: "16px",
  borderRadius: "16px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    width: "24px",
    height: "24px",
    borderRadius: "24px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const IconSortContainer = styled("div")({
  width: "26px",
  height: "26px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    background: "rgba(0, 0, 0, 0.06)",
  },
});

const TableContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "12px",
  border: "1px solid rgba(0, 123, 255, 0.3)",
  padding: "6px",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomRightRadius: "20px",
  borderBottomLeftRadius: "2px",
}));

const SearchMainCon = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  alignSelf: "flex-end",
  position: "relative",
  "@media (max-width: 767px)": {
    width: "100%",
  },
}));

const SearchBar = styled("input")(({ theme }) => ({
  width: "100%",
  height: "26px",
  background: "white",
  border: "1px solid rgba(0, 123, 255, 0.3)",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  borderBottomLeftRadius: "20px",
  zIndex: "1",
  padding: "6px 0px 6px 42px",
  fontSize: "12px",
  fontWeight: "600",
  letterSpacing: "0.3px",
  color: "#007bff",
  "&:focus": {
    outline: "none",
  },
  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.1)",
  },
  "@media (max-width: 767px)": {
    borderRadius: "20px",
  },
}));

const ModalBox = styled("div")({
  position: "absolute",
  top: "50%",
  left: "50%",
  width: "34%",
  height: "600px",
  transform: "translate(-50%, -50%)",
  background: "white",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#007bff",
  border: "none",
  outline: "none",

  "&:focus": {
    border: "none",
  },

  "@media (max-width: 767px)": {
    width: "100%",
    height: "100%",
    borderRadius: "0px",
    border: "none",
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
  const [tempSchedules, setTempSchedules] = useState([]);
  const [tempSoloSchedules, setTempSoloSchedules] = useState([]);
  const [mixedTempSchedules, setMixedTempSchedules] = useState([]);
  const [activeSchedType, setActiveSchedType] = useState("Permanent");
  const [isNameDesc, setIsNameDesc] = useState(false);
  const [isDayDesc, setIsDayDesc] = useState(false);
  const [isTimeDesc, setIsTimeDesc] = useState(false);
  const [isTypeDesc, setIsTypeDesc] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSchedules, setFilteredSchedules] = useState([]);
  const [filteredMixedSchedules, setFilteredMixedSchedules] = useState([]);
  //modals
  const [showModal, setShowModal] = useState(false);
  const [showSecModal, setShowSecModal] = useState(false);

  const auth = useSelector(authSelector);
  const con = useSelector(conSelector);
  const audit = useSelector(auditSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    deleteExpiredTemporarySchedule();
    deleteExpiredTemporarySoloSchedule();
    handleDeleteCon();
  }, []);

  useEffect(() => {
    getSchedules();
    getTempSchedules();
    getTempSoloSchedules();
  }, [searchQuery]);

  useEffect(() => {
    const filtered = schedules.filter((schedule) => {
      return (
        schedule.nameOfStudent
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        schedule.day.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.timing.toLowerCase().includes(searchQuery.toLowerCase()) ||
        schedule.studentType
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        schedule.cardId
          ?.slice(-4)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
    setFilteredSchedules(filtered);
  }, [searchQuery, schedules]);

  useEffect(() => {
    const mixedTempFiltered = mixedTempSchedules.filter((schedule) => {
      return (
        (schedule.tempStudentName && schedule.tempStudentName.nameOfStudent)
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        schedule.cardId
          ?.slice(-4)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );
    });
    setFilteredMixedSchedules(mixedTempFiltered);
  }, [searchQuery, mixedTempSchedules]);

  useEffect(() => {
    if (tempSchedules.length >= 0 && tempSoloSchedules.length >= 0) {
      const mixedTempSchedulesVar = [...tempSchedules, ...tempSoloSchedules];
      setMixedTempSchedules(mixedTempSchedulesVar);
      console.log(mixedTempSchedulesVar);
    }
  }, [tempSchedules, tempSoloSchedules]);

  const handleDayChange = (day) => {
    setActiveSchedType(day);
  };

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

  const handleDeleteCon = async () => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API}/con`, {
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

      const url = `${process.env.REACT_APP_API}/schedule`;
      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      // Send the search query as a parameter to the API
      const params = { searchQuery }; // Modify this based on your API's requirements
      const res = await axios.get(url, { headers, params });

      const parentFilter = res.data.filter(
        (schedule) =>
          (schedule.parent ===
            `${auth && auth.userDetails.fullname} ${
              auth && auth.userDetails.username
            }` &&
            schedule.isActive === true) ||
          (schedule.tempStudent && schedule.tempStudent.parent) ===
            `${auth && auth.userDetails.fullname} ${
              auth && auth.userDetails.username
            }`
      );
      setSchedules(parentFilter);
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

      const url = `${process.env.REACT_APP_API}/temp-schedule`;
      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      const res = await axios.get(url, { headers });

      const parentFilter = res.data.filter(
        (schedule) =>
          (schedule.tempStudentName && schedule.tempStudentName.parent) ===
          (auth && auth.userDetails.fullname)
      );
      setTempSchedules(parentFilter);
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

      const url = `${process.env.REACT_APP_API}/temp-soloschedule`;
      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      const res = await axios.get(url, { headers });

      const parentFilter = res.data.filter(
        (schedule) =>
          (schedule.tempStudentName && schedule.tempStudentName.parent) ===
          (auth && auth.userDetails.fullname)
      );
      setTempSoloSchedules(parentFilter);
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
    handleOpenModal();

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
    handleOpenSecModal();

    dispatch({
      type: "AUDIT",
      payload: true,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/con`,
        { con },
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
        `${process.env.REACT_APP_API}/sched-order`,
        { audit },
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

        handleDeleteCon();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const showConItems = () => (
    <div>
      {con.map((s) => (
        <AbsentScheduleCard
          key={s._id}
          s={s}
          saveOrderedSchedToDb={saveOrderedSchedToDb}
        />
      ))}
    </div>
  );

  const TermsAndCondi = () => (
    <div>
      <AuditModal handleCloseSecModal={handleCloseSecModal} />
    </div>
  );

  //
  const sortAlphabeticallyDesc = () => {
    const sortedSchedules = [...filteredSchedules].sort((a, b) =>
      a.nameOfStudent.localeCompare(b.nameOfStudent)
    );
    setSchedules(sortedSchedules);
  };

  const sortMixedAlphabeticallyDesc = () => {
    const sortedMixedSchedules = [...filteredMixedSchedules].sort((a, b) =>
      (a.tempStudentName && a.tempStudentName.nameOfStudent).localeCompare(
        b.tempStudentName && b.tempStudentName.nameOfStudent
      )
    );
    setMixedTempSchedules(sortedMixedSchedules);
  };

  const sortAlphabetically = () => {
    const sortedSchedules = [...filteredSchedules].sort((a, b) =>
      b.nameOfStudent.localeCompare(a.nameOfStudent)
    );
    setSchedules(sortedSchedules);
  };

  const sortMixedAlphabetically = () => {
    const sortedMixedSchedules = [...filteredMixedSchedules].sort((a, b) =>
      (b.tempStudentName && b.tempStudentName.nameOfStudent).localeCompare(
        a.tempStudentName && a.tempStudentName.nameOfStudent
      )
    );
    setMixedTempSchedules(sortedMixedSchedules);
  };

  //

  const sortByDayOfWeekDesc = () => {
    const daysOrder = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const dayA = daysOrder.indexOf(a.day);
      const dayB = daysOrder.indexOf(b.day);
      return dayA - dayB;
    });

    setSchedules(sortedSchedules);
  };

  const sortMixedByDayOfWeekDesc = () => {
    const daysOrder = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const sortedSchedules = [...filteredMixedSchedules].sort((a, b) => {
      const dayA = daysOrder.indexOf(a.permanentSched && a.permanentSched.day);
      const dayB = daysOrder.indexOf(b.permanentSched && b.permanentSched.day);
      return dayA - dayB;
    });

    setMixedTempSchedules(sortedSchedules);
  };

  const sortByDayOfWeek = () => {
    const daysOrder = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const dayA = daysOrder.indexOf(a.day);
      const dayB = daysOrder.indexOf(b.day);
      return dayB - dayA;
    });

    setSchedules(sortedSchedules);
  };

  const sortMixedByDayOfWeek = () => {
    const daysOrder = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const sortedSchedules = [...filteredMixedSchedules].sort((a, b) => {
      const dayA = daysOrder.indexOf(a.permanentSched && a.permanentSched.day);
      const dayB = daysOrder.indexOf(b.permanentSched && b.permanentSched.day);
      return dayB - dayA;
    });

    setMixedTempSchedules(sortedSchedules);
  };

  //

  const sortByTimeDesc = () => {
    const timeOrder = [
      "8 AM to 9 AM",
      "9 AM to 10 AM",
      "10 AM to 11 AM",
      "11 AM to 12 NN",
      "1 PM to 2 PM",
      "2 PM to 3 PM",
      "3 PM to 4 PM",
      "4 PM to 5 PM",
    ];

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const timeA = timeOrder.indexOf(a.timing);
      const timeB = timeOrder.indexOf(b.timing);
      return timeA - timeB;
    });

    setSchedules(sortedSchedules);
  };

  const sortMixedByTimeDesc = () => {
    const timeOrder = [
      "8 AM to 9 AM",
      "9 AM to 10 AM",
      "10 AM to 11 AM",
      "11 AM to 12 NN",
      "1 PM to 2 PM",
      "2 PM to 3 PM",
      "3 PM to 4 PM",
      "4 PM to 5 PM",
    ];

    const sortedMixedSchedules = [...filteredMixedSchedules].sort((a, b) => {
      const timeA = timeOrder.indexOf(
        a.timing || (a.permanentSched && a.permanentSched.timing)
      );
      const timeB = timeOrder.indexOf(
        b.timing || (b.permanentSched && b.permanentSched.timing)
      );
      return timeA - timeB;
    });

    setMixedTempSchedules(sortedMixedSchedules);
  };

  const sortByTime = () => {
    const timeOrder = [
      "8 AM to 9 AM",
      "9 AM to 10 AM",
      "10 AM to 11 AM",
      "11 AM to 12 NN",
      "1 PM to 2 PM",
      "2 PM to 3 PM",
      "3 PM to 4 PM",
      "4 PM to 5 PM",
    ];

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const timeA = timeOrder.indexOf(a.timing);
      const timeB = timeOrder.indexOf(b.timing);
      return timeB - timeA;
    });

    setSchedules(sortedSchedules);
  };

  const sortMixedByTime = () => {
    const timeOrder = [
      "8 AM to 9 AM",
      "9 AM to 10 AM",
      "10 AM to 11 AM",
      "11 AM to 12 NN",
      "1 PM to 2 PM",
      "2 PM to 3 PM",
      "3 PM to 4 PM",
      "4 PM to 5 PM",
    ];

    const sortedMixedSchedules = [...filteredMixedSchedules].sort((a, b) => {
      const timeA = timeOrder.indexOf(
        a.timing || (a.permanentSched && a.permanentSched.timing)
      );
      const timeB = timeOrder.indexOf(
        b.timing || (b.permanentSched && b.permanentSched.timing)
      );
      return timeB - timeA;
    });

    setMixedTempSchedules(sortedMixedSchedules);
  };

  //

  const sortByTypeDesc = () => {
    const typeOrder = ["Solo", "Dyad"];

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const typeA = typeOrder.indexOf(a.studentType);
      const typeB = typeOrder.indexOf(b.studentType);
      return typeA - typeB;
    });

    setSchedules(sortedSchedules);
  };

  const sortMixedByTypeDesc = () => {
    const typeOrder = ["Solo", "Dyad"];

    const sortedSchedules = [...filteredMixedSchedules].sort((a, b) => {
      const typeA = typeOrder.indexOf(
        a.studentType || (a.tempStudentName && a.tempStudentName.studentType)
      );
      const typeB = typeOrder.indexOf(
        b.studentType || (b.tempStudentName && b.tempStudentName.studentType)
      );
      return typeA - typeB;
    });

    setMixedTempSchedules(sortedSchedules);
  };

  const sortByType = () => {
    const typeOrder = ["Solo", "Dyad"];

    const sortedSchedules = [...filteredSchedules].sort((a, b) => {
      const typeA = typeOrder.indexOf(a.studentType);
      const typeB = typeOrder.indexOf(b.studentType);
      return typeB - typeA;
    });

    setSchedules(sortedSchedules);
  };

  const sortMixedByType = () => {
    const typeOrder = ["Solo", "Dyad"];

    const sortedSchedules = [...filteredMixedSchedules].sort((a, b) => {
      const typeA = typeOrder.indexOf(
        a.studentType || (a.tempStudentName && a.tempStudentName.studentType)
      );
      const typeB = typeOrder.indexOf(
        b.studentType || (b.tempStudentName && b.tempStudentName.studentType)
      );
      return typeB - typeA;
    });

    setMixedTempSchedules(sortedSchedules);
  };

  const toggleFilterName = () => {
    setIsNameDesc(!isNameDesc);
  };

  const toggleFilterDay = () => {
    setIsDayDesc(!isDayDesc);
  };

  const toggleFilterTime = () => {
    setIsTimeDesc(!isTimeDesc);
  };

  const toggleFilterType = () => {
    setIsTypeDesc(!isTypeDesc);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenSecModal = () => {
    setShowSecModal(true);
    handleCloseModal();
  };

  const handleAttemptCloseSecModal = () => {
    setShowSecModal(false);
  };

  const handleCloseSecModal = () => {
    createSchedOrder();
    setShowSecModal(false);
    // window.location.reload();
  };

  return (
    <Wrapper>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>{showConItems()}</ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showSecModal}
        onClose={handleAttemptCloseSecModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalBox>{TermsAndCondi()}</ModalBox>
      </Modal>

      <TopBar />
      <ResponsiveDrawer />

      <StudentParentCon>
        <SearchMainCon>
          <div
            style={{
              position: "absolute",
              top: "7px",
              left: "8px",
              width: "26px",
              height: "26px",
              zIndex: "2",
              background:
                "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)",
              borderRadius: "50%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <RiSearchLine
              style={{
                color: "white",
                fontSize: "12px",
              }}
            />
          </div>
          <SearchBar
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </SearchMainCon>
        <h2
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "0",
            margin: "0",
            color: "#007bff",
            marginTop: "10px",
            letterSpacing: "0.5px",
          }}
        >
          Children's
        </h2>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            padding: "0",
            margin: "0",
            color: "#07bbff",
            fontSize: "56px",
            fontWeight: "300",
            marginTop: "-3px",
            marginLeft: "-4px",
            letterSpacing: "0.5px",
          }}
        >
          Schedules
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            width: "100%",
            alignItems: "flex-end",
            gap: "20px",
            marginTop: "4px",
          }}
        >
          <TableContainer>
            <div
              onClick={() => handleDayChange("Permanent")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                marginTop: activeSchedType === "Permanent" ? "0px" : "0px",
                background:
                  activeSchedType === "Permanent"
                    ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                    : "transparent",
                color: activeSchedType === "Permanent" ? "white" : "#07bbff",

                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "11px",
                fontWeight: "bold",

                ":focus": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                },
                ":hover": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  transform: "translateY(-2px)",

                  background: "white",
                },
              }}
            >
              P
            </div>

            <div
              onClick={() => handleDayChange("Temporary")}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "4px",
                width: "25px",
                height: "25px",
                borderRadius: "50%",
                marginTop: activeSchedType === "Temporary" ? "0px" : "0px",
                background:
                  activeSchedType === "Temporary"
                    ? "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5adaff 100%)"
                    : "transparent",
                color: activeSchedType === "Temporary" ? "white" : "#07bbff",

                cursor: "pointer",
                textDecoration: "none",
                transition: "box-shadow .15s, transform .15s",
                touchAction: "manipulation",
                willChange: "box-shadow, transform",
                fontSize: "11px",
                fontWeight: "bold",

                ":focus": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                },
                ":hover": {
                  boxShadow:
                    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  transform: "translateY(-2px)",
                  borderBottom: "1px solid #007bff",
                  borderTop: "1px solid #007bff",
                  borderLeft: "1px solid #007bff",
                  background: "white",
                },
              }}
            >
              T
            </div>
          </TableContainer>
        </div>

        {activeSchedType === "Permanent" && (
          <>
            <Flexer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  whiteSpace: "nowrap",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      borderTopLeftRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      color: "#007bff",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #07bbff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>ID</div>
                      <div style={{ width: "26px", height: "26px" }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "30px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#07bbff",
                      border: "1px solid #07bbff",
                      padding: "11px 10px 0px 10px",
                      borderBottomLeftRadius: "10px",
                      gap: "10px",
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <CellId key={schedule._id}>
                        {schedule.cardId ? schedule.cardId.slice(-2) : ""}
                      </CellId>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#007bff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Name</div>
                      {isNameDesc ? (
                        <div onClick={toggleFilterName}>
                          <IconSortContainer onClick={sortAlphabetically}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterName}>
                          <IconSortContainer onClick={sortAlphabeticallyDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #007bff",
                      padding: "11px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <Cell key={schedule._id}>{schedule.nameOfStudent}</Cell>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#07bbff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #07bbff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Day</div>
                      {isDayDesc ? (
                        <div onClick={toggleFilterDay}>
                          <IconSortContainer onClick={sortByDayOfWeek}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterDay}>
                          <IconSortContainer onClick={sortByDayOfWeekDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #07bbff",
                      padding: "11px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <Cell2 key={schedule._id}>{schedule.day}</Cell2>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    // width: "100px",
                    height: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#007bff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Time</div>
                      {isTimeDesc ? (
                        <div onClick={toggleFilterTime}>
                          <IconSortContainer onClick={sortByTime}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterTime}>
                          <IconSortContainer onClick={sortByTimeDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #007bff",
                      padding: "10px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <Cell key={schedule._id}>{schedule.timing}</Cell>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    // width: "100px",
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopLeftRadius: "10px",
                      // borderTopRightRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      color: "#007bff",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Type</div>
                      {isTypeDesc ? (
                        <div onClick={toggleFilterType}>
                          <IconSortContainer onClick={sortByType}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterType}>
                          <IconSortContainer onClick={sortByTypeDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#07bbff",
                      border: "1px solid #07bbff",
                      padding: "10px 10px 0px 10px",
                      gap: "10px",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <Cell3 key={schedule._id}>{schedule.studentType}</Cell3>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    // width: "100px",
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "125px",
                      // borderTopLeftRadius: "6px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#007bff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Actions</div>
                      <div style={{ width: "26px", height: "26px" }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "105px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #07bbff",
                      padding: "10px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <Cell4 key={schedule._id}>
                        <LowerIconDiv>
                          <PersonIcon sx={{ fontSize: "14px" }} />
                        </LowerIconDiv>

                        <LowerIconDiv3>
                          <BsCheckLg style={{ fontSize: "14px" }} />
                        </LowerIconDiv3>
                        <LowerIconDiv4
                          onClick={() => handleAddToContainer(schedule)}
                        >
                          <BlockIcon sx={{ fontSize: "14px" }} />
                        </LowerIconDiv4>
                        <LowerIconDiv5>
                          <MdVideocam style={{ fontSize: "14px" }} />
                        </LowerIconDiv5>
                      </Cell4>
                    ))}
                  </div>
                </div>
              </div>
            </Flexer>
          </>
        )}

        {activeSchedType === "Temporary" && (
          <>
            <Flexer>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  whiteSpace: "nowrap",
                  gap: "6px",
                }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      borderTopLeftRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      color: "#007bff",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #07bbff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>ID</div>
                      <div style={{ width: "26px", height: "26px" }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "50px",
                      height: "100%",
                      borderBottomLeftRadius: "10px",
                      // borderBottomRightRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#07bbff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "12px",
                      border: "1px solid #07bbff",
                    }}
                  ></div>
                </div>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#007bff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Name</div>
                      {isNameDesc ? (
                        <div onClick={toggleFilterName}>
                          <IconSortContainer onClick={sortMixedAlphabetically}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterName}>
                          <IconSortContainer
                            onClick={sortMixedAlphabeticallyDesc}
                          >
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #007bff",
                      padding: "11px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredMixedSchedules.map((schedule) => (
                      <Cell key={schedule._id}>
                        {schedule.tempStudentName &&
                          schedule.tempStudentName.nameOfStudent}
                      </Cell>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    height: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#07bbff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #07bbff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Date</div>
                      {isDayDesc ? (
                        <div onClick={toggleFilterDay}>
                          <IconSortContainer onClick={sortMixedByDayOfWeek}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterDay}>
                          <IconSortContainer onClick={sortMixedByDayOfWeekDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #07bbff",
                      padding: "11px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredMixedSchedules.map((schedule) => (
                      <Cell key={schedule._id}>
                        {schedule.dateTime
                          ? schedule.dateTime.slice(0, -5)
                          : ""}
                        , {schedule.tempSoloDay}
                      </Cell>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    // width: "100px",
                    height: "100%",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#007bff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Time</div>
                      {isTimeDesc ? (
                        <div onClick={toggleFilterTime}>
                          <IconSortContainer onClick={sortMixedByTime}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterTime}>
                          <IconSortContainer onClick={sortMixedByTimeDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #007bff",
                      padding: "10px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredMixedSchedules.map((schedule) => (
                      <Cell key={schedule._id}>
                        {schedule.permanentSched &&
                          schedule.permanentSched.timing}
                        {schedule.timing}
                      </Cell>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    // width: "100px",
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "200px",
                      borderTopLeftRadius: "10px",
                      // borderTopRightRadius: "6px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      color: "#007bff",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Type</div>
                      {isTypeDesc ? (
                        <div onClick={toggleFilterType}>
                          <IconSortContainer onClick={sortMixedByType}>
                            <HiSortAscending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      ) : (
                        <div onClick={toggleFilterType}>
                          <IconSortContainer onClick={sortMixedByTypeDesc}>
                            <HiSortDescending style={{ fontSize: "16px" }} />
                          </IconSortContainer>
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    style={{
                      width: "180px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#07bbff",
                      border: "1px solid #07bbff",
                      padding: "10px 10px 0px 10px",
                      gap: "10px",
                      borderBottomLeftRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                  >
                    {filteredMixedSchedules.map((schedule) => (
                      <Cell3 key={schedule._id}>
                        {schedule.tempStudentName &&
                          schedule.tempStudentName.studentType}
                      </Cell3>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    // width: "100px",
                    height: "100%",
                    borderRadius: "10px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      width: "125px",
                      // borderTopLeftRadius: "6px",
                      borderTopRightRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "#007bff",
                      color: "white",
                      fontWeight: "600",
                      fontSize: "14px",
                      letterSpacing: "0.3px",
                      border: "1px solid #007bff",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "8px 10px",
                      }}
                    >
                      <div>Actions</div>
                      <div style={{ width: "26px", height: "26px" }}></div>
                    </div>
                  </div>
                  <div
                    style={{
                      width: "105px",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      background: "white",
                      border: "1px solid #07bbff",
                      padding: "10px 10px 0px 10px",
                      gap: "10px",
                    }}
                  >
                    {filteredMixedSchedules.map((schedule) => (
                      <Cell4 key={schedule._id}>
                        <LowerIconDiv4></LowerIconDiv4>
                      </Cell4>
                    ))}
                  </div>
                </div>
              </div>
            </Flexer>
          </>
        )}
        <LowerBox></LowerBox>
      </StudentParentCon>
    </Wrapper>
  );
};
export default ParentSortSchedule;
