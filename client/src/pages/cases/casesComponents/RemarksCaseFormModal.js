import React from "react";
import { BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const RemarksCaseFormModal = ({
  handleChange,
  handleRemarksCase,
  handleCloseModalRemarks,
  updatedValues,
}) => {
  return (
    <>
      <form onSubmit={(e) => handleRemarksCase(e)}>
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Edit Remarks
            <BsX
              onClick={handleCloseModalRemarks}
              className="text-[36px] cursor-pointer"
            />
          </div>
          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <textarea
                name="remarks"
                value={updatedValues.remarks}
                onChange={handleChange}
                className={`border-[1px] p-3 rounded-[6px] w-[100%] h-[160px] bg-[#f5f5f5] focus:outline-none `}
              />
            </div>
          </div>

          <div className="w-100 pt-8 flex justify-end items-center">
            {updatedValues?.remarks !== "" ? (
              <button
                type="submit"
                className="py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Save Remarks</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Save Remarks</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default RemarksCaseFormModal;
