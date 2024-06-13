import React, { useState } from "react";
import {
  BsCalendar4Week,
  BsChevronBarDown,
  BsCheckCircle,
  BsFilter,
  BsGenderMale,
} from "react-icons/bs";
import StudentsTable from "./StudentsTable";

const StudentsFilter = ({
  auth,
  toast,
  setLoading,
  axios,
  students,
  cases,
  getStudents,
  allowedRoles,
}) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [college, setCollege] = useState("All");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");
  const [section, setSection] = useState("All");
  const [sex, setSex] = useState("All");
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState("All");

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const schoolYearArray = [];
  for (let i = 1; i <= 4; i++) {
    schoolYearArray.push(i);
  }

  const sectionArray = [];
  for (let i = 1; i <= 12; i++) {
    sectionArray.push(i);
  }

  const filteredByStatus =
    selectedStatus === "All"
      ? students
      : students?.filter(
          (student) => student.statusOfStudent === selectedStatus
        );

  const filteredBySearch = students?.filter((student) => {
    const searchMatch =
      searchTerm === "All" ||
      student?.studentNo?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.middleName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.surName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.contactNo?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      student?.guardianContactNo
        ?.toLowerCase()
        .includes(searchTerm?.toLowerCase());

    const yearMatch = year === "All" || student?.year === parseInt(year);

    const collegeMatch =
      college === "All" ||
      student?.college?.toLowerCase().includes(college?.toLowerCase());

    const departmentMatch =
      department === "All" ||
      student?.department?.toLowerCase().includes(department?.toLowerCase());

    const sectionMatch =
      section === "All" || student?.section?.includes(section);

    const sexMatch = sex === "All" || student?.sex.includes(sex);

    return (
      searchMatch &&
      yearMatch &&
      collegeMatch &&
      departmentMatch &&
      sectionMatch &&
      sexMatch
    );
  });

  const combinedFilteredStudents =
    selectedStatus === "All"
      ? filteredBySearch
      : filteredBySearch?.filter((student) =>
          filteredByStatus?.includes(student)
        );

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
            All Students
          </div>
        </div>

        <div className="px-4 pt-4 flex justify-center gap-3">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            autoComplete="off"
            placeholder="Search by student number, student name, etc."
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
          <div className="phone:w-[49%] flex flex-col items-start gap-2">
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Status</div> <BsChevronBarDown />
              </div>
              <BsCheckCircle />
            </div>
            <select
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Enrolled">Enrolled</option>
              <option value="Dismissed">Dismissed</option>
            </select>
          </div>

          <div className="phone:w-[48.8%] flex flex-col items-start gap-2">
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Sex</div> <BsChevronBarDown />
              </div>
              <BsGenderMale />
            </div>
            <select
              onChange={(e) => setSex(e.target.value)}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
            >
              <option value="All">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="phone:w-[49%] flex flex-col items-start gap-2">
            <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
              <div className="flex gap-2 items-center">
                <div>Year</div> <BsChevronBarDown />
              </div>
              <BsCalendar4Week />
            </div>
            <select
              onChange={(e) => setYear(e.target.value)}
              className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#2d333b] border-[1px] border-[#2d333b] appearance-none focus:outline-none focus:bg-[#22272e] focus:border-[#2d333b] cursor-pointer"
            >
              <option value="All">All</option>
              {schoolYearArray.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="py-8">
        <StudentsTable
          auth={auth}
          toast={toast}
          setLoading={setLoading}
          axios={axios}
          students={combinedFilteredStudents}
          getStudents={getStudents}
          selectedStudents={selectedStudents}
          setSelectedStudents={setSelectedStudents}
          cases={cases}
          allowedRoles={allowedRoles}
        />
      </div>
    </>
  );
};

export default StudentsFilter;
