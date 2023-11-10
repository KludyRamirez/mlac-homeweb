import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import PaginationItem from "@mui/material/PaginationItem";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useParams } from "react-router-dom";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import PersonIcon from "@mui/icons-material/Person";
import BlockIcon from "@mui/icons-material/Block";
import Tilt from "react-parallax-tilt";
import { RiSearchLine } from "react-icons/ri";
import Modal from "@mui/material/Modal";
import AbsentScheduleCard from "./AbsentScheduleCard";
import AuditModal from "./AuditModal";
import DeletionModal from "./DeletionModal";
import {
  BsCheckLg,
  BsCameraReels,
  BsPatchMinus,
  BsTrash,
  BsFullscreenExit,
  BsArrowsFullscreen,
} from "react-icons/bs";
import { MdVideocam } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {
  AiOutlineSortDescending,
  AiOutlineSortAscending,
} from "react-icons/ai";
import { toast } from "react-toastify";
import { HiOutlineFilter } from "react-icons/hi";

const CustomPaginationItem = styled(PaginationItem)(({ theme }) => ({
  border: "none",
  borderRadius: "10px",
  color: "white",
  background: "#5468ff",
  "&:hover": {
    border: "1px solid #5468ff",
    backgroundColor: "white",
    color: "#5468ff",
  },
}));

const FormTitle = styled("div")({
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #007bff 0, #007bff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  alignSelf: "flex-end",
});

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
}));

const SearchMainCon = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  position: "relative",
  marginTop: "24px",
  width: "100%",
  "@media (max-width: 767px)": {},
}));

