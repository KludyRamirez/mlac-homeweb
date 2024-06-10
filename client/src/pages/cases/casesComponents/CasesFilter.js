import React, { useState } from "react";
import {
  BsCalendar4,
  BsCalendar4Week,
  BsCheckCircle,
  BsFilter,
  BsChevronBarDown,
  BsCalendar4Range,
  BsSticky,
  BsTicket,
  BsTicketPerforated,
} from "react-icons/bs";
import CasesTable from "./CasesTable";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";

const majorViolation = [
  "Smoking or vaping",
  "Possession of alcoholic beverages or coming to school under the influence of alcohol",
  "Tampering of posters or other school information media",
  "Refusal to submit to reasonable inspection conducted by authorized personnel",
  "Bringing outsiders or providing any means for entry in the University premises without consent of the concerned authority",
  "Ridiculing of fellow students / Rumor mongering",
  "Failure to appear before school authorities when required to report within 48 hours without valid reason",
  "Lewd Act / Boisterous remark / Use of profane or indecent language (e.g., catcalling, etc.)",
  "Public Display of Affection such as, but not limited to embracing, petting, kissing, suggestive, vulgar, or indecent poses",
  "Unauthorized use of PLV logo or seal, or other university markers or symbols including accredited students' organizations",
  "Unauthorized representation to any activity / event / opportunity in behalf of the University, student organization, student, council officer, school authorities, or officials",
  "Willful affiliation with any unrecognized organization within PLV",
  "Physical, verbal, or written assault on student, organization, or school authorities",
  "Lending or borrowing one's ID, COR, or Library Card for the use of another person / Other forms of misrepresentation",
  "Use of class / organizational funds for personal benefit",
  "Unauthorized solicitation or collection of money from students and other school authorities",
  "Vandalism / Defacing walls / Tearing pages from library materials or school documents / Unauthorized removal of official notices and posters",
  "Destruction of school properties / equipment",
  "Any form of coercion or threat against any student, faculty member, University guest, or any school authority",
  "Disrespect towards school personnel, faculty members, or school authorities",
  "Possession of pornographic material/s in any form",
  "Unauthorized possession and/or use of playing cards or devices inside the school premises / Indulging in any form of betting or gathering",
  "Any form of cheating during examinations or in any academic work",
  "Plagiarism or submission of another person's work and claiming it as his/her own",
  "Any form of bullying, harassment, threat, or intimidation against students, school personnel, faculty members, and school authorities",
  "Membership in gangs, fraternities, sororities, or recruitment of students to the same",
  "Any form hazing or infliction of physical or mental harm or ordeal to student as a requirement for entry to student organizations in the university",
  "Illegal possession, use, sale, or disposal of prohibited drugs",
  "Arson",
  "Grave sexual misconduct constituting a criminal offense (such as, but not limited to, acts of lasciviousness)",
  "Rebellious actions such as, but not limited to, pressuring others to boycott classes, or leading or participating in unauthorized activities",
  "Organizing (what type of group) groups and/or inviting membership to unrecognized/accredited organizations or groups by PLV",
  "Any form of falsification, tampering, or submission of fraudulent school records or credentials, such as, but not limited to, I.D., Receipt, and other documents / materials",
  "Carrying deadly weapons of any kind (firearms, knives, and the likes) or possession of explosives",
  "Inflicting physical injury / assault on students, school personnel, faculty members, or school authorities without provocation on the part of the latter",
  "Any form of stealing, swindling, or extortion rebellious",
  "Disclosing or misusing confidential or classified school information",
  "Posting of statements through any system of communication, channel, or publications, which damage the reputation of the university or its community",
  "Bring dishonor to the University",
];

const minorViolation = [
  "Incomplete uniform",
  "Sporting very sophisticated hair style, clothing, and accessories",
  "Unkempt / Long hair for boys",
  "Hair dyeing",
  "Sporting visible tattoos",
  "Excessive body piercing",
  "Littering",
  "Loitering",
  "Unauthorized use of classrooms and other school facilities and supplements",
  "Unauthorized entry to restricted and designated areas",
];

