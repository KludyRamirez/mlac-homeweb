import React, { useEffect, useState } from "react";
import {
  BsEye,
  BsEyeFill,
  BsFolder2Open,
  BsPenFill,
  BsPen,
  BsTrash3,
  BsTrash3Fill,
} from "react-icons/bs";
import Modal from "@mui/material/Modal";
import DeleteManyStudentModal from "./DeleteManyStudentModal";
import DeleteStudentModal from "./DeleteStudentModal";
import { useNavigate } from "react-router-dom";
import EditStudent from "./EditStudent";
import { ModalBox } from "../../auth/register/registerComponents/CreateUser";
import {
  FaPenToSquare,
  FaArrowUpRightFromSquare,
  FaTrashCan,
} from "react-icons/fa6";
import Ellipsis from "../../../externalUtils/Ellipsis";

const StudentsTable = ({
  auth,
  setLoading,
  toast,
  axios,
  students,
  getStudents,
  selectedStudents,
  setSelectedStudents,
  schedules,
  allowedRoles,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [studentDeleteId, setStudentDeleteId] = useState("");
  const [showDeleteStudentModal, setShowDeleteStudentModal] = useState(false);
  const [showDeleteManyStudentModal, setShowDeleteManyStudentModal] =
    useState(false);
  const [showEditStudentModal, setShowEditStudentModal] = useState(false);
  const [selectedStudentEdit, setSelectedStudentEdit] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (students.length > 0 && selectedStudents.length === students.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedStudents, students]);

  const toggleStudentSelection = (studentId) => {
    let updatedSelectedStudents = [...selectedStudents];

    if (updatedSelectedStudents.includes(studentId)) {
      updatedSelectedStudents = updatedSelectedStudents.filter(
        (id) => id !== studentId
      );
    } else {
      updatedSelectedStudents = [...updatedSelectedStudents, studentId];
    }

    setSelectedStudents(updatedSelectedStudents);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedStudents(students.map((student) => student._id));
    } else {
      setSelectedStudents([]);
    }
  };

  const deleteSelectedStudents = async () => {
    try {
      if (!auth.userDetails || !auth.userDetails.token) {
        console.error("Authentication token not found.");
        // Redirect to login page or handle unauthorized access as per your application's logic
        navigate("/");
        return;
      }

      const res = await axios.delete(`/api/students/deleteSelected`, {
        data: { students: selectedStudents },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setSelectedStudents([]);
      setSelectAll(false);
      getStudents();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected students:", error);
      if (error.response) {
        if (error.response.status === 403) {
          console.error("Unauthorized access. Please check your permissions.");
          navigate("/forbidden");
        } else {
          toast.error(error.response.data.message);
        }
      } else {
        toast.error("An error occurred while deleting the selected students.");
      }
    }
  };

  const deleteOneStudent = async (id) => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(`/api/student/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      getStudents();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const handleClickDelete = (id) => {
    setStudentDeleteId(id);
    setShowDeleteStudentModal(true);
  };

  const handleClickProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  const handleConfirmDelete = async () => {
    try {
      if (studentDeleteId) {
        await deleteOneStudent(studentDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteStudentModal(false);
      getStudents();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteStudentModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyStudentModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyStudentModal(false);
  };

  // edit student functions

  const handleStudentEditClick = (student) => {
    setSelectedStudentEdit(student);
    setShowEditStudentModal(true);
  };

  const handleCloseModalEdit = () => {
    setShowEditStudentModal(false);
  };

  const schedulesData = [...schedules];

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditStudentModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditStudent
            handleCloseModalEdit={handleCloseModalEdit}
            selectedStudentEdit={selectedStudentEdit}
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            getStudents={getStudents}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteStudentModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "22%" }}>
          <DeleteStudentModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyStudentModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "22%" }}>
          <DeleteManyStudentModal
            deleteSelectedStudents={deleteSelectedStudents}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`flex flex-col bg-[#2d333b] rounded-[10px] text-[#c5d1de] border-[1px] border-[#2d333b] phone:overflow-x-scroll ${
          students && students?.length > 5 ? "overflow-y-scroll" : ""
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
          <div className="w-[120px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            ID
          </div>
          <div className="w-[180px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Name
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Type
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Status
          </div>
          <div className="w-[180px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Parent
          </div>
          <div className=" w-[130px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Schedules
          </div>
          <div className=" w-[130px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Fulfilled
          </div>
          <div className=" w-[130px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
            Behind by
          </div>

          {selectedStudents.length > 1 ? (
            allowedRoles?.find((ar) =>
              auth?.userDetails?.role?.includes(ar)
            ) ? (
              <>
                <div
                  className="flex gap-2 justify-start items-center py-1 px-3 bg-[#ff3131] border-[1px] border-[#22272e] border-[#ff3131] text-white text-[16px] rounded-[4px] cursor-pointer"
                  onClick={handleOpenModalDeleteMany}
                >
                  <span>Delete</span>
                </div>
              </>
            ) : (
              <div className="w-[180px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
                <span>Actions</span>
              </div>
            )
          ) : (
            <div className="w-[180px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-3 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {students.length > 0 ? (
          <>
            {students?.map((student, k) => {
              const schedulesCount = schedulesData.filter(
                (s) => s?.student?.studentNo === student?.studentNo
              ).length;

              return (
                <div
                  className={`phone:w-[fit-content]
                      flex items-center gap-4 px-6 last:rounded-bl-[8px] last:rounded-br-[8px] ${
                        k % 2 === 0 ? "bg-[#22272e] " : "bg-transparent"
                      }`}
                  key={k}
                >
                  <div className="w-[30px] h-[60px] flex justify-start items-center">
                    <input
                      type="checkbox"
                      checked={selectedStudents?.includes(student?._id)}
                      onChange={() => toggleStudentSelection(student?._id)}
                      className="w-[18px] h-[18px]"
                    />
                  </div>
                  <div className="w-[120px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                    {student?.studentNo}
                  </div>
                  <div className="w-[180px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                    {student?.firstName} {student?.surName}
                  </div>

                  <div className="w-[120px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                    {student?.studentType}
                  </div>

                  <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-3 rounded-[4px]">
                    {student?.statusOfStudent}
                  </div>

                  <div className="w-[180px] flex justify-between items-center py-1 px-3 rounded-[4px]">
                    {student?.parent?.firstName} {student?.parent?.surName}
                  </div>

                  <div
                    className={`${
                      k % 2 === 0
                        ? "bg-gradient-to-r from-[#0437F2] to-[#22272e] hover:to-[#0437F2] cursor-pointer"
                        : "bg-gradient-to-r from-[#0437F2] to-[#2d333b] hover:to-[#0437F2] cursor-pointer"
                    } w-[130px] flex justify-center items-center py-1 px-4 rounded-[24px] font-bold `}
                  >
                    {schedulesCount}
                    <span className="text-[14px] font-normal ml-1 mt-[-1px]">
                      schedule
                    </span>
                  </div>

                  <div
                    className={`${
                      k % 2 === 0
                        ? "bg-gradient-to-r from-[#008000] to-[#22272e] hover:to-[#008000] cursor-pointer"
                        : "bg-gradient-to-r from-[#008000] to-[#2d333b] hover:to-[#008000] cursor-pointer"
                    } w-[130px] flex justify-center items-center py-1 px-4 rounded-[24px] font-bold `}
                  >
                    {schedulesCount}
                    <span className="text-[14px] font-normal ml-1 mt-[-1px]">
                      schedule
                    </span>
                  </div>

                  <div
                    className={`${
                      k % 2 === 0
                        ? "bg-gradient-to-r from-[#ff3131] to-[#22272e] hover:to-[#ff3131] cursor-pointer"
                        : "bg-gradient-to-r from-[#ff3131] to-[#2d333b] hover:to-[#ff3131] cursor-pointer"
                    } w-[130px] flex justify-center items-center py-1 px-4 rounded-[24px] font-bold `}
                  >
                    {student?.behindByCounter}{" "}
                    <span className="text-[14px] font-normal ml-1 mt-[-1px]">
                      schedule
                    </span>
                  </div>

                  <div className="w-[140px] flex justify-start items-center px-1 rounded-[4px] gap-2">
                    {selectedStudents.length < 2 ? (
                      <div
                        onClick={() => handleClickProfile(student?._id)}
                        className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                      >
                        <FaArrowUpRightFromSquare className="text-[18px]" />
                      </div>
                    ) : (
                      <div className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px]">
                        <FaArrowUpRightFromSquare className="text-[18px]" />
                      </div>
                    )}

                    {selectedStudents.length < 2 ? (
                      allowedRoles?.find((ar) =>
                        auth?.userDetails?.role?.includes(ar)
                      ) ? (
                        <>
                          <div
                            onClick={() => handleStudentEditClick(student)}
                            className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                          >
                            <FaPenToSquare className="text-[18px]" />
                          </div>
                          <div
                            onClick={() => handleClickDelete(student?._id)}
                            className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                          >
                            <FaTrashCan className="text-[18px]" />
                          </div>
                        </>
                      ) : (
                        <>
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
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaPenToSquare className="text-[18px]" />
                        </div>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaTrashCan className="text-[18px]" />
                        </div>
                      </>
                    )}
                  </div>
                  <Ellipsis item={student} />
                </div>
              );
            })}
          </>
        ) : (
          <div className="bg-transparent w-[100%] flex flex-col justify-center items-center gap-2 text-[#c5d1de] rounded-bl-[12px] rounded-br-[12px]"></div>
        )}
      </div>
    </>
  );
};

export default StudentsTable;
