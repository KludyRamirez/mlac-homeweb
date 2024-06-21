import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import DeleteScheduleModal from "./DeleteScheduleModal";
import DeleteManyScheduleModal from "./DeleteManyScheduleModal";
import { useNavigate } from "react-router-dom";
import EditSchedule from "./EditSchedule";
import PatchScheduleStatus from "./PatchScheduleStatus";
import pdfExporter from "../../../externalUtils/pdfExporter";
import { ModalBox } from "../../auth/register/registerComponents/CreateUser";
import {
  FaArrowUpRightFromSquare,
  FaPenToSquare,
  FaTrashCan,
} from "react-icons/fa6";
import Ellipsis from "../../../externalUtils/Ellipsis";
import ReasonSchedule from "./ReasonSchedule";
import { BsCheck, BsX } from "react-icons/bs";

const SchedulesTable = ({
  auth,
  axios,
  setLoading,
  toast,
  schedules,
  students,
  getSchedules,
  selectedSchedules,
  setSelectedSchedules,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [scheduleDeleteId, setScheduleDeleteId] = useState("");
  const [showDeleteScheduleModal, setShowDeleteScheduleModal] = useState(false);
  const [showDeleteManyScheduleModal, setShowDeleteManyScheduleModal] =
    useState(false);
  const [showEditScheduleModal, setShowEditScheduleModal] = useState(false);
  const [selectedScheduleEdit, setSelectedScheduleEdit] = useState(null);
  const [showPatchScheduleModal, setShowPatchScheduleModal] = useState(false);
  const [selectedSchedulePatch, setSelectedSchedulePatch] = useState(null);
  const [showRemarksScheduleModal, setShowRemarksScheduleModal] =
    useState(false);
  const [selectedScheduleRemarks, setSelectedScheduleRemarks] = useState(null);

  const [exportTrigger, setExportTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (schedules.length > 0 && selectedSchedules.length === schedules.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedSchedules, schedules]);

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
      setSelectedSchedules(schedules.map((s) => s._id));
    } else {
      setSelectedSchedules([]);
    }
  };

  const deleteSelectedSchedules = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error("Authentication token not found.");
        navigate("/");
        return;
      }

      const res = await axios.delete(`/api/schedules/deleteSelected`, {
        data: { schedules: selectedSchedules },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setSelectedSchedules([]);
      setSelectAll(false);
      getSchedules();
      toast.success(res?.data?.message);
    } catch (error) {
      console.error("Error deleting selected schedules:", error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Unauthorized access. Please check your permissions.");
          navigate("/error");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected schedules.");
      }
    }
  };

  const deleteOneSchedule = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(`/api/schedule/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      getSchedules();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting Schedule:", error);
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
      getSchedules();
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

  // edit Schedule functions

  const handleScheduleEditClick = (cas) => {
    try {
      setSelectedScheduleEdit(cas);
    } catch (error) {
      console.error("Error handling schedule edit click:", error);
    } finally {
      setShowEditScheduleModal(true);
    }
  };

  const handleCloseModalEdit = () => {
    setShowEditScheduleModal(false);
  };

  // patch statusOfSchedule

  const handleSchedulePatchClick = (cas) => {
    try {
      setSelectedSchedulePatch(cas);
    } catch (error) {
      console.error("Error handling schedule Patch click:", error);
    } finally {
      setShowPatchScheduleModal(true);
    }
  };

  const handleCloseModalPatch = () => {
    setShowPatchScheduleModal(false);
  };

  // schedule remarks

  // const handleScheduleRemarksClick = (cas) => {
  //   try {
  //     setSelectedScheduleRemarks(cas);
  //     console.log(cas);
  //   } catch (error) {
  //     console.error("Error handling schedule Remarks click:", error);
  //   } finally {
  //     setShowRemarksScheduleModal(true);
  //   }
  // };

  const handleCloseModalRemarks = () => {
    setShowRemarksScheduleModal(false);
  };

  const exportPDF = () => {
    setExportTrigger(true);
  };

  if (exportTrigger) {
    pdfExporter(selectedSchedules, schedules, setExportTrigger);
  }

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditScheduleModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditSchedule
            handleCloseModalEdit={handleCloseModalEdit}
            selectedScheduleEdit={selectedScheduleEdit}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getSchedules={getSchedules}
            students={students}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showPatchScheduleModal}
        onClose={handleCloseModalPatch}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "38%" }}>
          <PatchScheduleStatus
            handleCloseModalPatch={handleCloseModalPatch}
            selectedSchedulePatch={selectedSchedulePatch}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getSchedules={getSchedules}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showRemarksScheduleModal}
        onClose={handleCloseModalRemarks}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "38%" }}>
          <ReasonSchedule
            handleCloseModalRemarks={handleCloseModalRemarks}
            selectedScheduleRemarks={selectedScheduleRemarks}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getSchedules={getSchedules}
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
        <ModalBox sx={{ width: "22%" }}>
          <DeleteScheduleModal
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
        <ModalBox sx={{ width: "22%" }}>
          <DeleteManyScheduleModal
            deleteSelectedSchedules={deleteSelectedSchedules}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`flex flex-col bg-[#2d333b] rounded-[10px] text-[#c5d1de] border-[1px] border-[#2d333b] phone:overflow-x-scroll ${
          schedules && schedules.length > 5 ? "overflow-y-scroll" : ""
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
          <div className="w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Student
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Day
          </div>
          <div className=" w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Timing
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Type
          </div>
          <div className=" w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Parent
          </div>
          <div className=" w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
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

        {schedules.length > 0 ? (
          <>
            {schedules?.map((s, k) => (
              <div
                className={`phone:w-[fit-content]
              flex items-center gap-4 px-6 last:rounded-bl-[10px] rounded-br-[10px] ${
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
                <div className="w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.nameOfStudent}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.day}
                </div>
                <div className="w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.timing}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.student?.studentType}
                </div>
                <div className="w-[200px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.parent}
                </div>
                <div
                  className={`${
                    s.isActive === "Present"
                      ? "bg-gradient-to-r from-[#008000] to-[transparent] hover:to-[#008000] border-[1px] border-[#008000] cursor-pointer"
                      : "bg-gradient-to-r from-[#ff3131] to-[transparent] hover:to-[#ff3131] border-[1px] border-[#ff3131] cursor-pointer"
                  } w-[170px] text-[#ffffff] text-[15px] flex justify-center items-center py-1 px-4 rounded-[24px] gap-2`}
                >
                  {s?.isActive?.slice(0, 7)}
                  {s?.isActive === "Present" ? (
                    <BsCheck className="text-[18px]" />
                  ) : (
                    <BsX className="text-[18px]" />
                  )}
                </div>

                <div className="w-[170px] whitespace-nowrap flex justify-start items-center px-2 gap-2">
                  {selectedSchedules.length < 2 ? (
                    allowedRoles?.find((ar) =>
                      auth?.userDetails?.role?.includes(ar)
                    ) ? (
                      <>
                        <div
                          onClick={() => handleSchedulePatchClick(s)}
                          className="relative container w-[36px] h-[36px] flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaArrowUpRightFromSquare className="text-[18px]" />
                        </div>
                        <div
                          onClick={() => handleScheduleEditClick(s)}
                          className="p-2 bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaPenToSquare className="text-[18px]" />
                        </div>
                        <div
                          onClick={() => handleClickDelete(s?._id)}
                          className="p-2 bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaTrashCan className="text-[18px]" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative container w-[36px] h-[36px] flex justify-center items-center bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaArrowUpRightFromSquare className="text-[18px]" />
                        </div>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaPenToSquare className="text-[18px]" />
                        </div>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaTrashCan className="text-[18px]" />
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="relative container w-[36px] h-[36px] flex justify-center items-center bg-[transparent] text-[#c5d1de] rounded-[18px]">
                        <FaArrowUpRightFromSquare className="text-[18px]" />
                      </div>
                      <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                        <FaPenToSquare className="text-[18px]" />
                      </div>
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
                  getSchedules={getSchedules}
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

export default SchedulesTable;
