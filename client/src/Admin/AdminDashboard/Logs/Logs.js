import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import { RiSearchLine } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import AbsentScheduleCard from "../AllSchedule/AbsentScheduleCard";
import AuditModal from "../AllSchedule/AuditModal";
import DeletionModal from "../AllSchedule/DeletionModal";
import Tilt from "react-parallax-tilt";
import {
  BsX,
  BsCameraVideo,
  BsCalendar2Check,
  BsCalendar2X,
  BsExclamationCircle,
  BsInboxes,
  BsSortUp,
  BsSortDownAlt,
  BsSortAlphaDown,
  BsSortAlphaUpAlt,
  BsMegaphone,
} from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { toast } from "react-toastify";
import moment from "moment";
import PresentAuditModal from "../AllSchedule/PresentAuditModal";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import TimeBar from "../TimeBar/TimeBar";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowX: "scroll",
    overflowY: "scroll",
    justifyContent: "flex-start",
  },
});

const StudentParentCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "transparent",
  width: "100%",
  zIndex: "2",
  padding: "0px 40px",

  "@media (max-width: 767px)": {
    padding: "10px",
    marginTop: "10px",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "34px 0px 20px 38px",
  fontSize: "16px",
  fontWeight: "500",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",

  "@media (max-width: 767px)": {
    fontSize: "48px",
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
  padding: "6px 0px 6px 40px",
  fontSize: "13px",
  fontWeight: "500",
  color: "#122c8e",
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
  fontSize: "13px",
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

const FlexRow = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "40px",
  width: "100%",
  height: "100%",

  "@media (max-width: 767px)": {
    justifyContent: "flex-start",
  },
});

const FlexerSwitch = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  gap: "12px",
});

const ZebraDiv = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  color: "#122c8e",
  "&:nth-child(even)": {
    background: "rgba(255, 255, 255, 0.9)",
    borderRadius: "10px",
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
  paddingRight: "2px",

  "@media (max-width: 767px)": {},
});

const StatsCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "136px",
  height: "112px",
  overflow: "hidden",
  borderRadius: "10px",
  padding: "0px 12px",
  gap: "4px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const Logs = () => {
  const [schedules, setSchedules] = useState([]);
  const [schedulesPresent, setSchedulesPresent] = useState([]);
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

  const auth = useSelector(authSelector);

  useEffect(() => {
    updateExpiredTemporarySchedule();
    updateExpiredTemporarySoloSchedule();
    handleDeleteCon();
  }, []);

  useEffect(() => {
    getLogs();
  }, [auth, searchQuery]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSchedules(schedules);
    } else {
      const filtered = schedules.filter((schedule) =>
        schedule.schedules.some(
          (sched) =>
            (sched.schedule &&
              sched.schedule.nameOfStudent &&
              sched.schedule.nameOfStudent
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (sched.schedule &&
              sched.schedule.studentType &&
              sched.schedule.studentType
                .toLowerCase()
                .includes(searchQuery.toLowerCase())) ||
            (sched.schedule &&
              sched.schedule.parent &&
              sched.schedule.parent
                ?.split(" ")
                .slice(0, 2)
                .join(" ")
                .toLowerCase()
                .includes(searchQuery.toLowerCase()))
        )
      );
      setFilteredSchedules(filtered);
    }
  }, [searchQuery, schedules]);

  // useEffect(() => {
  //   const mixedTempFiltered = mixedTempSchedules.filter((schedule) => {
  //     return (
  //       (schedule.tempStudentName && schedule.tempStudentName.nameOfStudent)
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase()) ||
  //       schedule.cardId
  //         ?.slice(-4)
  //         .toLowerCase()
  //         .includes(searchQuery.toLowerCase())
  //     );
  //   });
  //   setFilteredMixedSchedules(mixedTempFiltered);
  // }, [searchQuery, mixedTempSchedules]);

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

  const getLogs = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const url = `${process.env.REACT_APP_API}/logs`;
      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      const params = { searchQuery };
      const res = await axios.get(url, { headers, params });

      console.log("----------------------->", res.data);

      setSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const getTempLogs = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const url = `${process.env.REACT_APP_API}/templogs`;
      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      const res = await axios.get(url, { headers });

      setTempSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

  const getTempSoloLogs = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const url = `${process.env.REACT_APP_API}/tempsolologs`;
      const headers = {
        Authorization: `Bearer ${auth.userDetails.token}`,
      };

      const res = await axios.get(url, { headers });

      setTempSoloSchedules(res.data);
    } catch (err) {
      console.error("Error fetching schedules:", err);
    }
  };

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
    setShowSecModal(false);
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
      getLogs();
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
      getLogs();
    }
    setShowDeleteModal(false);
  };

  const formatTimestamp = (timestamp) => {
    return moment(timestamp).format("MMMM Do YYYY");
  };

  const TermsAndCondiPresent = () => (
    <div>
      <PresentAuditModal />
    </div>
  );

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox></ModalBox>
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

      <StudentParentCon>
        <TitleCon>
          <FormTitle sx={{ paddingLeft: "6px", paddingRight: "0" }}>
            {"<"} Mlac Homeweb <span style={{ fontSize: "12px" }}>/</span>{" "}
          </FormTitle>
          <FormTitle sx={{ paddingLeft: "6px", paddingRight: "0" }}>
            Logs
          </FormTitle>
        </TitleCon>
        <TitleCon>
          <FormTitle
            sx={{
              paddingLeft: "6px",
              paddingRight: "0",
              paddingTop: "0",
              fontSize: "32px",
              fontWeight: "500",
            }}
          >
            Logs
          </FormTitle>
        </TitleCon>
        <FlexRow>
          <FlexerSwitch>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "1174px",
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
                  onClick={() => handleDayChange("Temporary")}
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
              {activeSchedType === "Temporary" && (
                <div>
                  <PermanentTitle>Temporary</PermanentTitle>
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
                    {/* {isNameDesc ? (
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
                    )} */}
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
                        width: "70%",
                        borderTop: "1px solid rgba(7, 187, 255, 0.6)",
                        borderBottom: "1px solid rgba(7, 187, 255, 0.6)",
                        borderLeft: "1px solid rgba(7, 187, 255, 0.6)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "90%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div style={{ width: "80px" }}>
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
                          Parent
                        </h5>

                        <h5
                          style={{
                            color: "#007bff",
                            margin: "0",
                            letterSpacing: "0.2px",
                            fontWeight: "500",
                          }}
                        >
                          Date issued
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
                      // backgroundImage: `url(${dots})`,
                      borderRadius: "12px",
                      border: "1px solid rgba(7, 187, 255, 0.4)",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(4px)",
                      padding: "4px 4px 4px 4px",
                      width: "1164px",
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
                            }}
                          >
                            <BsInboxes
                              style={{
                                fontSize: "24px",
                                color: "rgba(0, 123, 255, 1)",
                              }}
                            />
                            <div
                              style={{
                                color: "rgba(0, 123, 255, 1)",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                            >
                              No data
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {filteredSchedules.map((schedule) => (
                            <ZebraDiv key={schedule._id}>
                              {schedule.schedules.map((sched) => (
                                <>
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
                                        {schedule._id
                                          ? schedule._id.slice(-3)
                                          : ""}
                                      </div>
                                      <div
                                        style={{
                                          margin: "0px",
                                          fontWeight: "500",
                                          lineHeight: "22px",
                                          fontSize: "13px",
                                          letterSpacing: "0.2px",
                                          width: "284px",
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
                                          {sched &&
                                            sched.schedule &&
                                            sched.schedule.nameOfStudent}
                                        </span>{" "}
                                        |{" "}
                                        <span
                                          style={{
                                            wordSpacing: "0px",
                                            textTransform: "lowercase",
                                          }}
                                        >
                                          {sched &&
                                            sched.schedule &&
                                            sched.schedule.timing}
                                        </span>
                                        , <br />{" "}
                                        {sched &&
                                          sched.schedule &&
                                          sched.schedule.day}{" "}
                                        |{" "}
                                        {sched &&
                                          sched.schedule &&
                                          sched.schedule.studentType}
                                      </div>
                                      <div
                                        style={{
                                          margin: "0px",
                                          fontWeight: "500",
                                          lineHeight: "22px",
                                          fontSize: "13px",
                                          letterSpacing: "0.2px",
                                          width: "240px",
                                        }}
                                      >
                                        <span
                                          style={{
                                            fontWeight: "500",
                                            letterSpacing: "0.2px",
                                            color: "blue",
                                            fontSize: "13px",
                                            textTransform: "capitalize",
                                          }}
                                        >
                                          {sched &&
                                          sched.schedule &&
                                          sched.schedule.parent
                                            ? sched &&
                                              sched.schedule &&
                                              sched.schedule.parent
                                                .split(" ")
                                                .slice(0, 2)
                                                .join(" ")
                                            : ""}
                                        </span>
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          flexDirection: "column",
                                          alignItems: "flex-start",
                                          justifyContent: "center",
                                          gap: "0px",
                                          width: "162px",
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
                                              {formatTimestamp(
                                                schedule.createdAt
                                              )}
                                            </h5>
                                          </div>
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
                                    </div>

                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {schedule.isVideoOn === false &&
                                        schedule.isActive !== "Absent" && (
                                          <IconSortContainer>
                                            <BsCameraVideo
                                              style={{
                                                color: "#007bff",
                                                fontSize: "20px",
                                              }}
                                            />
                                          </IconSortContainer>
                                        )}

                                      {schedule.isActive !== "Present" &&
                                        schedule.isActive !== "Absent" && (
                                          <>
                                            <IconSortContainer>
                                              <BsCalendar2Check
                                                style={{
                                                  color: "#4CBB17",
                                                  fontSize: "20px",
                                                }}
                                              />
                                            </IconSortContainer>
                                            <IconSortContainer>
                                              <BsCalendar2X
                                                style={{
                                                  color: "#Ff3131",
                                                  fontSize: "20px",
                                                }}
                                              />
                                            </IconSortContainer>
                                          </>
                                        )}

                                      <IconSortContainer>
                                        <BsExclamationCircle
                                          style={{
                                            color: "#FFBF00",
                                            fontSize: "20px",
                                          }}
                                        />
                                      </IconSortContainer>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </ZebraDiv>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                </Flexer>
              </>
            )}

            {activeSchedType === "Temporary" && (
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
                        width: "70%",
                        borderTop: "1px solid rgba(7, 187, 255, 0.6)",
                        borderBottom: "1px solid rgba(7, 187, 255, 0.6)",
                        borderLeft: "1px solid rgba(7, 187, 255, 0.6)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "78.7%",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <div style={{ width: "80px" }}>
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
                          Date issued
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
                      // backgroundImage: `url(${dots})`,
                      borderRadius: "12px",
                      border: "1px solid rgba(7, 187, 255, 0.4)",
                      backdropFilter: "blur(4px)",
                      WebkitBackdropFilter: "blur(4px)",
                      padding: "4px 4px 4px 4px",
                      width: "1164px",
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
                      {filteredMixedSchedules.length === 0 ? (
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
                            }}
                          >
                            <BsInboxes
                              style={{
                                fontSize: "24px",
                                color: "rgba(0, 123, 255, 1)",
                              }}
                            />
                            <div
                              style={{
                                color: "rgba(0, 123, 255, 1)",
                                fontSize: "13px",
                                fontWeight: "500",
                              }}
                            >
                              No data
                            </div>
                          </div>
                        </div>
                      ) : (
                        <>
                          {filteredMixedSchedules
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
                                        width: "320px",
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
                                        {schedule.tempStudentName &&
                                          schedule.tempStudentName
                                            .nameOfStudent}
                                      </span>{" "}
                                      |{" "}
                                      <span
                                        style={{
                                          wordSpacing: "0px",
                                          textTransform: "lowercase",
                                        }}
                                      >
                                        {schedule.timing}
                                        {schedule.permanentSched &&
                                          schedule.permanentSched.timing}
                                      </span>
                                      , {schedule.tempSoloDay} <br />
                                      <span style={{ fontSize: "13px" }}>
                                        {schedule.tempStudentName &&
                                        schedule.tempStudentName.parent
                                          ? schedule.tempStudentName &&
                                            schedule.tempStudentName.parent
                                              .split(" ")
                                              .slice(0, 2)
                                              .join(" ")
                                          : ""}
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
                                            margin: "0px",
                                            fontWeight: "500",
                                            lineHeight: "22px",
                                            fontSize: "13px",
                                            letterSpacing: "0.2px",
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
                                      </div>
                                      <div
                                        style={{
                                          display: "flex",
                                          justifyContent: "flex-start",
                                          alignItems: "center",
                                          gap: "8px",
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
                                          {formatTimestamp(schedule.dateTime)}
                                        </h5>
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
                                      justifyContent: "center",
                                    }}
                                  >
                                    {schedule.isActive !== "Present" &&
                                      schedule.isActive !== "Absent" && (
                                        <>
                                          <IconSortContainer>
                                            <BsCalendar2Check
                                              style={{
                                                color: "#4CBB17",
                                                fontSize: "20px",
                                              }}
                                            />
                                          </IconSortContainer>
                                          <IconSortContainer>
                                            <BsCalendar2X
                                              style={{
                                                color: "#Ff3131",
                                                fontSize: "20px",
                                              }}
                                            />
                                          </IconSortContainer>
                                        </>
                                      )}
                                  </div>
                                  <div style={{ padding: "0 20px 0 0" }}>
                                    <TimeBar
                                      key={schedule._id}
                                      scheduleDate={schedule.dateTime}
                                    />
                                  </div>
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
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              gap: "12px",
              marginTop: "54px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%",
              }}
            >
              <div>
                <div
                  style={{
                    width: "100%",
                    height: "236px",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "10px",
                    boxShadow:
                      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    background: "#122c8e",
                    WebkitBackdropFilter: "blur(4px)",
                    backdropFilter: "blur(4px)",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-start",
                      padding: "10px",
                    }}
                  >
                    <BsMegaphone style={{ fontSize: "24px", color: "white" }} />
                  </div>
                  <div
                    style={{
                      top: "138px",
                      right: "-52px",
                      position: "absolute",
                      width: "150px",
                      height: "150px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      background: "white",
                      borderRadius: "50%",
                      gap: "8px",
                    }}
                  >
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#122c8e",
                        borderRadius: "50%",
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: "#122c8e",
                        borderRadius: "50%",
                        boxShadow:
                          "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "112px",
                  borderTopLeftRadius: "10px",
                  borderTopRightRadius: "0px",
                  borderBottomRightRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  outline: "1px solid rgba(7, 187, 255, 0.3)",
                  boxShadow:
                    "rgba(0, 123, 255, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                  background: "#f0ffff",
                  WebkitBackdropFilter: "blur(4px)",
                  backdropFilter: "blur(4px)",
                }}
              ></div>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <Tilt>
                <StatsCard
                  sx={{
                    outline: "1px solid rgba(7, 187, 255, 0.3)",
                    boxShadow:
                      "rgba(0, 123, 255, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    background: "#f0ffff",
                    WebkitBackdropFilter: "blur(4px)",
                    backdropFilter: "blur(4px)",

                    cursor: "pointer",
                    listStyle: "none",
                    overflow: "hidden",
                    position: "relative",
                    textDecoration: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    touchAction: "manipulation",
                    willChange: "transform",
                    transition: "transform .15s",
                    color: "#122c8e",
                    ":hover": {
                      color: "white",
                      background: "#122c8e",
                      outline: "none",
                    },
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",

                      fontWeight: "400",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>Total</div>
                    <div style={{ marginTop: "-2px" }}>Schedules</div>
                  </div>
                  <div
                    style={{
                      fontSize: "42px",

                      fontWeight: "600",
                      alignSelf: "flex-end",
                    }}
                  >
                    19
                  </div>
                </StatsCard>
              </Tilt>
              <Tilt>
                <StatsCard
                  sx={{
                    outline: "1px solid rgba(7, 187, 255, 0.3)",
                    boxShadow:
                      "rgba(0, 123, 255, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    background: "#f0ffff",
                    WebkitBackdropFilter: "blur(4px)",
                    backdropFilter: "blur(4px)",
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "0px",
                    cursor: "pointer",
                    listStyle: "none",
                    overflow: "hidden",
                    position: "relative",
                    textDecoration: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    touchAction: "manipulation",
                    willChange: "transform",
                    transition: "transform .15s",
                    color: "#122c8e",
                    ":hover": {
                      color: "white",
                      background: "#FFBF00",
                      outline: "none",
                    },
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>Online</div>
                    <div style={{ marginTop: "-2px" }}>Schedules</div>
                  </div>
                  <div
                    style={{
                      fontSize: "42px",

                      fontWeight: "600",
                      alignSelf: "flex-end",
                    }}
                  >
                    7
                  </div>
                </StatsCard>
              </Tilt>
              <Tilt>
                <StatsCard
                  sx={{
                    outline: "1px solid rgba(7, 187, 255, 0.3)",
                    boxShadow:
                      "rgba(0, 123, 255, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
                    background: "#f0ffff",
                    WebkitBackdropFilter: "blur(4px)",
                    backdropFilter: "blur(4px)",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "10px",
                    borderBottomRightRadius: "10px",
                    borderBottomLeftRadius: "10px",
                    cursor: "pointer",
                    listStyle: "none",
                    overflow: "hidden",
                    position: "relative",
                    textDecoration: "none",
                    userSelect: "none",
                    WebkitUserSelect: "none",
                    touchAction: "manipulation",
                    willChange: "transform",
                    transition: "transform .15s",
                    color: "#122c8e",
                    ":hover": {
                      color: "white",
                      background: "#ff3131",
                      outline: "none",
                    },
                  }}
                >
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      marginTop: "10px",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div>Absent</div>
                    <div style={{ marginTop: "-2px" }}>Schedules</div>
                  </div>
                  <div
                    style={{
                      fontSize: "42px",
                      fontWeight: "600",
                      alignSelf: "flex-end",
                    }}
                  >
                    7
                  </div>
                </StatsCard>
              </Tilt>
            </div>
          </div>
        </FlexRow>
      </StudentParentCon>
    </Wrapper>
  );
};
export default Logs;
