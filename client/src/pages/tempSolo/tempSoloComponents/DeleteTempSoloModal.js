import React from "react";
import { BsX } from "react-icons/bs";

const DeleteTempSoloModal = ({ handleConfirmDelete, handleCloseModal }) => {
  const handleDeleteAndClose = () => {
    try {
      handleConfirmDelete();
    } catch (error) {
      console.error("Error handling delete and close:", error);
    } finally {
      handleCloseModal();
    }
  };
  return (
    <>
      <div className="flex justify-center border-t-[1px] border-l-[1px] border-r-[1px] border-[#22272e] p-4 rounded-tl-[10px] rounded-tr-[10px] backdrop-filter backdrop-blur-sm">
        <div className="w-[71px] h-[70px] bg-gradient-to-t from-[#880808] to-[#ff3131] flex justify-center items-center rounded-[58px]">
          <BsX className="text-[56px] text-[#c5d1de]" />
        </div>
      </div>
      <div className="p-8 flex flex-col gap-2 text-[#c5d1de] bg-[#22272e] rounded-bl-[10px] rounded-br-[10px]">
        <div className="flex flex-col phone:justify-between justify-center items-center gap-6">
          <div className="mt-[-6px] phone:w-[260px] w-[260px] flex justify-center items-center text-[16px] text-[#c5d1de] rounded-[6px]">
            <div>
              Do you really want to delete this temporary solo schedule?
            </div>
          </div>
        </div>
        <div className="text-white flex justify-center items-center gap-4 pt-4">
          <div
            onClick={handleDeleteAndClose}
            className="w-[100%] flex justify-start items-center gap-2 bg-gradient-to-tl from-[#880808] to-[#ff3131] text-[white] hover:text-[white] py-2 px-4 rounded-[6px] cursor-pointer"
          >
            <span className="text-[16px]">Delete</span>
          </div>
          <div
            onClick={handleCloseModal}
            className="w-[100%] flex justify-start items-center gap-2 bg-gradient-to-tl from-[#ffffff] to-[#c5d1de] text-[#22272e] h-[37.5px] px-4 rounded-[6px] cursor-pointer"
          >
            <span className="text-[16px]">Cancel</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteTempSoloModal;