const CasesFilter = ({
  cases,
  students,
  getCases,
  allowedRoles,
  auth,
  setLoading,
  toast,
  axios,
}) => {
  const [searchTerm, setSearchTerm] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [dateOfIncident, setDateOfIncident] = useState(null);
  const [dateReported, setDateReported] = useState(null);
  const [reportedViolation, setReportedViolation] = useState("All");
  const [selectedCases, setSelectedCases] = useState([]);
  const [activeMainFilter, setActiveMainFilter] = useState("All");

  const handleMainFilterChange = (filter) => {
    setActiveMainFilter(filter);
  };

  const filterCases = (
    cases,
    searchTerm,
    dateOfIncident,
    dateReported,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  ) => {
    return cases.filter((c) => {
      const searchMatch =
        searchTerm === "All" ||
        c.caseNo.toString().includes(searchTerm) ||
        (c.student &&
          (c.student.studentNo
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
            c.student.firstName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            c.student.surName
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            c.student.department
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
            c.student.year.toString().includes(searchTerm) ||
            c.student.section.includes(searchTerm)));

      const dateOfIncidentMatch =
        dateOfIncident === null ||
        new Date(c.dateOfIncident).toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) ===
          new Date(dateOfIncident).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

      const dateReportedMatch =
        dateReported === null ||
        new Date(c.dateReported).toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        }) ===
          new Date(dateReported).toLocaleDateString("en-PH", {
            month: "long",
            day: "numeric",
            year: "numeric",
          });

      const reportedViolationMatch =
        reportedViolation === "All" ||
        c.reportedViolation
          .toLowerCase()
          .includes(reportedViolation.toLowerCase());

      const mainFilterMatch =
        activeMainFilter === "All" || c.typeOfViolation === activeMainFilter;

      const statusMatch =
        selectedStatus === "All" || c.statusOfCase === selectedStatus;

      return (
        searchMatch &&
        dateOfIncidentMatch &&
        dateReportedMatch &&
        reportedViolationMatch &&
        mainFilterMatch &&
        statusMatch
      );
    });
  };

  // Filter cases based on search criteria, main filter, and status filter
  const filteredCases = filterCases(
    cases,
    searchTerm,
    dateOfIncident,
    dateReported,
    reportedViolation,
    activeMainFilter,
    selectedStatus
  );

  let combinedFilteredCases = [...filteredCases];

  const isSunday = (date) => {
    return date.getDay() === 0; // 0 represents Sunday
  };

  const isDisabled = (date) => {
    return !isSunday(date);
  };

  const isDisabledDateReported = (date) => {
    return (
      moment(date).isAfter(moment(dateOfIncident).subtract(1, "day"), "day") &&
      !isSunday(date)
    );
  };

  const combinedCases = [...minorViolation, ...majorViolation];

  return (
    <>
      <div className="w-100 bg-[#2d333b] text-[#c5d1de] rounded-[10px] flex flex-col border-[2px] border-[#2d333b]">
        <div className="px-3 w-100 h-[58px] flex justify-start gap-2 border-b-2 border-[#2D333b]">
          <div
            onClick={() => handleMainFilterChange("All")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-[#c5d1de] flex justify-center items-center text-[18px] ${
              activeMainFilter === "All"
                ? "border-b-2 border-[#c5d1de]"
                : "border-b-2 border-[#2D333b]"
            }`}
          >
            All Cases
          </div>
          <div
            onClick={() => handleMainFilterChange("Major")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-[#c5d1de] flex justify-center items-center text-[18px] ${
              activeMainFilter === "Major"
                ? "border-b-2 border-[#c5d1de]"
                : "border-b-2 border-[#2D333b]"
            }`}
          >
            Major
          </div>
          <div
            onClick={() => handleMainFilterChange("Minor")}
            className={`px-3 h-[58px] hover:border-b-2 hover:border-[#c5d1de] flex justify-center items-center text-[18px] ${
              activeMainFilter === "Minor"
                ? "border-b-2 border-[#c5d1de]"
                : "border-b-2 border-[#2D333b]"
            }`}
          >
            Minor
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

        <div className="py-4 px-6 text-[18px] flex items-center gap-2">
          Filter by <BsFilter className="text-[24px]" />
        </div>

        <div className="w-100 flex justify-start bg-[#2d333b] p-4 rounded-bl-[10px] rounded-br-[10px]">
          <div className="w-100 flex flex-wrap justify-start items-center gap-4 phone:gap-2">
            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Violation</div> <BsChevronBarDown />
                </div>
                <BsTicketPerforated className="transform rotate-[90deg]" />
              </div>
              <select
                onChange={(e) => setReportedViolation(e.target.value)}
                className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#22272e] border-[1px] border-[#22272e] appearance-none focus:outline-none focus:border-[#c5d1de] focus:bg-[#22272e] cursor-pointer"
              >
                <option value="All">All</option>
                {activeMainFilter === "All" ? (
                  <>
                    {combinedCases
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        // Compare the names
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
                {activeMainFilter === "Minor" ? (
                  <>
                    {minorViolation
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        // Compare the names
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
                {activeMainFilter === "Major" ? (
                  <>
                    {majorViolation
                      ?.sort((a, b) => {
                        const nameA = a.toLowerCase();
                        const nameB = b.toLowerCase();

                        // Compare the names
                        if (nameA < nameB) {
                          return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }
                        return 0;
                      })
                      ?.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                  </>
                ) : null}
              </select>
            </div>

            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Status of Case</div> <BsChevronBarDown />
                </div>
                <BsCheckCircle />
              </div>
              <select
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#22272e] border-[1px] border-[#22272e] appearance-none focus:outline-none focus:border-[#c5d1de] focus:bg-[#22272e] cursor-pointer"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Investigation">Investigation</option>
                <option value="Evaluation">Evaluation</option>
                <option value="Undertaking">Undertaking</option>
                <option value="Dismissed">Dismissed</option>
                <option value="Categorization">Categorization</option>
                <option value="Show Cause">Show Cause</option>
                <option value="Referral">Referral</option>
                <option value="Hearing">Hearing</option>
                <option value="Decision">Decision</option>
                <option value="Appeal">Appeal</option>
                <option value="Implementation">Implementation</option>
                <option value="Case Solved">Case Solved</option>
              </select>
            </div>

            <div className="phone:w-[50%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Date of Incident</div> <BsChevronBarDown />
                </div>
                <BsCalendar4Week />
              </div>
              <DatePicker
                filterDate={isDisabled}
                placeholderText="Enter Date"
                selected={dateOfIncident}
                onChange={(date) => {
                  setDateOfIncident(date);
                }}
                className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#22272e] border-[1px] border-[#22272e] appearance-none focus:outline-none focus:border-[#c5d1de] focus:bg-[#22272e] cursor-pointer"
              />
            </div>

            <div className="phone:w-[47.8%] flex flex-col items-start gap-2">
              <div className="pl-2 w-[242px] phone:w-[100%] flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <div>Date Reported</div> <BsChevronBarDown />
                </div>
                <BsCalendar4Range />
              </div>
              <DatePicker
                filterDate={isDisabledDateReported}
                placeholderText="Enter Date"
                selected={dateReported}
                onChange={(date) => {
                  setDateReported(date);
                }}
                className="px-3 h-[44px] w-[242px] phone:w-[100%] rounded-[6px] bg-[#22272e] border-[1px] border-[#22272e] appearance-none focus:outline-none focus:border-[#c5d1de] focus:bg-[#22272e] cursor-pointer "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="py-8">
        <CasesTable
          auth={auth}
          setLoading={setLoading}
          toast={toast}
          axios={axios}
          allowedRoles={allowedRoles}
          cases={combinedFilteredCases}
          students={students}
          getCases={getCases}
          selectedCases={selectedCases}
          setSelectedCases={setSelectedCases}
        />
      </div>
    </>
  );
};

export default CasesFilter;
