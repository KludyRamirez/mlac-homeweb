import React from "react";
import { BsX } from "react-icons/bs";
import { FaTrashCan } from "react-icons/fa6";

const DeleteManyUserModal = ({
  deleteSelectedUsers,
  handleCloseModalDeleteMany,
}) => {
  const handleDeleteManyAndClose = () => {
    try {
      deleteSelectedUsers();
    } catch (error) {
      console.error("Error handling delete and close:", error);
    } finally {
      handleCloseModalDeleteMany();
    }
  };
  return (
    <>
      <div className="p-8 flex flex-col gap-2 text-[#c5d1de]">
        <div className="w-[100%] h-[74px] flex phone:justify-between justify-center items-center gap-6">
          <div className="w-[72px] h-[70px] bg-gradient-to-b from-[#ff3131] to-[#22272e] flex justify-center items-center rounded-[58px]">
            <BsX className="text-[54px] text-[#2d333b]" />
          </div>
          <div className="mt-[-6px] phone:w-[260px] w-[200px] flex justify-center items-center text-[16px] text-[#c5d1de] pt-2">
            <div>
              Do you really want to delete this users? This process cannot be
              undone.
            </div>
          </div>
        </div>

        <div className="text-white flex flex-col justify-center items-center gap-4 pt-6">
          <div
            onClick={handleDeleteManyAndClose}
            className="w-[100%] flex justify-between items-center gap-2 bg-gradient-to-r from-[#2d333b] to-[#ff3131] text-[#c5d1de] hover:text-[white] border-[1px] border-[#2d333b] hover:bg-gradient-to-r hover:from-[#ff3131] hover:to-[#ff3131] py-2 px-4 rounded-[4px] cursor-pointer"
          >
            <FaTrashCan className="text-[18px]" />
            <span className="text-[16px]">Delete</span>
          </div>
          <div
            onClick={handleCloseModalDeleteMany}
            className="w-[100%] flex justify-between items-center gap-2 bg-gradient-to-r from-[#ffffff] to-[#2d333b] text-[#22272e] hover:text-[#22272e] border-[1px] border-[#2d333b] hover:bg-gradient-to-r hover:from-[#ffffff] hover:to-[#ffffff] py-2 px-4 rounded-[4px] cursor-pointer"
          >
            <span className="text-[16px]">Cancel</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteManyUserModal;
