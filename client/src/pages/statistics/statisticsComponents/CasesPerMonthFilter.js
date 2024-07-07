import React, { useState, useEffect } from "react";
import {
  BsCalendar4Event,
  BsCalendarDate,
  BsCalendarEvent,
  BsCalendarEventFill,
  BsCalendarWeek,
  BsChevronBarDown,
  BsFilter,
} from "react-icons/bs";
import CasesPerMonthBarChart from "../statisticsUtils/CasesPerMonthBarChart";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

const timings = [
  "8:00 AM - 9:00 AM",
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 NN",
  "12:00 NN - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
];

const CasesPerMonthFilter = ({ toast, students, logs, getLogs }) => {
  const [activeMainFilter, setActiveMainFilter] = useState("All");
  const [type, setType] = useState("All");
  const [day, setDay] = useState("All");
  const [date, setDate] = useState("All");
  const [timing, setTiming] = useState("All");
  const [years, setYears] = useState([]);

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    const yearsArray = [];
    for (let i = 0; i <= 4; i++) {
      yearsArray.push(currentYear - i);
    }
    setYears(yearsArray);
  }, []);

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterSchedules = (logs, type, day, timing, date) => {
    return logs.filter((s) => {
      const dayMatch = day === "All" || s?.day === day;

      const typeMatch = type === "All" || s?.studentType === type;

      const timingMatch = timing === "All" || s?.timing === timing;

      const yearMatch =
        date === "All" ||
        new Date(s.date).getFullYear() === new Date(date).getFullYear();

      return dayMatch && typeMatch && timingMatch && yearMatch;
    });
  };

  const filteredSchedules = filterSchedules(logs, type, day, timing, date);

  const combinedFilteredSchedules = [...filteredSchedules];

  return (
    <>
      <div className="w-100 bg-[#2d333b] text-[#c5d1de] rounded-[10px] flex flex-col border-[1px] border-[#2d333b]">
        <div className="px-3 w-100 h-[58px] flex justify-between gap-2 border-b-2 border-[#2d333b]">
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleMainFilterChange("All")}
              className={`px-3 h-[58px] hover:border-white flex justify-center items-center text-[18px] cursor-pointer ${
                activeMainFilter === "All"
                  ? "border-b-2 border-[#c5d1de]"
                  : "border-b-2 border-[#2d333b]"
              }`}
            >
              All Schedules
            </div>
          </div>
          <div className="flex justify-center items-center pr-2">
            <BsFilter className="text-[28px]" />
          </div>
        </div>

        <div className="bg-[#22272e] p-4 rounded-bl-[10px] rounded-br-[10px] text-[#c5d1de]">
          <div className="flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[201px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Day</div> <BsChevronBarDown />
                </div>
              </div>
              <select
                onChange={(e) => setDay(e.target.value)}
                className="px-3 h-[44px] w-[201px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
              >
                <option value="All">All</option>
                {days?.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[201px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Type</div> <BsChevronBarDown />
                </div>
              </div>
              <select
                onChange={(e) => setType(e.target.value)}
                className="px-3 h-[44px] w-[201px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Dyad">Dyad</option>
                <option value="Solo">Solo</option>
              </select>
            </div>

            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[201px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Timing</div> <BsChevronBarDown />
                </div>
              </div>
              <select
                onChange={(e) => setTiming(e.target.value)}
                className="px-3 h-[44px] w-[201px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
              >
                <option value="All">All</option>
                {timings?.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-1 w-[201px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Year</div> <BsChevronBarDown />
                </div>
              </div>
              <select
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                }}
                className="px-3 h-[44px] w-[201px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
              >
                <option value="All">All</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 w-[100%] h-[70px] flex justify-center items-center gap-4">
        <div className="flex justify-center items-center gap-6 w-[26%] h-[100%] rounded-[12px] bg-gradient-to-br from-[#00d2ff] to-[#3a7bd5] shadow-xl">
          <div className="flex justify-center items-center gap-4 p-2 bg-white/30 rounded-lg">
            <BsCalendarEvent className="text-white text-[24px]" />
          </div>
          <div className="flex flex-col text-[14px] text-[white] font-bold">
            <span>Scheds</span>
            <span>Completed</span>
          </div>
          <div className="text-[36px] text-[white] font-bold">0</div>
        </div>
        <div className="flex justify-center items-center gap-6 w-[26%] h-[100%] rounded-[12px] bg-gradient-to-br from-[#ffc837] to-[#ff8008] shadow-xl">
          <div className="flex justify-center items-center gap-4 p-2 bg-white/30 rounded-lg">
            <BsCalendarDate className="text-white text-[24px]" />
          </div>
          <div className="flex flex-col text-[14px] text-[white] font-bold">
            <span>Scheds</span>
            <span>Completed</span>
          </div>
          <div className="text-[36px] text-[white] font-bold">0</div>
        </div>
        <div className="flex justify-center items-center gap-6 w-[26%] h-[100%] rounded-[12px] bg-gradient-to-br from-[#93edc7] to-[#1cd8d2] shadow-xl">
          <div className="flex justify-center items-center gap-4 p-2 bg-white/30 rounded-lg">
            <BsCalendarWeek className="text-white text-[24px]" />
          </div>
          <div className="flex flex-col text-[14px] text-[white] font-bold">
            <span>Scheds</span>
            <span>Completed</span>
          </div>
          <div className="text-[36px] text-[white] font-bold">0</div>
        </div>
      </div>
      <div className="mt-4">
        <CasesPerMonthBarChart
          schedules={combinedFilteredSchedules}
          students={students}
        />
      </div>
    </>
  );
};

export default CasesPerMonthFilter;
