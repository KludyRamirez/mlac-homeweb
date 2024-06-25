import React from "react";
import { BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const ReasonScheduleFormModal = ({
  handleChange,
  handleCloseModalReason,
  updatedValues,
  toast,
  auth,
  axios,
  getSchedules,
  handlePostScheduleDate,
  attendance,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handlePostScheduleDate(
      updatedValues,
      auth,
      toast,
      axios,
      getSchedules,
      attendance
    );
    handleCloseModalReason();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="w-full mt-[-40px] px-8 py-6 font-semibold flex justify-between items-center rounded-tl-[12px] rounded-tr-[12px] bg-gradient-to-r from-[#2d333b] to-[#22272e]">
        <div className="text-[#ffffff] text-[24px] flex gap-4 items-center">
          <span>Add reason for absence</span>
        </div>
        <BsX
          onClick={handleCloseModalReason}
          className="text-[#c5d1de] text-[34px] cursor-pointer"
        />
      </div>
      <div className="p-10">
        <div className="flex gap-2 text-[#c5d1de]">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex justify-start items-center gap-2">
              <span>Type your reason</span>
            </div>
            <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
              <textarea
                name="absentReason"
                value={updatedValues?.absentReason}
                onChange={handleChange}
                className="h-full cursor-pointer border-[1px] border-[#22272e] w-full appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-10 flex items-center">
          <button
            type="submit"
            disabled={!updatedValues?.absentReason}
            className={`w-full font-bold cursor-pointer p-3 ${
              updatedValues?.absentReason
                ? "bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e]"
                : "bg-gray-400 text-gray-700"
            } text-[16px] flex gap-2 items-center rounded-[8px]`}
          >
            <FaPlus />
            <div>Add Reason</div>
          </button>
        </div>
      </div>
    </form>
  );
};

export default ReasonScheduleFormModal;
