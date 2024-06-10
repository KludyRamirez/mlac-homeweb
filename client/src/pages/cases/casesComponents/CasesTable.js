import React, { useEffect, useState } from "react";
import { BsFolder2Open } from "react-icons/bs";
import Modal from "@mui/material/Modal";
import DeleteCaseModal from "./DeleteCaseModal";
import DeleteManyCaseModal from "./DeleteManyCaseModal";
import { useNavigate } from "react-router-dom";
import EditCase from "./EditCase";
import PatchCaseStatus from "./PatchCaseStatus";
import RemarksCase from "./RemarksCase";
import pdfExporter from "../../../externalUtils/pdfExporter";
import { ModalBox } from "../../auth/register/registerComponents/CreateUser";
import {
  FaArrowUpRightFromSquare,
  FaPenToSquare,
  FaTrashCan,
} from "react-icons/fa6";

const CasesTable = ({
  auth,
  axios,
  setLoading,
  toast,
  cases,
  students,
  getCases,
  selectedCases,
  setSelectedCases,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [caseDeleteId, setCaseDeleteId] = useState("");
  const [showDeleteCaseModal, setShowDeleteCaseModal] = useState(false);
  const [showDeleteManyCaseModal, setShowDeleteManyCaseModal] = useState(false);
  const [showEditCaseModal, setShowEditCaseModal] = useState(false);
  const [selectedCaseEdit, setSelectedCaseEdit] = useState(null);
  const [showPatchCaseModal, setShowPatchCaseModal] = useState(false);
  const [selectedCasePatch, setSelectedCasePatch] = useState(null);
  const [showRemarksCaseModal, setShowRemarksCaseModal] = useState(false);
  const [selectedCaseRemarks, setSelectedCaseRemarks] = useState(null);

  const [exportTrigger, setExportTrigger] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cases.length > 0 && selectedCases.length === cases.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedCases, cases]);

  const toggleCaseSelection = (caseId) => {
    let updatedSelectedCases = [...selectedCases];

    if (updatedSelectedCases.includes(caseId)) {
      updatedSelectedCases = updatedSelectedCases.filter((id) => id !== caseId);
    } else {
      updatedSelectedCases = [...updatedSelectedCases, caseId];
    }

    setSelectedCases(updatedSelectedCases);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedCases(cases.map((c) => c._id));
    } else {
      setSelectedCases([]);
    }
  };

  const deleteSelectedCases = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error("Authentication token not found.");
        navigate("/");
        return;
      }

      const res = await axios.delete(`/api/cases/deleteSelected`, {
        data: { cases: selectedCases },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setSelectedCases([]);
      setSelectAll(false);
      getCases();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected Cases:", error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Unauthorized access. Please check your permissions.");
          navigate("/forbidden");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected cases.");
      }
    }
  };

  const deleteOneCase = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(`/api/case/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      getCases();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting Case:", error);
    }
  };

  const handleClickDelete = (id) => {
    setCaseDeleteId(id);
    setShowDeleteCaseModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (caseDeleteId) {
        await deleteOneCase(caseDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteCaseModal(false);
      getCases();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteCaseModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyCaseModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyCaseModal(false);
  };

  // edit Case functions

  const handleCaseEditClick = (cas) => {
    try {
      setSelectedCaseEdit(cas);
      console.log(cas);
    } catch (error) {
      console.error("Error handling case edit click:", error);
    } finally {
      setShowEditCaseModal(true);
    }
  };

  const handleCloseModalEdit = () => {
    setShowEditCaseModal(false);
  };

  // patch statusOfCase

  const handleCasePatchClick = (cas) => {
    try {
      setSelectedCasePatch(cas);
      console.log(cas);
    } catch (error) {
      console.error("Error handling case Patch click:", error);
    } finally {
      setShowPatchCaseModal(true);
    }
  };

  const handleCloseModalPatch = () => {
    setShowPatchCaseModal(false);
  };

  // case remarks

  // const handleCaseRemarksClick = (cas) => {
  //   try {
  //     setSelectedCaseRemarks(cas);
  //     console.log(cas);
  //   } catch (error) {
  //     console.error("Error handling case Remarks click:", error);
  //   } finally {
  //     setShowRemarksCaseModal(true);
  //   }
  // };

  const handleCloseModalRemarks = () => {
    setShowRemarksCaseModal(false);
  };

  // export to pdf

  const exportPDF = () => {
    setExportTrigger(true);
  };

  if (exportTrigger) {
    pdfExporter(selectedCases, cases, setExportTrigger);
  }

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditCaseModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditCase
            handleCloseModalEdit={handleCloseModalEdit}
            selectedCaseEdit={selectedCaseEdit}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getCases={getCases}
            students={students}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showPatchCaseModal}
        onClose={handleCloseModalPatch}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "38%" }}>
          <PatchCaseStatus
            handleCloseModalPatch={handleCloseModalPatch}
            selectedCasePatch={selectedCasePatch}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getCases={getCases}
            students={students}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showRemarksCaseModal}
        onClose={handleCloseModalRemarks}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "38%" }}>
          <RemarksCase
            handleCloseModalRemarks={handleCloseModalRemarks}
            selectedCaseRemarks={selectedCaseRemarks}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getCases={getCases}
            students={students}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteCaseModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "22%" }}>
          <DeleteCaseModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyCaseModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "22%" }}>
          <DeleteManyCaseModal
            deleteSelectedCases={deleteSelectedCases}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`bg-[#2d333b] flex flex-col rounded-[10px] border-[0px] border-[#2d333b] text-[#c5d1de] phone:overflow-x-scroll ${
          cases && cases.length > 5 ? "overflow-y-scroll" : ""
        }`}
      >
        <div className="phone:w-[fit-content] flex items-center gap-4 px-6">
          <div className="w-[30px] h-[60px] flex justify-start items-center">
            <input
              type="checkbox"
              className="w-[18px] h-[18px]"
              checked={selectAll}
              onChange={toggleSelectAll}
            />
          </div>
          <div className="w-[90px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            No. | Off
          </div>
          <div className="w-[110px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Student No.
          </div>
          <div className="w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Name
          </div>
          <div className=" w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Department
          </div>
          <div className=" w-[60px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Year
          </div>
          <div className=" w-[80px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Section
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Violation
          </div>
          <div className=" w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Incident Date
          </div>
          <div className=" w-[160px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Date Reported
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[24px]">
            Case Status
          </div>
          {selectedCases.length > 1 ? (
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
              <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
                <span>Actions</span>
              </div>
            )
          ) : (
            <div className="w-[118px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] bg-[#22272e] py-1 px-3 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {cases.length > 0 ? (
          <>
            {cases?.map((c, k) => (
              <div
                className={`phone:w-[fit-content]
              flex items-center gap-4 px-6 ${
                k % 2 === 0 ? "bg-[#22272e]" : "bg-transparent"
              }`}
                key={k}
              >
                <div className="w-[30px] h-[60px] flex justify-start items-center">
                  <input
                    type="checkbox"
                    className="w-[18px] h-[18px]"
                    checked={selectedCases?.includes(c?._id)}
                    onChange={() => toggleCaseSelection(c?._id)}
                  />
                </div>
                <div className="w-[90px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px] ">
                  {c?.caseNo}
                  <div>{c?.offense}</div>
                </div>
                <div className="w-[110px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {c?.student?.studentNo}
                </div>
                <div className="w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {c?.student?.firstName} {c?.student?.surName}
                </div>
                <div className=" w-[118px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {c?.student?.department?.slice(0, 9)}...
                </div>
                <div className=" w-[60px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {c?.year}
                </div>
                <div className=" w-[80px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {c?.student?.section}
                </div>
                <div className=" w-[120px] flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {c?.reportedViolation?.slice(0, 18)}...
                </div>
                <div className=" w-[150px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {new Date(c?.dateOfIncident)?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className=" w-[160px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px]">
                  {new Date(c?.dateReported)?.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
                <div className="container flex justify-start items-center w-[120px] whitespace-nowrap flex justify-start items-center py-1 px-3 rounded-[4px] gap-3">
                  <div
                    className={`${
                      c?.statusOfCase === "Case Solved"
                        ? "text-[#32CD32]"
                        : "text-[#c5d1de]"
                    }`}
                  >
                    {c?.statusOfCase}
                  </div>
                </div>
                <div className="w-[130px] whitespace-nowrap flex justify-start items-center gap-2">
                  {selectedCases.length < 2 ? (
                    allowedRoles?.find((ar) =>
                      auth?.userDetails?.role?.includes(ar)
                    ) ? (
                      <>
                        <div
                          onClick={() => handleCasePatchClick(c)}
                          className="relative container w-[36px] h-[36px] flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaArrowUpRightFromSquare className="text-[18px]" />
                        </div>
                        <div
                          onClick={() => handleCaseEditClick(c)}
                          className="p-2 bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaPenToSquare className="text-[18px]" />
                        </div>
                        <div
                          onClick={() => handleClickDelete(c?._id)}
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
              </div>
            ))}
          </>
        ) : (
          <div className="bg-gray-900 w-[100%] flex flex-col justify-center items-center gap-2 text-[#c5d1de] rounded-bl-[12px] rounded-br-[12px]">
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        )}
      </div>
    </>
  );
};

export default CasesTable;
