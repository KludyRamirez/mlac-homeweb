import React, { useEffect, useState } from "react";
import Modal from "@mui/material/Modal";
import DeleteUserModal from "./DeleteUserModal";
import DeleteManyUserModal from "./DeleteManyUserModal";
import { useNavigate } from "react-router-dom";
import EditUser from "./EditUser";
import { ModalBox } from "./CreateUser";
import CreateStudent from "../../../students/studentsComponents/CreateStudent";
import { FaPenToSquare, FaUserTie, FaTrashCan } from "react-icons/fa6";

const UsersTable = ({
  users,
  getUsers,
  selectedUsers,
  setSelectedUsers,
  allowedRoles,
  auth,
  setLoading,
  toast,
  axios,
  getStudents,
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const [userDeleteId, setUserDeleteId] = useState("");
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [showDeleteManyUserModal, setShowDeleteManyUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showCreateStudentModal, setShowCreateStudentModal] = useState(false);
  const [selectedUserEdit, setSelectedUserEdit] = useState("");
  const [selectedUser, setSelectedUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (users?.length > 0 && selectedUsers?.length === users?.length) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, users]);

  const toggleUserSelection = (userId) => {
    let updatedSelectedUsers = [...selectedUsers];

    if (updatedSelectedUsers.includes(userId)) {
      updatedSelectedUsers = updatedSelectedUsers.filter((id) => id !== userId);
    } else {
      updatedSelectedUsers = [...updatedSelectedUsers, userId];
    }

    setSelectedUsers(updatedSelectedUsers);
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);

    if (!selectAll) {
      setSelectedUsers(users.map((user) => user._id));
      console.log(selectedUsers);
    } else {
      setSelectedUsers([]);
    }
  };

  const deleteSelectedUsers = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(`/api/users/deleteSelected`, {
        data: { users: selectedUsers },
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setSelectedUsers([]);
      setSelectAll(false);
      getUsers();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting selected users:", error);
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

  const deleteOneUser = async (id) => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.delete(`/api/user/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      getUsers();
      toast.success(res.data.message);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleClickDelete = (id) => {
    setUserDeleteId(id);
    setShowDeleteUserModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      if (userDeleteId) {
        await deleteOneUser(userDeleteId);
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    } finally {
      setShowDeleteUserModal(false);
      getUsers();
    }
  };

  const handleCloseModal = () => {
    setShowDeleteUserModal(false);
  };

  // delete many modal

  const handleOpenModalDeleteMany = () => {
    setShowDeleteManyUserModal(true);
  };

  const handleCloseModalDeleteMany = () => {
    setShowDeleteManyUserModal(false);
  };

  // edit user functions

  const handleUserEditClick = (user) => {
    setSelectedUserEdit(user);
    setShowEditUserModal(true);
  };

  const handleCloseModalEdit = () => {
    setShowEditUserModal(false);
  };

  // create student functions

  const handleCreateStudentClick = (user) => {
    setSelectedUser(user);
    setShowCreateStudentModal(true);
  };

  const handleCloseModalCreateStudent = () => {
    setShowCreateStudentModal(false);
  };

  return (
    <>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showCreateStudentModal}
        onClose={handleCloseModalCreateStudent}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <CreateStudent
            handleCloseModalCreateStudent={handleCloseModalCreateStudent}
            selectedUser={selectedUser}
            auth={auth}
            toast={toast}
            axios={axios}
            setLoading={setLoading}
            getStudents={getStudents}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showEditUserModal}
        onClose={handleCloseModalEdit}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox>
          <EditUser
            handleCloseModalEdit={handleCloseModalEdit}
            selectedUserEdit={selectedUserEdit}
            auth={auth}
            toast={toast}
            axios={axios}
            getUsers={getUsers}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteUserModal}
        onClose={handleCloseModal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "fit-content", background: "transparent" }}>
          <DeleteUserModal
            handleConfirmDelete={handleConfirmDelete}
            handleCloseModal={handleCloseModal}
          />
        </ModalBox>
      </Modal>
      <Modal
        sx={{ border: "none", outline: "none" }}
        open={showDeleteManyUserModal}
        onClose={handleCloseModalDeleteMany}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <ModalBox sx={{ width: "fit-content", background: "transparent" }}>
          <DeleteManyUserModal
            deleteSelectedUsers={deleteSelectedUsers}
            handleCloseModalDeleteMany={handleCloseModalDeleteMany}
          />
        </ModalBox>
      </Modal>
      <div
        className={`flex flex-col bg-[#2d333b] rounded-[10px] text-[#c5d1de] border-[1px] border-[#2d333b] phone:overflow-x-scroll ${
          users && users?.length > 5 ? "overflow-y-scroll" : ""
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
          <div className="w-[60px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            ID
          </div>
          <div className="w-[160px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            Username
          </div>
          <div className="w-[240px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            Name
          </div>
          <div className="w-[240px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            Email
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            Role
          </div>
          <div className=" w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            Contact No.
          </div>
          <div className=" w-[120px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
            Status
          </div>
          {selectedUsers.length > 1 ? (
            allowedRoles?.find((ar) =>
              auth?.userDetails?.role?.includes(ar)
            ) ? (
              <>
                <div
                  className="flex gap-2 justify-start items-center py-1 px-4 bg-[#ff3131] border-[1px] border-[#22272e] border-[#ff3131] text-white text-[16px] rounded-[4px] cursor-pointer"
                  onClick={handleOpenModalDeleteMany}
                >
                  <span>Delete</span>
                </div>
              </>
            ) : (
              <div className="w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
                <span>Actions</span>
              </div>
            )
          ) : (
            <div className="w-[140px] whitespace-nowrap flex justify-start items-center border-[1px] border-[#22272e] py-1 px-4 rounded-[24px]">
              <span>Actions</span>
            </div>
          )}
        </div>

        {users.length ? (
          <>
            {users?.map((user, k) => (
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
                    checked={selectedUsers?.includes(user?._id)}
                    onChange={() => toggleUserSelection(user?._id)}
                    className="w-[18px] h-[18px]"
                  />
                </div>
                <div className="w-[60px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px]">
                  {user?.uid}
                </div>
                <div className="w-[160px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px]">
                  {user?.userName}
                </div>
                <div className="w-[240px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px]">
                  {user?.firstName} {user?.surName}
                </div>
                <div className="w-[240px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px]">
                  {user?.email}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px]">
                  {user?.role}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px]">
                  {user?.contactNo}
                </div>
                <div className="w-[120px] whitespace-nowrap flex justify-between items-center py-1 px-4 rounded-[4px] text-[#0FFF50]">
                  {user?.statusOfUser}
                </div>
                <div className="w-[140px] whitespace-nowrap flex justify-start items-center py-1 px-1 rounded-[4px] gap-2">
                  {selectedUsers?.length < 2 ? (
                    allowedRoles?.find((ar) =>
                      auth?.userDetails?.role?.includes(ar)
                    ) ? (
                      <>
                        <div
                          onClick={() => handleCreateStudentClick(user)}
                          className="relative container w-[35px] h-[35px] flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaUserTie className="text-[18px]" />
                        </div>
                        <div
                          onClick={() => handleUserEditClick(user)}
                          className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaPenToSquare className="text-[18px]" />
                        </div>
                        <div
                          onClick={() => handleClickDelete(user?._id)}
                          className="p-2 flex justify-center items-center bg-[transparent] text-white rounded-[18px] cursor-pointer hover:bg-[#c5d1de] hover:text-[#2d333e]"
                        >
                          <FaTrashCan className="text-[18px]" />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="relative container w-[35px] h-[35px] flex justify-center items-center bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaUserTie className="text-[18px]" />
                        </div>
                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]"></div>

                        <div className="p-2 bg-[transparent] text-[#c5d1de] rounded-[18px]">
                          <FaTrashCan className="text-[18px]" />
                        </div>
                      </>
                    )
                  ) : (
                    <>
                      <div className="relative container w-[35px] h-[35px] flex justify-center items-center bg-[transparent] text-[#c5d1de] rounded-[18px]">
                        <FaUserTie className="text-[18px]" />
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
          <div className="bg-transparent w-[100%] flex flex-col justify-center items-center gap-2 text-[#c5d1de] rounded-bl-[12px] rounded-br-[12px]"></div>
        )}
      </div>
    </>
  );
};

export default UsersTable;
