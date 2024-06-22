import React from "react";
import {
  BsCalendar4Event,
  BsCheckLg,
  BsChevronBarDown,
  BsX,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";

const CreateScheduleFormModal = ({
  handleChange,
  handleCreateSchedule,
  handleCloseModal,
  values,
  students,
  handleStudentChange,
}) => {
  const { studentId, days, day, timings, timing } = values;

  return (
    <>
      <form onSubmit={(e) => handleCreateSchedule(e)}>
        <div className="w-[100%] mt-[-40px] w-[100%] px-8 py-6 font-semibold flex justify-between items-center rounded-tl-[12px] rounded-tr-[12px] bg-gradient-to-r from-[#2d333b] to-[#22272e]">
          <div className="text-[#ffffff] text-[24px] flex gap-4 items-center">
            <span>Add Permanent</span>
            <BsCalendar4Event />
          </div>
          <BsX
            onClick={handleCloseModal}
            className="text-[#c5d1de] text-[34px] cursor-pointer"
          />
        </div>
        <div className="p-10">
          <div className="flex gap-2 text-[#c5d1de]">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="flex justify-start items-center gap-2">
                <span>Student</span>
                <BsChevronBarDown />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="studentId"
                  value={studentId}
                  onChange={handleStudentChange}
                  className="cursor-pointer cursor-pointer border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select student</option>
                  {students
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
                        data-studenttype={s?.studentType}
                      >
                        {s?.firstName} {s?.surName}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-[#c5d1de] pt-5">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="flex justify-start items-center gap-2">
                <span>Day</span>
                <BsChevronBarDown />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="day"
                  value={day}
                  onChange={handleChange}
                  className="cursor-pointer cursor-pointer border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select day</option>
                  {days?.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-[#c5d1de] pt-5">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="flex justify-start items-center gap-2">
                <span>Time</span>
                <BsChevronBarDown />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="timing"
                  value={timing}
                  onChange={handleChange}
                  className="cursor-pointer cursor-pointer border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select time</option>
                  {timings?.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="flex gap-2 text-[#c5d1de] pt-5">
            <div className="flex flex-col gap-4 w-[100%]">
              <div className="flex justify-center items-center gap-2">
                <span>Finished?</span>
                <BsCheckLg />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                {studentId !== "" && day !== "" && timing !== "" ? (
                  <button
                    type="submit"
                    className="w-[100%] font-bold cursor-pointer p-3 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[8px]"
                  >
                    <FaPlus />
                    <div>Add Permanent</div>
                  </button>
                ) : (
                  <button
                    disabled
                    type="submit"
                    className="w-[100%] font-bold cursor-pointer p-3 bg-gradient-to-br from-[#22272e] to-[#22272e] border-[1px] border-[#2d333b] text-[#c5d1de] text-[16px] flex gap-2 items-center rounded-[8px]"
                  >
                    <FaPlus />
                    <div>Add Permanent</div>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateScheduleFormModal;
