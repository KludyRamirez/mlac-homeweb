import React, { useState } from "react";
import { BsChevronBarDown, BsFilter, BsX } from "react-icons/bs";
import { FaPlus, FaUserSecret } from "react-icons/fa6";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const CreateTempScheduleModalForm = ({
  handleCompanionChange,
  handleCreateSchedule,
  handleCloseModal,
  values,
  schedules,
  handleStudentChange,
  handleDateChange,
}) => {
  const { student, companion } = values;

  // const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  //   const handleSearchStudents = (e) => {
  //     const searchTerm = e.target.value.toLowerCase();
  //     setSearchTerm(searchTerm);
  //     const filtered = students?.filter(
  //       (student) =>
  //         student?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //         student?.surName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
  //         student?.studentNo?.toLowerCase().includes(searchTerm?.toLowerCase())
  //     );
  //     setFilteredStudents(filtered);
  //   };

  const today = (date) => {
    return moment(date).isSame(moment(), "day");
  };

  const isSunday = (date) => {
    return moment(date).day() === 0;
  };

  const isSaturday = (date) => {
    return moment(date).day() === 6;
  };

  const isPastDate = (date) => {
    return moment(date).isBefore(moment(), "day");
  };

  const tomorrow = moment().add(1, "day").startOf("day");

  const afterSixDaysDisable = (date) => {
    return moment(date).isAfter(tomorrow.clone().add(5, "days"), "day");
  };

  const filterDate = (date) => {
    return (
      !isSunday(date) &&
      !isPastDate(date) &&
      !isSaturday(date) &&
      !afterSixDaysDisable(date) &&
      !today(date)
    );
  };

  const handleDateChangeCombined = (date) => {
    handleDateChange(date);
    setSelectedDate(date);
  };

  return (
    <>
      <form onSubmit={handleCreateSchedule}>
        <div className="w-[100%] mt-[-40px] w-[100%] px-8 py-6 font-semibold flex justify-between items-center rounded-tl-[12px] rounded-tr-[12px] bg-gradient-to-r from-[#2d333b] to-[#22272e]">
          <div className="text-[#ffffff] text-[24px] flex gap-4 items-center">
            <span>Add Temporary</span>
            <FaUserSecret />
          </div>
          <BsX
            onClick={handleCloseModal}
            className="text-[#c5d1de] text-[34px] cursor-pointer"
          />
        </div>
        <div className="p-10">
          <div className="flex gap-2 text-[#c5d1de]">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="text-[#c5d1de]">Absentees</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="student"
                  value={student}
                  onChange={handleStudentChange}
                  className="border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select Schedule</option>
                  {schedules
                    ?.filter((s) => s.isActive === "Absent")
                    ?.sort((a, b) => {
                      const nameA = `${a.nameOfStudent}`.toLowerCase();
                      const nameB = `${b.nameOfStudent}`.toLowerCase();

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
                        data-studentname={s?.nameOfStudent}
                        data-studenttype={s?.student?.studentType}
                      >
                        {s?.nameOfStudent}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-[#c5d1de] pt-5">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="text-[#c5d1de]">Dyad With</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="companion"
                  value={companion}
                  onChange={handleCompanionChange}
                  className="border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select Companion</option>
                  {schedules
                    ?.filter((s) => s.isActive === "Present")
                    ?.sort((a, b) => {
                      const nameA = `${a.nameOfStudent}`.toLowerCase();
                      const nameB = `${b.nameOfStudent}`.toLowerCase();

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
                        data-timing={s.timing}
                      >
                        {s?.nameOfStudent}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-[#c5d1de] pt-5">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Date</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <DatePicker
                  filterDate={filterDate}
                  placeholderText="Enter Date"
                  selected={selectedDate}
                  onChange={(date) => handleDateChangeCombined(date)}
                  className="focus:border-[1px] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                />
              </div>
            </div>
          </div>

          <div className="w-[100%] pt-11 flex items-center">
            {selectedDate !== "" && companion !== "" && student !== "" ? (
              <button
                type="submit"
                className="w-[100%] font-bold cursor-pointer p-3 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[6px]"
              >
                <FaPlus />
                <div>Add Temporary</div>
              </button>
            ) : (
              <button
                disabled
                className="w-[100%] font-bold cursor-pointer p-3 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[6px]"
              >
                <FaPlus />
                <div>Add Temporary</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateTempScheduleModalForm;
