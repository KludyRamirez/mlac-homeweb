import React, { useState } from "react";
import {
  BsFilter,
  BsChevronBarDown,
  BsGear,
  BsClock,
  BsCalendar4Week,
  BsCalendar4Event,
} from "react-icons/bs";
import LogsTable from "./LogsTable";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import { FaPlus } from "react-icons/fa6";
import NotificationBell from "../../../externalComponents/NotificationBell/NotificationBell";

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

const LogsFilter = ({
  logs,
  getLogs,
  allowedRoles,
  auth,
  setLoading,
  toast,
  axios,
}) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [type, setType] = useState("All");
  const [day, setDay] = useState("All");
  const [date, setDate] = useState(null);
  const [timing, setTiming] = useState("All");
  const [selectedLogs, setSelectedLogs] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState("All");

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterLogs = (
    logs,
    searchTerm,
    type,
    day,
    date,
    timing,
    activeMainFilter
  ) => {
    return logs?.filter((s) => {
      const searchMatch =
        searchTerm === "All" ||
        s?.scheduleId?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
        s?.student?.nameOfStudent
          ?.toLowerCase()
          .includes(searchTerm?.toLowerCase());

      const dayMatch = day === "All" || s?.day === day;

      const typeMatch = type === "All" || s?.studentId?.studentType === type;

      const timingMatch = timing === "All" || s?.timing === timing;

      const dateMatch =
        date === null ||
        new Date(s.date).toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) ===
          new Date(date).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

      const mainFilterMatch = activeMainFilter === "All";

      return (
        searchMatch &&
        dayMatch &&
        typeMatch &&
        timingMatch &&
        mainFilterMatch &&
        dateMatch
      );
    });
  };

  const filteredLogs = filterLogs(
    logs,
    searchTerm,
    type,
    day,
    date,
    timing,
    activeMainFilter
  );

  let combinedFilteredLogs = [...filteredLogs];

  const isSunday = (date) => {
    return moment(date).day() === 0;
  };

  const isSaturday = (date) => {
    return moment(date).day() === 6;
  };

  const filterDate = (date) => {
    return !isSunday(date) && !isSaturday(date);
  };

  return (
    <>
      <div className="w-100 flex justify-start items-center gap-4 text-[14px] text-[#c5d1de] pb-6 ">
        <span>MLAC / Logs</span>
        <NotificationBell auth={auth} axios={axios} />
      </div>
      <div className="w-100 text-[26px] text-[#c5d1de] pb-6 flex justify-between items-center">
        <div className="font-bold">Logs List</div>

        {/* {allowedRoles?.find((ar) => auth?.userDetails?.role?.includes(ar)) ? (
          <div
            onClick={handleOpenModal}
            className="cursor-pointer py-3 px-4 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[8px] font-bold"
          >
            <FaPlus />
            <div>Add Permanent</div>
          </div>
        ) : (
          <div className="cursor-pointer py-3 px-3 bg-gray-100 text-[white] text-[16px] flex gap-2 items-center rounded-[8px] font-bold">
            <FaPlus />
            <div>Add Permanent</div>
          </div>
        )} */}
      </div>
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
            placeholder="Search by schedule ID, student name or parent"
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

          <div className="phone:w-[50%] flex flex-col items-start gap-2">
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Date</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Week className="text-[18px]" />
            </div>
            <DatePicker
              filterDate={filterDate}
              placeholderText="Enter Date"
              selected={date}
              onChange={(date) => {
                setDate(date);
              }}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="py-8">
        <LogsTable
          auth={auth}
          setLoading={setLoading}
          toast={toast}
          axios={axios}
          allowedRoles={allowedRoles}
          logs={combinedFilteredLogs}
          getLogs={getLogs}
          selectedLogs={selectedLogs}
          setSelectedLogs={setSelectedLogs}
        />
      </div>
    </>
  );
};

export default LogsFilter;
