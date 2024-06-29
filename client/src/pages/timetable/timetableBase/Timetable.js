import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";

const Timetable = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [schedules, setSchedules] = useState([]);
  const [tempSoloSchedules, setTempSoloSchedules] = useState([]);

  useEffect(() => {
    getTempSoloSchedules();
    getSchedules();
  }, []);

  const getTempSoloSchedules = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/temp-solo`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setTempSoloSchedules(res?.data?.tempSoloSchedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
    }
  };

  const getSchedules = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/schedule`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setSchedules(res?.data?.schedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start h-screen w-screen bg-[#22272e]">
        <Sidebar />
        <div className="flex justify-start w-[100%]">
          <div className="flex flex-col bg-[#2d333b] items-start gap-4 w-[100%] mt-[48px] rounded-tl-[8px] phone:rounded-tl-[0px] phone:px-4">
            <div className="flex justify-start gap-4 w-[100%] h-[74px]">
              <div className="w-[120px] h-[100%] rounded-[8px]"></div>
              <div className="flex w-[100%] h-[100%] border-l-[1px] border-b-[1px] border-r-[1px] border-[#22272e] rounded-bl-[8px] rounded-br-[8px]">
                <div className="w-[20%] h-[100%] border-r-[1px] border-[#22272e]"></div>
                <div className="w-[20%] h-[100%] border-r-[1px] border-[#22272e]"></div>
                <div className="w-[20%] h-[100%] border-r-[1px] border-[#22272e]"></div>
                <div className="w-[20%] h-[100%] border-r-[1px] border-[#22272e]"></div>
                <div className="w-[20%] h-[100%] border-r-[1px] border-[#22272e]"></div>
              </div>
            </div>
            <div className="flex justify-start gap-4 w-[100%] h-[100%]">
              <div className="flex flex-col w-[120px] h-[100%] border-t-[1px] border-b-[1px] border-r-[1px] border-[#22272e] rounded-tr-[8px]">
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">8:00 am</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">9:00 am</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">10:00 am</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">11:00 am</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">12:00 nn</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">1:00 pm</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">2:00 pm</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">3:00 pm</span>
                </div>
                <div className="w-[100%] h-[8%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">4:00 pm</span>
                </div>
              </div>
              <div className="w-[100%] h-[100%]"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
