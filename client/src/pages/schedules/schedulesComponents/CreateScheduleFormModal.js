import React, { useState } from "react";
import { BsChevronBarDown, BsFilter, BsX } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";

const CreateScheduleFormModal = ({
  handleChange,
  handleCreateSchedule,
  handleCloseModal,
  values,
  students,
  handleStudentChange,
}) => {
  const { student, days, day, timings, timing } = values;

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredStudents, setFilteredStudents] = useState(students);

  const handleSearchStudents = (e) => {
    const searchText = e.target.value.toLowerCase();
    setSearchTerm(searchText);
    const filtered = students?.filter(
      (student) =>
        student?.firstName?.toLowerCase().includes(searchText?.toLowerCase()) ||
        student?.surName?.toLowerCase().includes(searchText?.toLowerCase()) ||
        student?.studentNo?.toLowerCase().includes(searchText?.toLowerCase())
    );
    setFilteredStudents(filtered);
  };

  // const isSunday = (date) => {
  //   return date.getDay() === 0;
  // };

  // const isDisabled = (date) => {
  //   return !isSunday(date);
  // };

  // const isDisabledDateReported = (date) => {
  //   return (
  //     moment(date).isAfter(
  //       moment(selectedDateOfIncident).subtract(1, "day"),
  //       "day"
  //     ) && !isSunday(date)
  //   );
  // };

  return (
    <>
      <form onSubmit={(e) => handleCreateSchedule(e)}>
        <div className="p-10">
          <div className="text-[28px] text-[#077bff] font-semibold flex justify-between">
            Create New Schedule
            <BsX
              onClick={handleCloseModal}
              className="text-[36px] cursor-pointer"
            />
          </div>

          <div className="text-[#606060] pt-8 flex flex-col gap-2 ">
            <div className="flex justify-start items-center gap-2">
              <span>Search Student</span>
              <BsFilter className="text-[22px]" />
            </div>
            <input
              value={searchTerm}
              onChange={handleSearchStudents}
              type="text"
              autoComplete="off"
              placeholder="Search case owner's student no., firstname, etc."
              className={`border-[1px] border-[#007bff] p-3 rounded-[6px] w-[100%] bg-white focus:outline-none`}
            />
          </div>

          <div className="text-[#606060] pt-6 flex flex-col gap-2 w-[100%]">
            <div className="flex gap-2 items-center">
              <span>Schedule Owner</span>
              <BsChevronBarDown />
            </div>
            <select
              name="student"
              value={student}
              onChange={handleStudentChange}
              className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#007bff]"
            >
              <option value="">Select Student</option>
              {filteredStudents
                ?.filter((s) => s.statusOfStudent === "Enrolled")
                ?.sort((a, b) => {
                  const nameA = `${a.firstName} ${a.surName}`.toLowerCase();
                  const nameB = `${b.firstName} ${b.surName}`.toLowerCase();

                  // Compare the names
                  if (nameA < nameB) {
                    return -1;
                  }
                  if (nameA > nameB) {
                    return 1;
                  }
                  return 0;
                })
                ?.map((s) => (
                  <option
                    key={s?._id}
                    value={s?._id}
                    data-nameofstudent={`${s?.firstName} ${s?.surName}`}
                    data-parent={`${s?.parent?.firstName} ${s?.parent?.surName}`}
                  >
                    {s?.firstName} {s?.surName}
                  </option>
                ))}
            </select>
          </div>

          <div className="text-[#606060] pt-6 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Day</div>
              <select
                name="day"
                value={day}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="">Select day</option>
                {days?.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="">Timing</div>
              <select
                name="timing"
                value={timing}
                onChange={handleChange}
                className="appearance-none p-3 rounded-[6px] bg-[#f5f5f5] focus:outline-none border-[1px] focus:border-[#bbbbbb]"
              >
                <option value="">Select timing</option>
                {timings?.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="w-100 pt-10 flex justify-end items-center">
            {student !== "" && day !== "" && timing !== "" ? (
              <button
                type="submit"
                className="cursor-pointer py-3 px-3 bg-[#007bff] text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add Schedule</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="py-3 px-3 bg-blue-300 text-[white] text-[16px] flex gap-2 items-center rounded-[8px]"
              >
                <FaPlus />
                <div>Add Schedule</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateScheduleFormModal;
