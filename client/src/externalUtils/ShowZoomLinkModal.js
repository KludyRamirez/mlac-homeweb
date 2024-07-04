import React from "react";
import zoom from "../images/zoom.svg";
import { BsCopy, BsLink45Deg } from "react-icons/bs";
import { FaCameraRetro } from "react-icons/fa";
import { FaCopy, FaRegCopy } from "react-icons/fa6";

export default function ShowZoomLinkModal({
  selectedScheduleZoomLink,
  handleCloseZoomLinkModal,
}) {
  return (
    <div className="relative flex flex-col items-start w-[420px]">
      <div className="flex flex-col gap-4 w-[100%] backdrop-filter backdrop-blur-sm rounded-[24px] p-8 border-[1px] border-[#1F2329]">
        <div className="flex flex-col gap-2 w-[100%] mt-2">
          <div className="flex justify-between items-center text-[16px] text-[#c5d1de] w-[100%]">
            <span>Password</span>
            <FaRegCopy className="text-[#c5d1de] text-[18px] cursor-pointer" />
          </div>
          <div className="text-[16px] p-3 w-[100%] bg-gradient-to-br from-[#2d333b] to-[#22272e] rounded-[8px] text-[#c5d1de]">
            {selectedScheduleZoomLink?.zoomLink?.password}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[100%]">
          <div className="flex justify-start items-center gap-2 text-[16px] text-[#c5d1de]">
            <span>Link</span>
            <BsLink45Deg className="text-[18px]" />
          </div>
          <div className="text-[16px] h-[120px] w-[100%] bg-gradient-to-br from-[#2d333b] to-[#22272e] rounded-[8px] p-3 text-[#c5d1de]">
            {selectedScheduleZoomLink?.zoomLink?.meeting_url}
          </div>
        </div>
        <div className="flex flex-col gap-2 w-[100%] mt-4">
          <div className="cursor-pointer text-[16px] w-[100%] rounded-[8px] py-2 px-3 text-[white] bg-gradient-to-br from-[#007bff] to-[#3F00FF] flex justify-between items-center">
            <span>Go to zoom meeting</span>
            <FaCameraRetro className="text-[20px] text-[#c5d1de]" />
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center absolute top-[-60px] left-[160px] w-[100px] h-[100px] rounded-[50%] bg-gradient-to-br from-[#007bff] to-[#3F00FF]">
        <FaCameraRetro className="text-[36px] text-[#c5d1de]" />
      </div>
    </div>
  );
}
