import React, { useState } from "react";
import {
  BsFilter,
  BsChevronBarDown,
  BsCalendar2,
  BsGear,
  BsClock,
  BsCalendarDate,
  BsCalendar4Event,
} from "react-icons/bs";
import SchedulesTable from "./SchedulesTable";

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

const SchedulesFilter = ({
  schedules,
  students,
  getSchedules,
  allowedRoles,
  auth,
  setLoading,
  toast,
  axios,
}) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [type, setType] = useState("All");
  const [day, setDay] = useState("All");
  const [timing, setTiming] = useState("All");
  const [selectedSchedules, setSelectedSchedules] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState("All");

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterSchedules = (
    schedules,
    searchTerm,
    type,
    day,
    timing,
    activeMainFilter
  ) => {
    return schedules?.filter((s) => {
      const searchMatch =
        searchTerm === "All" ||
        s?.scheduleId?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        s?.nameOfStudent?.toLowerCase().includes(searchTerm?.toLowerCase());

      const dayMatch = day === "All" || s?.day === day;

      const typeMatch = type === "All" || s?.student?.studentType === type;

      const timingMatch = timing === "All" || s?.timing === timing;

      const mainFilterMatch = activeMainFilter === "All";

      return (
        searchMatch && dayMatch && typeMatch && timingMatch && mainFilterMatch
      );
    });
  };

  const filteredSchedules = filterSchedules(
    schedules,
    searchTerm,
    type,
    day,
    timing,
    activeMainFilter
  );

  let combinedFilteredSchedules = [...filteredSchedules];

  // const isSunday = (date) => {
  //   return date.getDay() === 0; // 0 represents Sunday
  // };

  // const isDisabled = (date) => {
  //   return !isSunday(date);
  // };

  // const isDisabledDateReported = (date) => {
  //   return (
  //     moment(date).isAfter(moment(dateOfIncident).subtract(1, "day"), "day") &&
  //     !isSunday(date)
  //   );
  // };

  return (
    <>
      <div className="w-100 bg-[#2d333b] text-[#c5d1de] rounded-tl-[10px] rounded-tr-[10px] flex flex-col border-[1px] border-[#2d333b]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-2 border-b-2 border-[#2D333b]">
          <div
            onClick={() => handleMainFilterChange("All")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-[#c5d1de] flex justify-center items-center text-[18px] ${
              activeMainFilter === "All"
                ? "border-b-2 border-[#c5d1de]"
                : "border-b-2 border-[#2D333b]"
            }`}
          >
            All Schedules
          </div>
        </div>

        <div className="px-4 pt-4 flex justify-center gap-3">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            autoComplete="off"
            placeholder="Search by case number, student name, etc."
            className="p-3 rounded-[6px] w-[97%] phone:w-[100%] bg-[#22272e] border-[1px] border-[#22272e] focus:outline-none focus:border-[#c5d1de]"
          />
          <div className="flex justify-center items-center w-[50px] h-[48px] rounded-[8px] bg-[#2d333b] text-white phone:hidden">
            <BsFilter className="text-[24px]" />
          </div>
        </div>

        <div className="pt-5 pb-4 px-6 text-[18px] flex items-center gap-2">
          Filter by <BsFilter className="text-[24px]" />
        </div>
      </div>

      <div className="bg-[#22272e] p-4 rounded-bl-[10px] rounded-br-[10px] border-l-[1px] border-r-[1px] border-b-[1px]  border-[#2d333b] text-[#c5d1de]">
        <div className="flex flex-wrap justify-start items-center gap-4 phone:gap-2">
          <div className="phone:w-[50%] flex flex-col items-start gap-2">
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Day</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Event className="text-[18px]" />
            </div>
            <select
              onChange={(e) => setDay(e.target.value)}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
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
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Type</div> <BsChevronBarDown />
              </div>
              <BsGear className="text-[18px]" />
            </div>
            <select
              onChange={(e) => setType(e.target.value)}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Dyad">Dyad</option>
              <option value="Solo">Solo</option>
            </select>
          </div>

          <div className="phone:w-[50%] flex flex-col items-start gap-2">
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Timing</div> <BsChevronBarDown />
              </div>
              <BsClock className="text-[18px]" />
            </div>
            <select
              onChange={(e) => setTiming(e.target.value)}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
            >
              <option value="All">All</option>
              {timings?.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="py-8">
        <SchedulesTable
          auth={auth}
          setLoading={setLoading}
          toast={toast}
          axios={axios}
          allowedRoles={allowedRoles}
          schedules={combinedFilteredSchedules}
          students={students}
          getSchedules={getSchedules}
          selectedSchedules={selectedSchedules}
          setSelectedSchedules={setSelectedSchedules}
        />
      </div>
    </>
  );
};

export default SchedulesFilter;