const SearchBar = styled("input")(({ theme }) => ({
  width: "18%",
  height: "26px",
  background: "rgba(7, 187, 255, 0.1)",
  border: "1px solid transparent",
  borderRadius: "10px",
  zIndex: "1",
  padding: "6px 0px 6px 42px",
  fontSize: "12px",
  fontWeight: "600",
  color: "#007bff",
  // outline: "1px solid #007bff",

  "&:focus": {
    outline: "2px solid #122c8e",
    border: "1px solid transparent",
  },
  "&::placeholder": {
    color: "rgba(0, 123, 255, 0.4)",
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
  backgroundColor: "#ffffff",
  backgroundImage:
    "url(data:image/png;base64,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)",

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
  "&:nth-child(even)": {
    background: "rgba(255, 255, 255, 0.6)",
    borderRadius: "10px",
    boxShadow:
      "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
  },

  "&:nth-child(odd)": {
    background: "transparent",
  },
});

const FilterButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "38px",
  height: "36px",
  background: "rgba(7, 187, 255, 0.1)",
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 1px",
  borderRadius: "10px",
  cursor: "pointer",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const selectCon = (state) => state.con;
const conSelector = createSelector([selectCon], (con) => con);

const selectAudit = (state) => state.audit;
const auditSelector = createSelector([selectAudit], (audit) => audit);

const AllSchedule = () => {
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
  const [showExtraFunc, setShowExtraFunc] = useState(false);
  //modals
  const [showModal, setShowModal] = useState(false);
  const [showSecModal, setShowSecModal] = useState(false);
  // delete modals
  const [deleteId, setDeleteId] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  //
  const [showViewModal, setShowViewModal] = useState(false);

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
  };

  const navigateUpdate = (id) => {
    history.push(`/schedule/${id}`);
  };

  // delete modal
  const deleteOneSchedule = async (id) => {
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
                  width: "25px",
                  height: "25px",
                  borderRadius: "50%",
                  marginTop: activeSchedType === "Permanent" ? "0px" : "0px",
                  background:
                    activeSchedType === "Permanent"
                      ? "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)"
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
                <BsArrowsFullscreen />
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
                      ? "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)"
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
                <BsFullscreenExit />
              </div>
            </TableContainer>

            {activeSchedType === "Permanent" && (
              <>
                <FormTitle>
                  <h2
                    style={{
                      color: "#007bff",
                      margin: "0",
                      fontWeight: "700",
                      letterSpacing: "-2px",
                      paddingRight: "2px",
                    }}
                  >
                    Permanent
                  </h2>
                </FormTitle>
              </>
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
                  {isNameDesc ? (
                    <div onClick={toggleFilterName}>
                      <FilterButton onClick={sortAlphabetically}>
                        <AiOutlineSortAscending
                          style={{ fontSize: "18px", color: "#122c8e" }}
                        />
                      </FilterButton>
                    </div>
                  ) : (
                    <div onClick={toggleFilterName}>
                      <FilterButton onClick={sortAlphabeticallyDesc}>
                        <AiOutlineSortDescending
                          style={{ fontSize: "18px", color: "#122c8e" }}
                        />
                      </FilterButton>
                    </div>
                  )}

                  {isDayDesc ? (
                    <div onClick={toggleFilterDay}>
                      <FilterButton onClick={sortByDayOfWeek}>
                        <HiOutlineFilter
                          style={{ fontSize: "18px", color: "#122c8e" }}
                        />
                      </FilterButton>
                    </div>
                  ) : (
                    <div onClick={toggleFilterDay}>
                      <FilterButton onClick={sortByDayOfWeekDesc}>
                        <HiOutlineFilter
                          style={{ fontSize: "18px", color: "#122c8e" }}
                        />
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
                      background: "rgba(255, 255, 255, 0.8)",
                      padding: "13px 16px",
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      width: "70%",
                      boxShadow:
                        "rgba(0, 123, 255, 0.06) 0px 2px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 2px -1px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "70%",
                      }}
                    >
                      <h5
                        style={{
                          color: "#007bff",
                          margin: "0",
                          letterSpacing: "0.2px",
                          fontWeight: "600",
                        }}
                      >
                        Student's Info
                      </h5>
                      <h5
                        style={{
                          color: "#007bff",
                          margin: "0",
                          letterSpacing: "0.2px",
                          fontWeight: "600",
                        }}
                      >
                        Status
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
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                      width: "30%",
                    }}
                  >
                    <h5
                      style={{
                        color: "white",
                        margin: "0",
                        letterSpacing: "0.2px",
                        fontWeight: "600",
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
                    background: "rgba(7, 187, 255, 0.1)",
                    borderRadius: "12px",
                    padding: "4px 4px 4px 4px",
                    boxShadow:
                      "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
                    width: "1064px",
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
                    }}
                  >
                    {filteredSchedules.map((schedule) => (
                      <ZebraDiv>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "16px",
                            width: "70%",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              width: "71.5%",
                            }}
                          >
                            <h5
                              style={{
                                margin: "0px",
                                color: "#122c8e",
                                fontWeight: "600",
                                lineHeight: "22px",
                              }}
                            >
                              {schedule.nameOfStudent},{" "}
                              {schedule.cardId ? schedule.cardId.slice(-2) : ""}{" "}
                              |{" "}
                              <span
                                style={{
                                  wordSpacing: "0px",
                                  textTransform: "lowercase",
                                }}
                              >
                                {schedule.timing}
                              </span>{" "}
                              <br /> {schedule.day}, {schedule.studentType}{" "}
                              <br />
                            </h5>
                            <div
                              style={{
                                display: "flex",
                                height: "100%",
                                justifyContent: "flex-start",
                                alignItems: "center",
                                gap: "8px",
                              }}
                            >
                              <div
                                style={{
                                  width: "10px",
                                  height: "10px",
                                  background: "#00FF7F",
                                  borderRadius: "50%",
                                }}
                              ></div>
                              <h5
                                style={{
                                  margin: "0px",
                                  color: "#122c8e",
                                  fontWeight: "600",
                                  lineHeight: "22px",
                                  wordSpacing: "1px",
                                }}
                              >
                                Enrolled
                              </h5>
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
                            <LowerIconDiv3>
                              <BsCheckLg sx={{ fontSize: "14px" }} />
                            </LowerIconDiv3>
                            <LowerIconDiv4
                              onClick={() => handleAddToContainer(schedule)}
                            >
                              <BlockIcon sx={{ fontSize: "14px" }} />
                            </LowerIconDiv4>
                          </div>

                          {showExtraFunc ? (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <IconSortContainer>
                                <BsCameraReels
                                  style={{ color: "#122c8e", fontSize: "20px" }}
                                />
                              </IconSortContainer>
                              <IconSortContainer>
                                <BsPatchMinus
                                  style={{ color: "#F4BB44", fontSize: "20px" }}
                                />
                              </IconSortContainer>
                              <IconSortContainer
                                onClick={() => handleClickDelete(schedule._id)}
                              >
                                <BsTrash
                                  style={{ color: "#Ff3131", fontSize: "20px" }}
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
                              color: "rgba(0, 0, 0, 0.2)",
                              cursor: "pointer",
                            }}
                          />
                        </div>
                      </ZebraDiv>
                    ))}
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
export default AllSchedule;
