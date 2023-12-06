import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import { RiSearchLine } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import AbsentScheduleCard from "./AbsentScheduleCard";
import AuditModal from "./AuditModal";
import DeletionModal from "./DeletionModal";
import {
  BsCameraReels,
  BsX,
  BsCalendar2Check,
  BsCalendar2X,
  BsExclamationCircle,
  BsInboxes,
  BsSortUp,
  BsSortDownAlt,
  BsSortAlphaDown,
  BsSortAlphaUpAlt,
  BsCheckCircle,
} from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toast } from "react-toastify";
import moment from "moment";
import PresentConModal from "./PresentConModal";
import PresentAuditModal from "./PresentAuditModal";
import VideoModal from "./VideoModal";
import dots from "../../../images/dots.webp";
import WaitlistModal from "./WaitlistModal";

const StudentParentCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "transparent",
  width: "100%",
  zIndex: "2",

  "@media (max-width: 767px)": {
    padding: "10px",
    marginTop: "10px",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
});

const LowerIconDiv = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  border: "1px solid rgba(7, 187, 255, 0.6)",
  background: "transparent",
  color: "transparent",
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
    color: "rgba(7, 187, 255, 0.8)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv2 = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  background: "transparent",
  border: "1px solid #FFBF00",
  color: "transparent",
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
    color: "#FFBF00",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const LowerIconDiv4 = styled("div")({
  marginTop: "1px",
  cursor: "pointer",
  background: "transparent",
  border: "1px solid #FF3131",
  color: "transparent",
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
    color: "#FF3131",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const IconSortContainer = styled("div")({
  width: "32px",
  height: "32px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "50%",
  cursor: "pointer",
  "&:hover": {
    background: "rgba(255, 255, 255, 0.25)",
  },
});

const TableContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  gap: "14px",
  alignSelf: "flex-end",
  border: "1px solid rgba(7, 187, 255, 0.4)",
  padding: "6px",
  borderRadius: "20px",
  background: "#f7fff7",
}));

const SearchMainCon = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  marginTop: "18px",
  width: "100%",
  "@media (max-width: 767px)": {},
}));

const SearchBar = styled("input")(({ theme }) => ({
  width: "18%",
  height: "26px",
  background: "#f7fff7",
  border: "none",
  borderTopRightRadius: "24px",
  borderBottomRightRadius: "24px",
  borderTopLeftRadius: "10px",
  borderBottomLeftRadius: "10px",
  zIndex: "1",
  padding: "6px 0px 6px 48px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#007bff",
  outline: "1px solid rgba(7, 187, 255, 0.4)",
  fontFamily: "Poppins, sans-serif",

  "&:focus": {
    outline: "2px solid #122c8e",
  },
  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.3)",
  },
  "@media (max-width: 767px)": {
    // width: "50%",
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
  backgroundColor: "#f0ffff",

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

const FlexerSwitch = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "12px",
  height: "inherit",
  width: "100%",
});

const ZebraDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  color: "#122c8e",
  "&:nth-child(even)": {
    background: "rgba(255, 255, 255, 0.9)",
    borderTopLeftRadius: "10px",
    borderBottomLeftRadius: "10px",
    borderTopRightRadius: "40px",
    borderBottomRightRadius: "40px",
    border: "1px solid rgba(7, 187, 255, 0.3)",
  },

  "&:nth-child(odd)": {
    background: "transparent",
    border: "1px solid transparent",
  },
});

const FilterButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: "#122c8e",
  width: "40px",
  height: "38px",
  background: "#f7fff7",
  outline: "1px solid rgba(7, 187, 255, 0.4)",
  borderRadius: "24px",
  cursor: "pointer",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.1s ease-in-out",
  "&:hover": {
    outline: "none",
    color: "white",
    transform: "translateY(-1px)",
    background: "#33f641",
    backgroundImage:
      "radial-gradient(at 16.0% 15.0%, hsl(55, 99%, 44%) 0px, transparent 50%),radial-gradient(at 12.0% 94.0%, hsl(74, 34%, 61%) 0px, transparent 50%),radial-gradient(at 98.0% 29.0%, hsl(90, 60%, 24%) 0px, transparent 50%),radial-gradient(at 1.0% 16.0%, hsl(105, 10%, 31%) 0px, transparent 50%),radial-gradient(at 28.0% 88.0%, hsl(148, 67%, 56%) 0px, transparent 50%)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const PermanentTitle = styled("div")({
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "-1px",

  "@media (max-width: 767px)": {},
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const selectCon = (state) => state.con;
const conSelector = createSelector([selectCon], (con) => con);

const selectAudit = (state) => state.audit;
const auditSelector = createSelector([selectAudit], (audit) => audit);

const WaitlistSchedule = () => {
  const [schedules, setSchedules] = useState([]);
  const [active, setActive] = useState("");
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
  const [showExtraFunc, setShowExtraFunc] = useState(true);

  //modals
  const [showModal, setShowModal] = useState(false);
  const [showSecModal, setShowSecModal] = useState(false);
  // delete modals
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //
  const [showPresentModal, setShowPresentModal] = useState(false);
  const [showSecPresentModal, setShowSecPresentModal] = useState(false);

  // video modals
  const [videoId, setVideoId] = useState("");
  const [showVideoModal, setShowVideoModal] = useState(false);

  // absent plus counter

  const [plusAbsentCounter, setPlusAbsentCounter] = useState("");

  // present minus counter
  const [minusPresentCounter, setMinusPresentCounter] = useState("");

  // set isWaitlisted to no
  const [hashParentPassword, setHashParentPassword] = useState("");
  const [waitlisted, setWaitlisted] = useState("");
  const [showWaitlistModal, setShowWaitlistModal] = useState("");

  const auth = useSelector(authSelector);
  const con = useSelector(conSelector);
  const audit = useSelector(auditSelector);
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } = useParams();

  useEffect(() => {
    updateExpiredTemporarySchedule();
    updateExpiredTemporarySoloSchedule();
    handleDeleteCon();
  }, []);

  useEffect(() => {
    getTempSchedules();
    getTempSoloSchedules();
  }, [searchQuery]);

  useEffect(() => {
    getSchedules();
  }, [auth, searchQuery]);

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

  const toggleExtraFunc = () => {
    setShowExtraFunc(!showExtraFunc);
  };

  const updateExpiredTemporarySchedule = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/temp-schedule`,
        {},
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

  const updateExpiredTemporarySoloSchedule = async () => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/temp-soloschedule`,
        {},
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

      const waitListFilter = res.data.filter(
        (schedule) => schedule.isWaitlisted === "Yes"
      );

      setSchedules(waitListFilter);
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
          isActive: "Absent",
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

  const handleConfirmSetActiveToFalse = () => {
    if (active) {
      handleSetActiveToFalse(active);
    }
  };

  const handleAddToContainer = async (schedule, id) => {
    setPlusAbsentCounter(id);
    setActive(id);
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

  const handleSetPlusAbsentCounter = async (id) => {
    try {
      const currentValueResponse = await axios.get(
        `${process.env.REACT_APP_API}/schedule/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );

      const currentValue = currentValueResponse.data?.absentCounter;

      if (typeof currentValue !== "undefined") {
        const updatedValue = currentValue + 1;

        const response = await axios.patch(
          `${process.env.REACT_APP_API}/schedule/${id}/setabsentcounterplus`,
          { absentCounter: updatedValue },
          {
            headers: {
              Authorization: `Bearer ${auth.userDetails.token}`,
            },
          }
        );

        console.log(
          "--------------------------------------------------------------------------------->Success:",
          response.data
        );
      } else {
        console.error("Error: Unable to fetch current value");
      }
    } catch (err) {
      console.error("Error updating absent counter:", err);
    }
  };

  const handleConfirmSetPlusAbsentCounter = async () => {
    try {
      if (plusAbsentCounter) {
        await handleSetPlusAbsentCounter(plusAbsentCounter);
      }
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
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
      <AuditModal
        handleCloseSecModal={handleCloseSecModal}
        handleConfirmSetActiveToFalse={handleConfirmSetActiveToFalse}
        handleConfirmSetPlusAbsentCounter={handleConfirmSetPlusAbsentCounter}
      />
    </div>
  );

  //
  const sortAlphabeticallyDesc = () => {
    const sortedSchedules = [...filteredSchedules].sort((a, b) =>
      a.nameOfStudent.localeCompare(b.nameOfStudent)
    );
    setSchedules(sortedSchedules);
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
    window.location.reload();
  };

  const navigateUpdate = (id) => {
    history.push(`/schedule/${id}`);
    window.location.reload();
  };

  const deleteOneSchedule = async (id) => {
    if (!auth.userDetails.token) {
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

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleClickDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (deleteId) {
      deleteOneSchedule(deleteId);
      getSchedules();
    }
    setShowDeleteModal(false);
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format("MMMM Do YYYY");
  };

  const dateObj = new Date();
  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });

  // for present logs -------------> //

  const handleAddToContainerPresent = async (schedule, id) => {
    setActive(id);
    setMinusPresentCounter(id);
    handleOpenModalPresent();

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

  const saveOrderedSchedToDbPresent = async () => {
    handleOpenSecModalPresent();

    dispatch({
      type: "AUDIT",
      payload: true,
    });

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/con-present`,
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

  const createSchedOrderPresent = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/sched-order-present`,
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

  const handleSetActiveToTrue = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API}/schedule/${id}/setActive`,
        {
          isActive: "Present",
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

  const handleConfirmSetActiveToTrue = () => {
    if (active) {
      handleSetActiveToTrue(active);
    }
  };

  const handleSetMinusPresentCounter = async (id) => {
    try {
      // Fetch current value
      const currentValueResponse = await axios.get(
        `${process.env.REACT_APP_API}/schedule/${id}`,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );

      const currentValue = currentValueResponse.data?.absentCounter;

      if (typeof currentValue !== "undefined") {
        const updatedValue = currentValue - 1;

        const response = await axios.patch(
          `${process.env.REACT_APP_API}/schedule/${id}/setpresentcounterminus`,
          { absentCounter: updatedValue },
          {
            headers: {
              Authorization: `Bearer ${auth.userDetails.token}`,
            },
          }
        );

        console.log(
          "--------------------------------------------------------------------------------->Minus:",
          response.data
        );
      } else {
        console.error("Error: Unable to fetch current value");
      }
    } catch (err) {
      console.error("Error updating absent counter:", err);
    }
  };

  const handleConfirmSetMinusPresentCounter = async () => {
    try {
      if (minusPresentCounter) {
        await handleSetMinusPresentCounter(minusPresentCounter);
      }
    } catch (err) {
      console.log(err);
    } finally {
      window.location.reload();
    }
  };

  const showConItemsPresent = () => (
    <div>
      {con.map((s) => (
        <PresentConModal
          key={s._id}
          s={s}
          saveOrderedSchedToDbPresent={saveOrderedSchedToDbPresent}
        />
      ))}
    </div>
  );

  const TermsAndCondiPresent = () => (
    <div>
      <PresentAuditModal
        handleCloseSecModalPresent={handleCloseSecModalPresent}
        handleConfirmSetActiveToTrue={handleConfirmSetActiveToTrue}
        handleConfirmSetMinusPresentCounter={
          handleConfirmSetMinusPresentCounter
        }
      />
    </div>
  );

  const handleOpenModalPresent = () => {
    setShowPresentModal(true);
  };
  const handleCloseModalPresent = () => {
    setShowPresentModal(false);
  };

  const handleOpenSecModalPresent = () => {
    setShowSecPresentModal(true);
    handleCloseModalPresent();
  };

  const handleAttemptCloseSecModalPresent = () => {
    setShowSecPresentModal(false);
  };

  const handleCloseSecModalPresent = () => {
    createSchedOrderPresent();
    setShowSecPresentModal(false);
    window.location.reload();
  };

  // for video modal --------------------------------------------->

  const handleSetVideoToTrue = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API}/schedule/${id}/setVideo`,
        {
          isVideoOn: true,
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

  const handleClickVideo = (id) => {
    setVideoId(id);
    setShowVideoModal(true);
  };

  const handleCloseVideoModal = () => {
    setShowVideoModal(false);
  };

  const handleConfirmVideo = () => {
    if (videoId) {
      handleSetVideoToTrue(videoId);
      getSchedules();
    }
    setShowVideoModal(false);
  };

  //----------> set waitlist No //---------> waitlist account password hash

  const handleHashWishlistAccountPassword = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      await axios.post(
        `${process.env.REACT_APP_API}/hash-password`,
        { parent: hashParentPassword },
        { headers }
      );
    } catch (error) {
      console.error("Error updating schedules:", error);
    }
  };

  const handleSetIsWaitlistToNo = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      await axios.patch(
        `${process.env.REACT_APP_API}/schedule/${id}/setwaitliststatus`,
        {
          isWaitlisted: "No",
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

  const handleClickSetIsWaitlisted = (id, obj) => {
    setWaitlisted(id);
    setHashParentPassword(obj);
    setShowWaitlistModal(true);
  };

  const handleCloseWaitlistModal = () => {
    setShowWaitlistModal(false);
  };

  const handleConfirmSetIsWaitlisted = () => {
    if (waitlisted) {
      handleSetIsWaitlistToNo(waitlisted);
      handleHashWishlistAccountPassword(hashParentPassword);
    }
    setShowWaitlistModal(false);
    getSchedules();
  };

  return (
    <>
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
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteModal}
        onClose={handleCloseDeleteModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalBox>
          <DeletionModal handleConfirmDelete={handleConfirmDelete} />
        </ModalBox>
      </Modal>

      {/* Present Logs Modal ------------------------------------------> */}

      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showPresentModal}
        onClose={handleCloseModalPresent}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>{showConItemsPresent()}</ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showSecPresentModal}
        onClose={handleAttemptCloseSecModalPresent}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalBox>{TermsAndCondiPresent()}</ModalBox>
      </Modal>

      {/* video modal ---------------------------> */}

      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showVideoModal}
        onClose={handleCloseVideoModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalBox>
          <VideoModal handleConfirmVideo={handleConfirmVideo} />
        </ModalBox>
      </Modal>

      {/* waitlist modal */}

      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showWaitlistModal}
        onClose={handleCloseWaitlistModal}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <ModalBox>
          <WaitlistModal
            handleConfirmSetIsWaitlisted={handleConfirmSetIsWaitlisted}
          />
        </ModalBox>
      </Modal>

      <StudentParentCon>
        <FlexerSwitch>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
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
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  marginTop: activeSchedType === "Permanent" ? "0px" : "0px",
                  background:
                    activeSchedType === "Permanent" ? "white" : "transparent",
                  backgroundImage:
                    activeSchedType === "Permanent"
                      ? "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)"
                      : "transparent",
                  color:
                    activeSchedType === "Permanent" ? "#07bbff" : "#07bbff",

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
              ></div>

              <div
                onClick={() => handleDayChange("Permanent")}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "4px",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  marginTop: activeSchedType === "Temporary" ? "0px" : "0px",
                  background:
                    activeSchedType === "Temporary" ? "white" : "transparent",
                  backgroundImage:
                    activeSchedType === "Temporary"
                      ? "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)"
                      : "transparent",
                  color:
                    activeSchedType === "Temporary" ? "#07bbff" : "#07bbff",

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
              ></div>
            </TableContainer>

            {activeSchedType === "Permanent" && (
              <div>
                <PermanentTitle>Permanent</PermanentTitle>
              </div>
            )}
          </div>
          {activeSchedType === "Permanent" && (
            <>
              <SearchMainCon>
                <div
                  style={{
                    position: "absolute",
                    top: "6px",
                    left: "8px",
                    width: "26px",
                    height: "26px",
                    zIndex: "2",
                    borderRadius: "50%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <RiSearchLine
                    style={{
                      color: "#007bff",
                      fontSize: "16px",
                    }}
                  />
                </div>
                <SearchBar
                  type="text"
                  placeholder="Search.."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div style={{ display: "flex", gap: "8px" }}>
                  {isDayDesc ? (
                    <div onClick={toggleFilterDay}>
                      <FilterButton onClick={sortByDayOfWeek}>
                        <BsSortAlphaDown style={{ fontSize: "18px" }} />
                      </FilterButton>
                    </div>
                  ) : (
                    <div onClick={toggleFilterDay}>
                      <FilterButton onClick={sortByDayOfWeekDesc}>
                        <BsSortAlphaUpAlt style={{ fontSize: "18px" }} />
                      </FilterButton>
                    </div>
                  )}
                  {isNameDesc ? (
                    <div onClick={toggleFilterName}>
                      <FilterButton onClick={sortAlphabetically}>
                        <BsSortUp style={{ fontSize: "18px" }} />
                      </FilterButton>
                    </div>
                  ) : (
                    <div onClick={toggleFilterName}>
                      <FilterButton onClick={sortAlphabeticallyDesc}>
                        <BsSortDownAlt style={{ fontSize: "18px" }} />
                      </FilterButton>
                    </div>
                  )}
                </div>
              </SearchMainCon>
              <Flexer>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "10px",
                    width: "100%",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: "rgba(255, 255, 255, 1)",
                      padding: "13px 20px",
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      width: "68%",
                      borderTop: "2px solid #122c8e",
                      borderBottom: "2px solid #122c8e",
                      borderLeft: "2px solid #122c8e",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "76%",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <div style={{ width: "82px" }}>
                          <h5
                            style={{
                              color: "#007bff",
                              margin: "0",
                              letterSpacing: "0.2px",
                              fontWeight: "500",
                            }}
                          >
                            ID
                          </h5>
                        </div>

                        <h5
                          style={{
                            color: "#007bff",
                            margin: "0",
                            letterSpacing: "0.2px",
                            fontWeight: "500",
                          }}
                        >
                          Student's Info
                        </h5>
                      </div>
                      <h5
                        style={{
                          color: "#007bff",
                          margin: "0",
                          letterSpacing: "0.2px",
                          fontWeight: "500",
                        }}
                      >
                        Type | Status
                      </h5>
                    </div>
                  </div>
                  <div
                    style={{
                      backgroundImage:
                        "radial-gradient(100% 100% at 100% 0, #5468ff 0, #5468ff 100%)",
                      padding: "13px 14px",
                      boxShadow:
                        "rgba(0, 0, 0, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
                      borderTopRightRadius: "24px",
                      borderBottomRightRadius: "24px",
                      width: "31%",
                    }}
                  >
                    <h5
                      style={{
                        color: "white",
                        margin: "0",
                        letterSpacing: "0.2px",
                        fontWeight: "500",
                      }}
                    >
                      Actions
                    </h5>
                  </div>
                </div>
              </Flexer>

              <Flexer>
                <div
                  style={{
                    backgroundColor: "#f0ffff",
                    backgroundImage: `url(${dots})`,
                    borderRadius: "12px",
                    border: "1px solid rgba(7, 187, 255, 0.4)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    padding: "4px 4px 4px 4px",
                    width: "100%",
                    height: "530px",
                    overflow: "hidden",
                    overflowY: "scroll",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: "100%",
                      height: "100%",
                    }}
                  >
                    {filteredSchedules.length === 0 ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            gap: "8px",
                            marginTop: "-64px",
                          }}
                        >
                          <BsInboxes
                            style={{
                              fontSize: "28px",
                              color: "rgba(0, 123, 255, 1)",
                            }}
                          />
                          <div
                            style={{
                              color: "rgba(0, 123, 255, 1)",
                              fontSize: "14px",
                            }}
                          >
                            No data
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        {filteredSchedules
                          .filter((schedule) => schedule.length !== 0)
                          .map((schedule) => (
                            <ZebraDiv>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  padding: "14px 16px",
                                  width: "70%",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    width: "100%",
                                  }}
                                >
                                  <div
                                    style={{
                                      margin: "0px",
                                      fontWeight: "500",
                                      lineHeight: "22px",
                                      fontSize: "13px",
                                      letterSpacing: "0.2px",
                                      width: "81px",
                                    }}
                                  >
                                    {schedule.cardId
                                      ? schedule.cardId.slice(-3)
                                      : ""}
                                  </div>
                                  <div
                                    style={{
                                      margin: "0px",
                                      fontWeight: "500",
                                      lineHeight: "22px",
                                      fontSize: "13px",
                                      letterSpacing: "0.2px",
                                      width: "340px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        fontWeight: "500",
                                        letterSpacing: "0.2px",
                                        color: "blue",
                                        fontSize: "13px",
                                      }}
                                    >
                                      {schedule.nameOfStudent}
                                    </span>{" "}
                                    |{" "}
                                    <span
                                      style={{
                                        wordSpacing: "0px",
                                        textTransform: "lowercase",
                                      }}
                                    >
                                      {schedule.timing}
                                    </span>
                                    , {schedule.day} <br />
                                    <span style={{ fontSize: "13px" }}>
                                      {schedule.parent
                                        ? schedule.parent
                                            .split(" ")
                                            .slice(0, 2)
                                            .join(" ")
                                        : ""}{" "}
                                    </span>
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      flexDirection: "column",
                                      alignItems: "flex-start",
                                      justifyContent: "center",
                                      gap: "0px",
                                      width: "200px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "flex-start",
                                        alignItems: "center",
                                        gap: "8px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          gap: "12px",
                                        }}
                                      >
                                        <h5
                                          style={{
                                            margin: "0px",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            fontSize: "13px",
                                            letterSpacing: "0.2px",
                                          }}
                                        >
                                          {schedule.studentType}
                                        </h5>
                                      </div>
                                      {"|"}
                                      <div
                                        style={{
                                          margin: "0px",

                                          fontWeight: "500",
                                          lineHeight: "22px",
                                          fontSize: "13px",
                                          wordSpacing: "1px",
                                        }}
                                      >
                                        {schedule.isActive ===
                                          "No info yet" && (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: "8px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                color: "#122c8e",
                                                fontSize: "13px",
                                              }}
                                            >
                                              No info
                                            </div>
                                          </div>
                                        )}
                                        {schedule.isActive === "Present" && (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: "8px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                color: "#2AAA8A",
                                                fontSize: "13px",
                                              }}
                                            >
                                              Present
                                            </div>
                                          </div>
                                        )}
                                        {schedule.isActive === "Absent" && (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: "8px",
                                            }}
                                          >
                                            <div
                                              style={{
                                                color: "#ff3131",
                                                fontSize: "13px",
                                              }}
                                            >
                                              Absent
                                            </div>
                                          </div>
                                        )}
                                      </div>
                                      {"|"}
                                      {schedule.isActive !== "Absent" && (
                                        <div
                                          style={{
                                            margin: "0px",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            fontSize: "12px",
                                            wordSpacing: "1px",
                                          }}
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                              gap: "8px",
                                            }}
                                          >
                                            {schedule.isVideoOn ? (
                                              <>
                                                <div
                                                  style={{
                                                    color: "#007bff",
                                                    fontSize: "13px",
                                                  }}
                                                >
                                                  Online
                                                </div>
                                              </>
                                            ) : (
                                              <>
                                                <div
                                                  style={{
                                                    color: "#122c8e",
                                                  }}
                                                >
                                                  On-site
                                                </div>
                                              </>
                                            )}
                                          </div>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  width: "30%",
                                  padding: "16px 14px",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: "4px",
                                  }}
                                >
                                  <LowerIconDiv>
                                    <PersonIcon sx={{ fontSize: "14px" }} />
                                  </LowerIconDiv>
                                  <LowerIconDiv2
                                    onClick={() => navigateUpdate(schedule._id)}
                                  >
                                    <EditIcon sx={{ fontSize: "14px" }} />
                                  </LowerIconDiv2>

                                  <LowerIconDiv4
                                    onClick={() =>
                                      handleClickDelete(schedule._id)
                                    }
                                  >
                                    <BsX style={{ fontSize: "20px" }} />
                                  </LowerIconDiv4>
                                </div>

                                {showExtraFunc ? (
                                  <div
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <IconSortContainer
                                      onClick={() =>
                                        handleClickSetIsWaitlisted(
                                          schedule._id,
                                          schedule.parent
                                        )
                                      }
                                    >
                                      <BsCheckCircle
                                        style={{
                                          color: "#4CBB17",
                                          fontSize: "20px",
                                        }}
                                      />
                                    </IconSortContainer>
                                    <IconSortContainer>
                                      <BsExclamationCircle
                                        style={{
                                          color: "#FFBF00",
                                          fontSize: "20px",
                                        }}
                                      />
                                    </IconSortContainer>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <BiDotsVerticalRounded
                                  onClick={toggleExtraFunc}
                                  style={{
                                    fontSize: "24px",
                                    color: "rgba(0, 123, 255, 0.6)",
                                    cursor: "pointer",
                                  }}
                                />
                              </div>
                            </ZebraDiv>
                          ))}
                      </>
                    )}
                  </div>
                </div>
              </Flexer>
            </>
          )}
        </FlexerSwitch>
      </StudentParentCon>
    </>
  );
};
export default WaitlistSchedule;
