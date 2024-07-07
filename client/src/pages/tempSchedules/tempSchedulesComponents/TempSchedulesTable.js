import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import { useNavigate } from "react-router-dom";
import pdfExporter from "../../../externalUtils/pdfExporter";
import { ModalBox } from "../../auth/register/registerComponents/CreateUser";
import { FaTrashCan, FaVideo } from "react-icons/fa6";
import Ellipsis from "../../../externalUtils/Ellipsis";
import DeleteTempScheduleModal from "./DeleteTempScheduleModal";
import DeleteManyTempScheduleModal from "./DeleteManyTempScheduleModal";
import { BsCheck, BsLink45Deg, BsX } from "react-icons/bs";
import ShowZoomLinkModal from "../../../externalUtils/ShowZoomLinkModal";

const TempSchedulesTable = ({
  auth,
  axios,
  setLoading,
  toast,
  tempSchedules,
  getTempSchedules,
  selectedSchedules,
  setSelectedSchedules,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [scheduleDeleteId, setScheduleDeleteId] = useState("");
  const [showDeleteScheduleModal, setShowDeleteScheduleModal] = useState(false);
  const [showDeleteManyScheduleModal, setShowDeleteManyScheduleModal] =
    useState(false);
  const [exportTrigger, setExportTrigger] = useState(false);
  const [showZoomLink, setShowZoomLink] = useState(false);
  const [selectedScheduleZoomLink, setSelectedScheduleZoomLink] =
    useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    if (
      tempSchedules.length > 0 &&
      selectedSchedules.length === tempSchedules.length
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedSchedules, tempSchedules]);

  const toggleScheduleSelection = (scheduleId) => {
    let updatedSelectedSchedules = [...selectedSchedules];

    if (updatedSelectedSchedules.includes(scheduleId)) {
      updatedSelectedSchedules = updatedSelectedSchedules?.filter(
        (id) => id !== scheduleId
      );
    } else {
      updatedSelectedSchedules = [...updatedSelectedSchedules, scheduleId];
    }

    setSelectedSchedules(updatedSelectedSchedules);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedSchedules(tempSchedules.map((s) => s._id));
    } else {
      setSelectedSchedules([]);
    }
  };

  const deleteSelectedSchedules = async () => {
    try {
      if (!auth.userDetails || !auth?.userDetails?.token) {
        navigate("/");
        return;
      }

      const res = await axios.delete(`/api/temp-schedules/deleteSelected`, {
        data: { tempSchedules: selectedSchedules },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setSelectedSchedules([]);
      setSelectAll(false);
      getTempSchedules();
      toast.success(res?.data?.message);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 403) {
          toast.error("Unauthorized access. Please check your permissions.");
          navigate("/error");
        } else {
          toast.error(error?.response?.data?.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected schedules.");
      }
    }
  };

  const deleteOneSchedule = async (id) => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(`/api/temp-schedule/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      getTempSchedules();
      toast.success(res.data.message);
    } catch (error) {
      toast.error("Error deleting specified schedule.");
    }
  };

  const handleClickDelete = (id) => {
    setScheduleDeleteId(id);
    setShowDeleteScheduleModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (scheduleDeleteId) {
        await deleteOneSchedule(scheduleDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteScheduleModal(false);
      getTempSchedules();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteScheduleModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyScheduleModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyScheduleModal(false);
  };

  //export trigger function

  const exportPDF = () => {
    setExportTrigger(true);

    if (exportTrigger) {
      pdfExporter(selectedSchedules, tempSchedules, setExportTrigger);
    }
  };

  const handleShowZoomLink = (schedule) => {
    try {
      setSelectedScheduleZoomLink(schedule);
    } catch (error) {
      console.error("Error handling schedule edit click:", error);
    } finally {
      setShowZoomLink(true);
    }
  };

  const handleCloseZoomLinkModal = () => {
    setShowZoomLink(false);
  };

  let randomString;

  const handleCreateZoomLink = async (s) => {
    const generateRandomString = (length) => {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    };

    randomString = generateRandomString(10);

    try {
      const res = await axios.post(
        `/api/schedulevideostatus/${s._id}`,
        { randomString, day: s?.day, timing: s?.timing },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data?.message);
    }
  };

  const handlePatchVideoStatus = async (id, videoStatus) => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }

      const videoStatusMapping = {
        On: "Off",
        Off: "On",
      };

      const videoStatusBool = videoStatusMapping[videoStatus];

      if (!videoStatusBool) {
        console.error("Invalid video status:", videoStatus);
        return;
      }

      const res = await axios.patch(
        `/api/schedule/${id}/setVideo`,
        {
          isVideoOn: videoStatusBool,
        },
        {
          headers: {
            withCredentials: true,
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );

      toast.success(res?.data?.message);
      getTempSchedules();
    } catch (error) {
      console.error("Error fetching cases!", error);
    }
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showZoomLink}
        onClose={handleCloseZoomLinkModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox
          sx={{
            width: "fit-content",
            background: "transparent",
          }}
        >
          <ShowZoomLinkModal
            handleCloseZoomLinkModal={handleCloseZoomLinkModal}
            selectedScheduleZoomLink={selectedScheduleZoomLink}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getTempSchedules={getTempSchedules}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteScheduleModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "fit-content", background: "transparent" }}>
          <DeleteTempScheduleModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyScheduleModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "fit-content", background: "transparent" }}>
          <DeleteManyTempScheduleModal
            deleteSelectedSchedules={deleteSelectedSchedules}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`flex flex-col bg-[#2d333b] rounded-[10px] text-[#c5d1de] phone:overflow-x-scroll ${
          tempSchedules && tempSchedules.length > 5 ? "overflow-y-scroll" : ""
        }`}
      >
        <div className="phone:w-[fit-content] flex items-center gap-4 px-6 bg-[#2d333b] rounded-[10px]">
          <div className="w-[30px] h-[60px] flex justify-start items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px]"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </div>
          <div className="w-[80px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            ID
          </div>
          <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Student
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Date
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Day
          </div>
          <div className=" w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Timing
          </div>
          <div className=" w-[100px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Type
          </div>
          <div className=" w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Companion
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Status
          </div>
          {selectedSchedules.length > 1 ? (
            allowedRoles?.find((ar) =>
              auth?.userDetails?.role?.includes(ar)
            ) ? (
              <>
                <div className="flex justify-start items-center gap-2">
                  <div
                    className="flex gap-1 justify-start items-center py-1 px-2 bg-[#ff3131] border-[1px] border-[#ff3131] text-white text-[14px] rounded-[4px] cursor-pointer"
                    onClick={handleOpenModalDeleteMany}
                  >
                    <span>Delete</span>
                  </div>
                  <div
                    className="flex gap-1 justify-start items-center py-1 px-2 bg-[green] border-[1px] border-[green] text-white text-[14px] rounded-[4px] cursor-pointer"
                    onClick={exportPDF}
                  >
                    <span>Export</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-[170px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
                <span>Actions</span>
              </div>
            )
          ) : (
            <div className="w-[170px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {tempSchedules.length > 0 ? (
          <>
            {tempSchedules?.map((s, k) => (
              <div
                className={`phone:w-[fit-content]
              flex items-center gap-4 px-6 last:rounded-bl-[8px] last:rounded-br-[8px] ${
                k % 2 === 0 ? "bg-[#22272e]" : "bg-transparent"
              }`}
                key={k}
              >
                <div className="w-[30px] h-[60px] flex justify-start items-center">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px]"
                    checked={selectedSchedules?.includes(s?._id)}
                    onChange={() => toggleScheduleSelection(s?._id)}
                  />
                </div>
                <div className="w-[80px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.scheduleId.slice(11)}
                </div>
                <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.studentName}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {new Date(s?.dateTime)?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.day}
                </div>
                <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.timing}
                </div>
                <div className="w-[100px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.studentType}
                </div>
                <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.companion?.nameOfStudent}
                </div>
                <div
                  className={`${
                    s.isActive === "Present" &&
                    "bg-gradient-to-r from-[#0FFF50] to-[#008000] hover:to-[#0FFF50] cursor-pointer text-[#ffffff] "
                  } ${
                    s.isActive === "Absent" &&
                    "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] cursor-pointer text-[#ffffff] "
                  } ${
                    s.isActive === "No information yet" &&
                    "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] cursor-pointer text-[#22272e] "
                  } w-[120px] text-[14px] flex justify-center items-center py-1 px-3 rounded-[24px] gap-1`}
                >
                  {s?.isActive?.slice(0, 7)}
                  {s?.isActive === "Present" ? (
                    <BsCheck className="text-[24px]" />
                  ) : (
                    <BsX className="text-[24px]" />
                  )}
                </div>

                <div className="w-[170px] whitespace-nowrap flex justify-start items-center px-2 gap-2">
                  {selectedSchedules.length < 2 ? (
                    allowedRoles?.find((ar) =>
                      auth?.userDetails?.role?.includes(ar)
                    ) ? (
                      <>
                        <div
                          onClick={() => handleClickDelete(s?._id)}
                          className="p-2 bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaTrashCan className="text-[18px]" />
                        </div>
                        <div
                          onClick={() =>
                            handlePatchVideoStatus(s?._id, s?.isVideoOn)
                          }
                          className="p-2 bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaVideo className="text-[18px]" />
                        </div>
                        {s?.isVideoOn === "On" ? (
                          <>
                            {s?.zoomLink ? (
                              <div
                                onClick={() => handleShowZoomLink(s)}
                                className="flex justify-center items-center gap-2 ml-1 py-1 px-3 rounded-[28px] w-[130px] cursor-pointer bg-gradient-to-br from-[#007bff] to-[#3F00FF] hover:from-[#ffffff] hover:to-[#c5d1de] text-[14px] text-[#ffffff] hover:text-[#22272e]"
                              >
                                <span>Show Zoom</span>
                                <BsLink45Deg className="text-[18px]" />
                              </div>
                            ) : (
                              <div
                                onClick={() => handleCreateZoomLink(s)}
                                className="flex justify-center items-center gap-2 ml-1 py-1 px-3 rounded-[28px] w-[130px] cursor-pointer bg-gradient-to-br from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[14px] text-[#2d333b]"
                              >
                                <span>Create Zoom</span>
                                <BsLink45Deg className="text-[18px]" />
                              </div>
                            )}
                          </>
                        ) : null}
                      </>
                    ) : (
                      <>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaTrashCan className="text-[18px]" />
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                        <FaTrashCan className="text-[18px]" />
                      </div>
                    </>
                  )}
                </div>
                <Ellipsis
                  item={s}
                  auth={auth}
                  axios={axios}
                  setLoading={setLoading}
                  toast={toast}
                  getTempSchedules={getTempSchedules}
                />
              </div>
            ))}
          </>
        ) : (
          <div className="bg-transparent w-[100%] flex flex-col justify-center items-center gap-2 text-[#c5d1de] rounded-bl-[12px] rounded-br-[12px]"></div>
        )}
      </div>
    </>
  );
};

export default TempSchedulesTable;
