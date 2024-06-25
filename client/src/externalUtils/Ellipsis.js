import React, { useState, useEffect, useRef } from "react";
import { FaEllipsisVertical } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { Modal } from "@mui/material";
import { ModalBox } from "../pages/auth/register/registerComponents/CreateUser";
import ReasonSchedule from "../pages/schedules/schedulesComponents/ReasonSchedule";
import handlePostScheduleDate from "./DayToDateConverter";
import ReasonTempSchedule from "../pages/tempSchedules/tempSchedulesComponents/ReasonTempSchedule";
import ReasonTempSolo from "../pages/tempSolo/tempSoloComponents/ReasonTempSolo";

export default function Ellipsis({
  item,
  auth,
  axios,
  setLoading,
  toast,
  getSchedules,
  getTempSchedules,
  getTempSoloSchedules,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showReasonScheduleModal, setShowReasonScheduleModal] = useState(false);
  const [selectedScheduleReason, setSelectedScheduleReason] = useState(null);

  const [showReasonTempScheduleModal, setShowReasonTempScheduleModal] =
    useState(false);
  const [selectedTempScheduleReason, setSelectedTempScheduleReason] =
    useState(null);

  const [showReasonTempSoloScheduleModal, setShowReasonTempSoloScheduleModal] =
    useState(false);
  const [selectedTempSoloScheduleReason, setSelectedTempSoloScheduleReason] =
    useState(null);

  const location = useLocation();

  const menuRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
    }
  };

  const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });

  const handleScheduleReasonClick = (r) => {
    try {
      setSelectedScheduleReason(r);
    } catch (error) {
      console.error("Error handling schedule Reason click:", error);
    } finally {
      setShowReasonScheduleModal(true);
    }
  };

  const handleCloseModalReason = () => {
    setShowReasonScheduleModal(false);
  };

  // start of temporarysched functions
  // api request for temporary schedule logs

  const handleSubmitTempLogs = async (item, attendance) => {
    try {
      const res = await axios.post(
        `/api/logs`,
        { attendance, ...item },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );

      toast.success(res?.data?.message);
      if (location.pathname === "/temp-schedules") {
        getTempSchedules();
      } else if (location.pathname === "/temp-solo") {
        getTempSoloSchedules();
      }
    } catch (err) {
      toast.error("An error occurred while adding logs");
    }
  };

  const handleTempScheduleReasonClick = (r) => {
    try {
      setSelectedTempScheduleReason(r);
    } catch (error) {
      console.error("Error handling Tempschedule Reason click:", error);
    } finally {
      setShowReasonTempScheduleModal(true);
    }
  };

  const handleTempCloseModalReason = () => {
    setShowReasonTempScheduleModal(false);
  };

  // start of temp-solo functions
  // api request for temporary schedule logs

  const handleTempSoloScheduleReasonClick = (r) => {
    try {
      setSelectedTempSoloScheduleReason(r);
    } catch (error) {
      console.error("Error handling temp-solo reason click:", error);
    } finally {
      setShowReasonTempSoloScheduleModal(true);
    }
  };

  const handleTempSoloCloseModalReason = () => {
    setShowReasonTempSoloScheduleModal(false);
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showReasonScheduleModal}
        onClose={handleCloseModalReason}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "30%" }}>
          <ReasonSchedule
            handleCloseModalReason={handleCloseModalReason}
            selectedScheduleReason={selectedScheduleReason}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getSchedules={getSchedules}
            handlePostScheduleDate={handlePostScheduleDate}
            attendance="Absent"
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showReasonTempScheduleModal}
        onClose={handleTempCloseModalReason}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "30%" }}>
          <ReasonTempSchedule
            handleTempCloseModalReason={handleTempCloseModalReason}
            selectedTempScheduleReason={selectedTempScheduleReason}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getTempSchedules={getTempSchedules}
            attendance="Absent"
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showReasonTempSoloScheduleModal}
        onClose={handleTempSoloCloseModalReason}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "30%" }}>
          <ReasonTempSolo
            handleTempSoloCloseModalReason={handleTempSoloCloseModalReason}
            selectedTempSoloScheduleReason={selectedTempSoloScheduleReason}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getTempSoloSchedules={getTempSoloSchedules}
            attendance="Absent"
          />
        </ModalBox>
      </Modal>
      <div className="relative">
        {location.pathname === "/schedules" ? (
          <>
            {isMenuOpen && (
              <>
                <div
                  ref={menuRef}
                  className="absolute bottom-[54px] right-[-38px] w-[144px] h-[96px] flex flex-col justify-center items-center text-[#22272e] bg-gradient-to-r from-[#ffffff] to-[#c5d1de] rounded-[16px]"
                >
                  {item.day === currentDay ? (
                    <>
                      <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                        Present
                      </div>
                      <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                        <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                        Absent
                      </div>
                    </>
                  ) : (
                    <>
                      {item?.isActive === "No information yet" && (
                        <>
                          <div
                            onClick={() =>
                              handlePostScheduleDate(
                                item,
                                auth,
                                toast,
                                axios,
                                getSchedules,
                                "Present",
                                setIsMenuOpen(false)
                              )
                            }
                            className="rounded-tl-[12px] rounded-tr-[12px] cursor-pointer hover:text-[#ffffff] flex justify-center items-center w-[100%] h-[50%] bg-transparent hover:bg-[#4cbb17] gap-3"
                          >
                            Present
                          </div>
                          <div
                            onClick={() =>
                              handleScheduleReasonClick(
                                item,
                                setIsMenuOpen(false)
                              )
                            }
                            className="group rounded-bl-[12px] rounded-br-[12px] cursor-pointer hover:text-[#ffffff] flex justify-center items-center w-[100%] h-[50%] bg-gradient-to-r from-[#ff3131] to-[#ff3131] text-[#ffffff] gap-3"
                          >
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-gradient-to-r from-[#ff3131] to-[#ff3131] transform rotate-[45deg] group-hover:bg-gradient-to-r group-hover:from-[#ff3131] group-hover:to-[#ff3131]"></div>
                            Absent
                          </div>
                        </>
                      )}
                      {item?.isActive === "Absent" ? (
                        <>
                          <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                            Present
                          </div>
                          <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                            Absent
                          </div>
                        </>
                      ) : null}
                      {item?.isActive === "Present" ? (
                        <>
                          <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                            Present
                          </div>
                          <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                            Absent
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : null}

        {location.pathname === "/temp-schedules" ? (
          <>
            {isMenuOpen && (
              <>
                <div
                  ref={menuRef}
                  className="absolute bottom-[54px] right-[-38px] w-[144px] h-[96px] flex flex-col justify-center items-center text-[#22272e] bg-gradient-to-r from-[#ffffff] to-[#c5d1de] rounded-[16px]"
                >
                  {item.day === currentDay ? (
                    <>
                      <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                        Present
                      </div>
                      <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                        <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                        Absent
                      </div>
                    </>
                  ) : (
                    <>
                      {item?.isActive === "No information yet" && (
                        <>
                          <div
                            onClick={() =>
                              handleSubmitTempLogs(
                                item,
                                "Present",
                                setIsMenuOpen(false)
                              )
                            }
                            className="rounded-tl-[12px] rounded-tr-[12px] cursor-pointer hover:text-[#ffffff] flex justify-center items-center w-[100%] h-[50%] bg-transparent hover:bg-[#4cbb17] gap-3"
                          >
                            Present
                          </div>
                          <div
                            onClick={() =>
                              handleTempScheduleReasonClick(
                                item,
                                setIsMenuOpen(false)
                              )
                            }
                            className="group rounded-bl-[12px] rounded-br-[12px] cursor-pointer hover:text-[#ffffff] flex justify-center items-center w-[100%] h-[50%] bg-gradient-to-r from-[#ff3131] to-[#ff3131] text-[#ffffff] gap-3"
                          >
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-gradient-to-r from-[#ff3131] to-[#ff3131] transform rotate-[45deg] group-hover:bg-gradient-to-r group-hover:from-[#ff3131] group-hover:to-[#ff3131]"></div>
                            Absent
                          </div>
                        </>
                      )}
                      {item?.isActive === "Absent" ? (
                        <>
                          <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                            Present
                          </div>
                          <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                            Absent
                          </div>
                        </>
                      ) : null}
                      {item?.isActive === "Present" ? (
                        <>
                          <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                            Present
                          </div>
                          <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                            Absent
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : null}

        {location.pathname === "/temp-solo" ? (
          <>
            {isMenuOpen && (
              <>
                <div
                  ref={menuRef}
                  className="absolute bottom-[54px] right-[-38px] w-[144px] h-[96px] flex flex-col justify-center items-center text-[#22272e] bg-gradient-to-r from-[#ffffff] to-[#c5d1de] rounded-[16px]"
                >
                  {item.day === currentDay ? (
                    <>
                      <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                        Present
                      </div>
                      <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                        <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                        Absent
                      </div>
                    </>
                  ) : (
                    <>
                      {item?.isActive === "No information yet" && (
                        <>
                          <div
                            onClick={() =>
                              handleSubmitTempLogs(
                                item,
                                "Present",
                                setIsMenuOpen(false)
                              )
                            }
                            className="rounded-tl-[12px] rounded-tr-[12px] cursor-pointer hover:text-[#ffffff] flex justify-center items-center w-[100%] h-[50%] bg-transparent hover:bg-[#4cbb17] gap-3"
                          >
                            Present
                          </div>
                          <div
                            onClick={() =>
                              handleTempSoloScheduleReasonClick(
                                item,
                                setIsMenuOpen(false)
                              )
                            }
                            className="group rounded-bl-[12px] rounded-br-[12px] cursor-pointer hover:text-[#ffffff] flex justify-center items-center w-[100%] h-[50%] bg-gradient-to-r from-[#ff3131] to-[#ff3131] text-[#ffffff] gap-3"
                          >
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-gradient-to-r from-[#ff3131] to-[#ff3131] transform rotate-[45deg] group-hover:bg-gradient-to-r group-hover:from-[#ff3131] group-hover:to-[#ff3131]"></div>
                            Absent
                          </div>
                        </>
                      )}
                      {item?.isActive === "Absent" ? (
                        <>
                          <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                            Present
                          </div>
                          <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                            Absent
                          </div>
                        </>
                      ) : null}
                      {item?.isActive === "Present" ? (
                        <>
                          <div className="rounded-tl-[16px] rounded-tr-[16px] flex justify-center items-center w-[100%] h-[50%] bg-transparent gap-3 text-[#ffffff]">
                            Present
                          </div>
                          <div className="rounded-bl-[12px] rounded-br-[12px] flex justify-center items-center w-[100%] h-[50%] bg-[#c5d1de] text-[#ffffff] gap-3">
                            <div className="absolute bottom-[-8px] right-[45px] w-[20px] h-[20px] bg-[#c5d1de] transform rotate-[45deg]"></div>
                            Absent
                          </div>
                        </>
                      ) : null}
                    </>
                  )}
                </div>
              </>
            )}
          </>
        ) : null}

        <div
          onClick={() => setIsMenuOpen(true)}
          className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
        >
          <FaEllipsisVertical className="text-[18px]" />
        </div>
      </div>
    </>
  );
}
