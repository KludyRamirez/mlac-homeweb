import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import { FaPeopleGroup, FaPerson, FaVideo } from "react-icons/fa6";
import { BsCameraVideo } from "react-icons/bs";

const Timetable = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [schedules, setSchedules] = useState([]);
  const [tempSoloSchedules, setTempSoloSchedules] = useState([]);
  const [tempSchedules, setTempSchedules] = useState([]);
  const [nextFiveDays, setNextFiveDays] = useState([]);

  useEffect(() => {
    getTempSoloSchedules();
    getSchedules();
    getTempSchedules();
    handleNextFiveDays();
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

  const getTempSchedules = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/temp-schedule`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setTempSchedules(res?.data?.tempSchedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
    }
  };

  const handleNextFiveDays = () => {
    const today = new Date();
    const nextFiveDays = [];

    for (let i = 0; nextFiveDays.length < 6; i++) {
      const nextDate = new Date(today);
      nextDate.setDate(today.getDate() + i);

      if (nextDate.getDay() !== 0) {
        const formattedDate = nextDate.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        });

        const dayOfWeek = nextDate.toLocaleDateString("en-US", {
          weekday: "long",
        });

        nextFiveDays.push({
          date: formattedDate,
          day: dayOfWeek,
        });
      }
    }

    setNextFiveDays(nextFiveDays);
  };

  const combinedSchedules = [
    ...schedules,
    ...tempSchedules,
    ...tempSoloSchedules,
  ];

  return (
    <>
      <div className="flex justify-start h-screen w-screen bg-[#22272e]">
        <Sidebar />
        <div className="flex justify-start w-[100%]">
          <div className="flex flex-col bg-[#2d333b] items-start w-[100%] mt-[48px] rounded-tl-[8px] phone:rounded-tl-[0px] phone:px-4">
            <div className="flex justify-start w-[100%] h-[60px] border-b-[1px] border-[#22272e]">
              <div className="w-[120px] h-[100%] flex justify-center items-center text-[#c5d1de]">
                Weekly
              </div>
              <div className="flex w-[100%] h-[100%]">
                <div className="flex justify-between px-6 items-center w-[20%] h-[100%] border-l-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">Monday</span>

                  {nextFiveDays
                    .filter((date) => date.day === "Monday")
                    .map((date, index) => (
                      <div key={index} className="text-[#c5d1de] text-[16px]">
                        {date.date}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between px-6 items-center w-[20%] h-[100%] border-l-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">Tuesday</span>
                  {nextFiveDays
                    .filter((date) => date.day === "Tuesday")
                    .map((date, index) => (
                      <div key={index} className="text-[#c5d1de] text-[16px]">
                        {date.date}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between px-6 items-center w-[20%] h-[100%] border-l-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">Wednesday</span>
                  {nextFiveDays
                    .filter((date) => date.day === "Wednesday")
                    .map((date, index) => (
                      <div key={index} className="text-[#c5d1de] text-[16px]">
                        {date.date}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between px-6 items-center w-[20%] h-[100%] border-l-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">Thursday</span>
                  {nextFiveDays
                    .filter((date) => date.day === "Thursday")
                    .map((date, index) => (
                      <div key={index} className="text-[#c5d1de] text-[16px]">
                        {date.date}
                      </div>
                    ))}
                </div>
                <div className="flex justify-between px-6 items-center w-[20%] h-[100%] border-l-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">Friday</span>
                  {nextFiveDays
                    .filter((date) => date.day === "Friday")
                    .map((date, index) => (
                      <div key={index} className="text-[#c5d1de] text-[16px]">
                        {date.date}
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex justify-start w-[100%] h-[100%]">
              <div className="flex flex-col w-[120px] h-[100%]">
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">8:00 am</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">9:00 am</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">10:00 am</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">11:00 am</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">12:00 nn</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">1:00 pm</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">2:00 pm</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">3:00 pm</span>
                </div>
                <div className="w-[100%] h-[12%] flex justify-center items-center gap-1 border-b-[1px] border-[#22272e]">
                  <span className="text-[#c5d1de] text-[16px]">4:00 pm</span>
                </div>
              </div>
              <div className="flex flex-col w-[100%] h-[100%]">
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "8:00 AM - 9:00 AM" && s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "8:00 AM - 9:00 AM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "8:00 AM - 9:00 AM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "8:00 AM - 9:00 AM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "8:00 AM - 9:00 AM" && s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "9:00 AM - 10:00 AM" &&
                          s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "9:00 AM - 10:00 AM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "9:00 AM - 10:00 AM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "9:00 AM - 10:00 AM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "9:00 AM - 10:00 AM" &&
                          s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "10:00 AM - 11:00 AM" &&
                          s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "10:00 AM - 11:00 AM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "10:00 AM - 11:00 AM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "10:00 AM - 11:00 AM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "10:00 AM - 11:00 AM" &&
                          s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  {combinedSchedules
                    ?.filter(
                      (s) =>
                        s.timing === "11:00 AM - 12:00 NN" && s.day === "Monday"
                    )
                    ?.map((s) => (
                      <div
                        key={s._id}
                        className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                          s.isActive === "Absent" &&
                          "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                        } ${
                          s.isActive === "No information yet" &&
                          "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                        } ${
                          s.isActive === "Present" &&
                          "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                        } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                      >
                        <div>
                          {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                          {s?.nameOfStudent?.split(" ")[1]}
                          {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                          {s?.studentName?.split(" ")[1]}
                        </div>
                        {s?.isVideoOn === true ? (
                          <BsCameraVideo className="text-[18px] text-[#22272e]" />
                        ) : null}
                      </div>
                    ))}
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "11:00 AM - 12:00 NN" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "11:00 AM - 12:00 NN" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "11:00 AM - 12:00 NN" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "11:00 AM - 12:00 NN" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "11:00 AM - 12:00 NN" &&
                          s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "12:00 NN - 1:00 PM" &&
                          s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "12:00 NN - 1:00 PM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "12:00 NN - 1:00 PM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "12:00 NN - 1:00 PM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "12:00 NN - 1:00 PM" &&
                          s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "1:00 PM - 2:00 PM" && s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "1:00 PM - 2:00 PM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "1:00 PM - 2:00 PM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "1:00 PM - 2:00 PM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "1:00 PM - 2:00 PM" && s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "2:00 PM - 3:00 PM" && s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "2:00 PM - 3:00 PM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "2:00 PM - 3:00 PM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "2:00 PM - 3:00 PM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "2:00 PM - 3:00 PM" && s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "3:00 PM - 4:00 PM" && s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "3:00 PM - 4:00 PM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "3:00 PM - 4:00 PM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "3:00 PM - 4:00 PM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "3:00 PM - 4:00 PM" && s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="w-[100%] h-[12%] flex border-b-[1px] border-[#22272e]">
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "4:00 PM - 5:00 PM" && s.day === "Monday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "4:00 PM - 5:00 PM" &&
                          s.day === "Tuesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "4:00 PM - 5:00 PM" &&
                          s.day === "Wednesday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "4:00 PM - 5:00 PM" &&
                          s.day === "Thursday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                  <div className="w-[20%] h-[100%] bg-[#2d333b] p-2 flex flex-wrap justify-start items-start gap-2 border-l-[1px] border-[#22272e]">
                    {combinedSchedules
                      ?.filter(
                        (s) =>
                          s.timing === "4:00 PM - 5:00 PM" && s.day === "Friday"
                      )
                      ?.map((s) => (
                        <div
                          key={s._id}
                          className={`w-[100%] flex justify-between items-center h-[34px] px-3 gap-2 ${
                            s.isActive === "Absent" &&
                            "bg-gradient-to-r from-[#ff3131] to-[#880808] hover:to-[#ff3131] text-[#ffffff]"
                          } ${
                            s.isActive === "No information yet" &&
                            "bg-gradient-to-r from-[#ffffff] to-[#c5d1de] hover:to-[#ffffff] text-[#2d333b]"
                          } ${
                            s.isActive === "Present" &&
                            "bg-gradient-to-r from-[#4CBB17] to-[#808000] hover:to-[#4CBB17] text-[#ffffff]"
                          } text-[14px] rounded-[4px] cursor-pointer w-[48.6%]`}
                        >
                          <div className="text-[16px]">
                            {s?.nameOfStudent?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.nameOfStudent?.split(" ")[1]}
                            {s?.studentName?.split(" ")[0].slice(0, 1)}.{" "}
                            {s?.studentName?.split(" ")[1]}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
