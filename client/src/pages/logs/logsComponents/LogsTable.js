import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pdfExporter from "../../../externalUtils/pdfExporter";
import { FaTrashCan } from "react-icons/fa6";
import Ellipsis from "../../../externalUtils/Ellipsis";
import { BsCheck, BsX } from "react-icons/bs";
import { TbDownload, TbFileShredder } from "react-icons/tb";
import { IoMdDownload } from "react-icons/io";

const LogsTable = ({
  auth,
  axios,
  setLoading,
  toast,
  logs,
  getLogs,
  selectedLogs,
  setSelectedLogs,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  // const [logsDeleteId, setLogsDeleteId] = useState("");
  useState(false);
  const [exportTrigger, setExportTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (logs.length > 0 && selectedLogs.length === logs.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedLogs, logs]);

  const toggleLogsSelection = (logId) => {
    let updatedSelectedLogs = [...selectedLogs];

    if (updatedSelectedLogs.includes(logId)) {
      updatedSelectedLogs = updatedSelectedLogs?.filter((id) => id !== logId);
    } else {
      updatedSelectedLogs = [...updatedSelectedLogs, logId];
    }

    setSelectedLogs(updatedSelectedLogs);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedLogs(logs.map((s) => s._id));
    } else {
      setSelectedLogs([]);
    }
  };

  // const deleteSelectedLogs = async () => {
  //   try {
  //     if (!auth?.userDetails || !auth?.userDetails?.token) {
  //       navigate("/error");
  //       return;
  //     }

  //     const res = await axios.delete(`/api/logs/deleteSelected`, {
  //       data: { logs: selectedLogs },
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${auth?.userDetails?.token}`,
  //       },
  //     });
  //     setSelectedLogs([]);
  //     setSelectAll(false);
  //     getLogs();
  //     toast.success(res?.data?.message);
  //   } catch (error) {
  //     if (error.response) {
  //       if (error.response.status === 403) {
  //         toast.error("Unauthorized access. Please check your permissions.");
  //         navigate("/error");
  //       } else {
  //         toast.error(error?.response?.data?.message);
  //       }
  //     } else {
  //       toast.error("An error occurred while voiding the selected logs.");
  //     }
  //   }
  // };

  // const deleteOneSchedule = async (id) => {
  //   try {
  //     if (!auth?.userDetails?.token) {
  //       toast.error("Authentication token not found.");
  //       return;
  //     }
  //     const res = await axios.delete(`/api/logs/${id}`, {
  //       withCredentials: true,
  //       headers: {
  //         Authorization: `Bearer ${auth?.userDetails?.token}`,
  //       },
  //     });
  //     getLogs();
  //     toast.success(res?.data?.message);
  //   } catch (error) {
  //     toast.error("Error deleting specified schedule.");
  //   }
  // };

  // const handleClickDelete = (id) => {
  //   setLogsDeleteId(id);
  //   setShowDeleteScheduleModal(true);
  // };

  // const handleConfirmDelete = async () => {
  //   try {
  //     if (logsDeleteId) {
  //       await deleteOneSchedule(logsDeleteId);
  //     }
  //   } catch (error) {
  //     console.error("Error deleting schedule:", error);
  //   } finally {
  //     setShowDeleteScheduleModal(false);
  //     getLogs();
  //   }
  // };

  // const handleCloseModal = () => {
  //   setShowDeleteScheduleModal(false);
  // };

  // delete many modal

  // const handleOpenModalDeleteMany = () => {
  //   setShowDeleteManyScheduleModal(true);
  // };

  // const handleCloseModalDeleteMany = () => {
  //   setShowDeleteManyScheduleModal(false);
  // };

  //export trigger function

  const exportPDF = () => {
    setExportTrigger(true);

    if (exportTrigger) {
      pdfExporter(selectedLogs, logs, setExportTrigger);
    }
  };

  const exportSingleLog = (logId) => {
    setExportTrigger(true);

    if (exportTrigger) {
      pdfExporter(logId, logs, setExportTrigger);
    }
  };

  return (
    <>
      <div
        className={`flex flex-col bg-[#2d333b] rounded-[10px] text-[#c5d1de] border-[1px] border-[#2d333b] phone:overflow-x-scroll ${
          logs && logs.length > 5 ? "overflow-y-scroll h-[362px]" : ""
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
          <div className="w-[180px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Student
          </div>
          <div className=" w-[180px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Date
          </div>
          <div className=" w-[100px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Day
          </div>
          <div className=" w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Timing
          </div>
          <div className=" w-[100px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Type
          </div>
          <div className=" w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Parent
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[24px] border-[1px] border-[#22272e]">
            Status
          </div>
          {selectedLogs.length > 1 ? (
            allowedRoles?.find((ar) =>
              auth?.userDetails?.role?.includes(ar)
            ) ? (
              <>
                <div className="flex justify-start items-center gap-2">
                  <div
                    className="flex gap-1 justify-start items-center py-1 px-2 bg-[#ff3131] border-[1px] border-[#ff3131] text-white text-[14px] rounded-[4px] cursor-pointer"
                    // onClick={handleOpenModalDeleteMany}
                  >
                    <span>Void</span>
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

        {logs.length > 0 ? (
          <>
            {logs?.map((s, k) => (
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
                    checked={selectedLogs?.includes(s?._id)}
                    onChange={() => toggleLogsSelection(s?._id)}
                  />
                </div>
                <div className="w-[80px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.scheduleId?.slice(11)}
                </div>
                <div className="w-[180px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.nameOfStudent}
                </div>
                <div className="w-[180px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {new Date(s?.date)?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="w-[100px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.day}
                </div>
                <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.timing}
                </div>
                <div className="w-[100px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.studentId?.studentType}
                </div>
                <div className="w-[170px] whitespace-nowrap flex justify-start items-center py-1 px-4 rounded-[4px]">
                  {s?.parent}
                </div>
                <div
                  className={`${
                    s?.isActive === "Present" &&
                    "bg-gradient-to-r from-[#0FFF50] to-[#008000] hover:to-[#0FFF50] cursor-pointer text-[#ffffff] "
                  } ${
                    s?.isActive === "Absent" &&
                    "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] cursor-pointer text-[#ffffff] "
                  } ${
                    s?.isActive === "No information yet" &&
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
                  {selectedLogs.length < 2 ? (
                    allowedRoles?.find((ar) =>
                      auth?.userDetails?.role?.includes(ar)
                    ) ? (
                      <>
                        <div
                          onClick={() =>
                            exportSingleLog(s?._id, logs, setExportTrigger)
                          }
                          className="p-1 bg-[transparent] text-white rounded-[48px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <TbDownload className="text-[24px]" />
                        </div>
                        <div className="p-1 bg-[transparent] text-white rounded-[48px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]">
                          <TbFileShredder className="text-[24px]" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <TbDownload className="text-[18px]" />
                        </div>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <TbFileShredder className="text-[18px]" />
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                        <TbDownload className="text-[18px]" />
                      </div>
                      <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                        <TbFileShredder className="text-[18px]" />
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
                  getLogs={getLogs}
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

export default LogsTable;
