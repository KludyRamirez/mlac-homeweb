import React from "react";
import { BsChevronBarDown, BsX } from "react-icons/bs";
import { FaPlus, FaUserTie } from "react-icons/fa6";
import { useLocation } from "react-router-dom";

const CreateStudentFormModal = ({
  handleCloseModalCreateStudent,
  handleChange,
  handleCreateStudent,
  handleCloseModal,
  values,
  errors,
  users,
  handleParentChange,
}) => {
  const {
    studentNo,
    firstName,
    surName,
    parent,
    studentTypes,
    studentType,
    sex,
  } = values;

  const {
    studentNo: studentNoError,
    firstName: firstNameError,
    surName: surNameError,
  } = errors;

  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === "/students") {
      handleCloseModal();
    } else if (location.pathname === "/users") {
      handleCloseModalCreateStudent();
    }
  };

  return (
    <>
      <form onSubmit={handleCreateStudent}>
        <div className="w-[100%] mt-[-40px] w-[100%] px-8 py-6 font-semibold flex justify-between items-center rounded-tl-[12px] rounded-tr-[12px] bg-gradient-to-r from-[#2d333b] to-[#22272e]">
          <div className="text-[#ffffff] text-[24px] flex gap-4 items-center">
            <span>Add Student</span>
            <FaUserTie />
          </div>
          <BsX
            onClick={handleClick}
            className="text-[#c5d1de] text-[34px] cursor-pointer"
          />
        </div>
        <div className="p-10">
          <div className="flex gap-2 text-[#c5d1de]">
            <div className="flex flex-col gap-2 w-[100%]">
              <div>Student No.</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="studentNo"
                  value={studentNo?.replace(/[^0-9-]/g, "")}
                  onChange={handleChange}
                  type="text"
                  maxLength="7"
                  autoComplete="off"
                  placeholder="e.g. 20-1130"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    studentNoError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {studentNoError && (
                <p className="text-[#ff3131]">{studentNoError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">First Name</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Ramirez"
                  className={`border-[1px] w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    firstNameError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {firstNameError && (
                <p className="text-[#ff3131] ">{firstNameError}</p>
              )}
            </div>

            <div className="flex flex-col gap-2 w-[100%]">
              <div className="">Surname</div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <input
                  required
                  name="surName"
                  value={surName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
                  placeholder="e.g. Ramirez"
                  className={`border-[1px]  w-[100%] px-4 py-3 bg-transparent rounded-[8px] ${
                    surNameError === ""
                      ? "border-[#22272e] focus:border-[#c5d1de]"
                      : "border-[#ff3131]"
                  } focus:outline-none`}
                />
              </div>
              {surNameError && (
                <p className="text-[#ff3131] ">{surNameError}</p>
              )}
            </div>
          </div>

          <div className="text-[#c5d1de] pt-5 flex gap-2">
            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span>Type</span>
                <BsChevronBarDown />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="studentType"
                  value={studentType}
                  onChange={handleChange}
                  className="border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Select Type</option>
                  {studentTypes?.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2 w-[50%]">
              <div className="flex gap-2 items-center">
                <span>Sex</span>
                <BsChevronBarDown />
              </div>
              <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                <select
                  name="sex"
                  value={sex}
                  onChange={handleChange}
                  className="border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                >
                  <option value="">Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </div>
          </div>

          {location.pathname === "/students" ? (
            <div className="flex gap-2 pt-5 text-[#c5d1de]">
              <div className="flex flex-col gap-2 w-[100%]">
                <div className="flex gap-2 items-center">
                  <span>Parent</span>
                  <BsChevronBarDown />
                </div>
                <div className="bg-gradient-to-r from-[#2d333b] to-[#22272e] rounded-[8px]">
                  <select
                    name="parent"
                    value={parent}
                    onChange={handleParentChange}
                    className="border-[1px] border-[#22272e] w-[100%] appearance-none px-4 py-3 rounded-[8px] bg-[transparent] focus:outline-none focus:border-[#c5d1de]"
                  >
                    <option value="">Select Parent</option>
                    {users
                      ?.sort((a, b) => {
                        const nameA =
                          `${a.firstName} ${a.surName}`.toLowerCase();
                        const nameB =
                          `${b.firstName} ${b.surName}`.toLowerCase();

                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((s) => (
                        <option key={s?._id} value={s?._id}>
                          {s?.firstName} {s?.surName}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
            </div>
          ) : null}

          <div className="w-[100%] pt-11 flex items-center">
            {studentNoError === "" &&
            firstNameError === "" &&
            surNameError === "" &&
            sex !== "" ? (
              <button
                type="submit"
                className="w-[100%] font-bold cursor-pointer py-3 px-4 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[4px]"
              >
                <FaPlus />
                <div>Add Student</div>
              </button>
            ) : (
              <button
                disabled
                type="submit"
                className="w-[100%] font-bold cursor-pointer py-3 px-4 bg-gradient-to-br from-[#ffffff] to-[#c5d1de] text-[#22272e] text-[16px] flex gap-2 items-center rounded-[4px]"
              >
                <FaPlus />
                <div>Add Student</div>
              </button>
            )}
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateStudentFormModal;
