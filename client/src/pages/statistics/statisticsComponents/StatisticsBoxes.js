import React, { useState } from "react";
import { StudentsPerYearPieChart } from "../statisticsUtils/StudentsPerYearPieChart";
import { BsFolderX } from "react-icons/bs";

export default function StatisticsBoxes({ logs, getLogs, students }) {
  const [dyadPercentage, setDyadPercentage] = useState("Percentage");
  const [soloPercentage, setSoloPercentage] = useState("Percentage");

  const dyadSchedules = logs.filter((s) => s.studentType === "Dyad");
  const soloSchedules = logs.filter((s) => s.studentType === "Solo");

  const soloSchedulesPercentageConverter = () => {
    const fraction = soloSchedules?.length / logs?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-1 text-[48px] text-[#FFBF00] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const soloSchedulesNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#FFBF00] font-bold">
          {soloSchedules?.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const dyadSchedulesPercentageConverter = () => {
    const fraction = dyadSchedules?.length / logs?.length;
    const percentage = fraction * 100;

    return (
      <>
        <div className="pl-1 text-[48px] text-[#ff3131] font-bold">
          {percentage.toFixed(0)}
          <span className="text-[20px]">%</span>
        </div>
      </>
    );
  };

  const dyadSchedulesNumberConverter = () => {
    return (
      <>
        <div className="text-[48px] text-[#ff3131] font-bold">
          {dyadSchedules?.length}
          <span className="text-[20px]"></span>
        </div>
      </>
    );
  };

  const handleDyadPercentage = () => {
    if (dyadPercentage === "Percentage") setDyadPercentage("Number");
    else {
      setDyadPercentage("Percentage");
    }
  };

  const handleSoloPercentage = () => {
    if (soloPercentage === "Percentage") setSoloPercentage("Number");
    else {
      setSoloPercentage("Percentage");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="phone:overflow-x-scroll">
        <div className="w-[fit-content] flex justify-start items-center gap-4 whitespace-nowrap">
          <div className="p-2 w-[206px] h-[180px] bg-gradient-to-bl from-[#007bff] to-[#2d333b] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden">
            <div className="pl-1 w-[100%] h-[100%] flex justify-center items-end">
              <div className="text-[48px] text-[#007bff] font-bold">
                {logs.length}
                <span className="text-[20px]"></span>
              </div>
            </div>
            <div className="text-[16px] text-[#007bff]">Total Schedules</div>
            <svg
              className="absolute top-0 left-0"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                style={{ stroke: "none", fill: "#007bff" }}
              ></path>
            </svg>
          </div>
          <div
            onClick={() => handleDyadPercentage()}
            className="p-2 w-[206px] h-[180px] bg-gradient-to-b from-[#FFBF00] to-[#2d333b] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
          >
            <div className="w-[100%] h-[100%] flex justify-center items-end">
              {dyadPercentage === "Percentage" ? (
                <>{soloSchedulesPercentageConverter()}</>
              ) : (
                <>{soloSchedulesNumberConverter()}</>
              )}
            </div>
            <div className="text-[16px] text-[#FFBF00]">Dyad Schedules</div>
            <svg
              className="absolute top-0 left-0"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                style={{ stroke: "none", fill: "#FFBF00" }}
              ></path>
            </svg>
          </div>
          <div
            onClick={() => handleSoloPercentage()}
            className="p-2 w-[206px] h-[180px] bg-gradient-to-br from-[#ff3131] to-[#2d333b] rounded-[4px] flex flex-col items-center gap-5 relative overflow-hidden"
          >
            <div className="w-[100%] h-[100%] flex justify-center items-end">
              {soloPercentage === "Percentage" ? (
                <>{dyadSchedulesPercentageConverter()}</>
              ) : (
                <>{dyadSchedulesNumberConverter()}</>
              )}
            </div>
            <div className="text-[16px] text-[#ff3131]">Solo Schedules</div>
            <svg
              className="absolute top-0 left-0"
              viewBox="0 0 500 500"
              preserveAspectRatio="xMinYMin meet"
            >
              <path
                d="M0,100 C150,200 350,0 500,100 L500,00 L0,0 Z"
                style={{ stroke: "none", fill: "#ff3131" }}
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="phone:overflow-x-scroll">
        <div className="w-[fit-content] flex justify-start items-center gap-4 whitespace-nowrap">
          <div className="p-2 w-[206px] h-[180px] bg-gradient-to-br from-[#007bff] to-[#2d333b] rounded-[4px] relative overflow-hidden">
            <div className="absolute bottom-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-[#22272e] flex justify-center items-center">
              <div className="w-[120px] h-[120px] rounded-[50%] bg-[#007bff]"></div>
            </div>
          </div>
          <div className="p-2 w-[206px] h-[180px] bg-gradient-to-br from-[#FFBF00] to-[#2d333b] rounded-[4px] relative overflow-hidden">
            <div className="absolute top-[-90px] left-[-90px] w-[200px] h-[200px] rounded-[50%] bg-[#22272e] flex justify-center items-center">
              <div className="w-[120px] h-[120px] rounded-[50%] bg-[#FFBF00]"></div>
            </div>
          </div>
          <div className="p-2 w-[206px] h-[180px] bg-gradient-to-br from-[#ff3131] to-[#2d333b] rounded-[4px] relative overflow-hidden">
            <div className="absolute bottom-[-90px] right-[-90px] w-[200px] h-[200px] rounded-[50%] bg-[#22272e] flex justify-center items-center">
              <div className="w-[120px] h-[120px] rounded-[50%] bg-[#ff3131]"></div>
            </div>
          </div>
        </div>
      </div>
      {logs.length > 0 ? (
        <>
          <StudentsPerYearPieChart
            schedules={logs}
            students={students}
            getLogs={getLogs}
          />
        </>
      ) : (
        <div className="w-[100%] h-[338px] flex flex-col justify-center items-center gap-2">
          <BsFolderX className="text-[80px] text-[#007bff]" />
          <div className="text-[#007bff]">No schedule available</div>
        </div>
      )}
    </div>
  );
}
