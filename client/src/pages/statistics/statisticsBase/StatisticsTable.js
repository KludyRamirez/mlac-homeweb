import React, { useState } from "react";
import CasesPerMonthFilter from "../statisticsComponents/CasesPerMonthFilter";
import YearlyStatistics from "../statisticsComponents/YearlyStatistics";
import StatisticsBoxes from "../statisticsComponents/StatisticsBoxes";

const StatisticsTable = ({ toast, students, logs, getLogs }) => {
  const [activeStats, setActiveStats] = useState("Dynamic");

  const handleSetActiveStats = (active) => {
    setActiveStats(active);
  };

  return (
    <>
      <div className="w-100 text-[14px] text-[#c5d1de] pb-6">
        MLAC / Statistics
      </div>
      <div className="w-100 pb-6 flex flex-col gap-2">
        <div className="text-[26px] text-[#c5d1de] font-bold flex justify-between items-center">
          <div>Statistics</div>
          <div className="flex justify-start items-center gap-2">
            <div
              onClick={() => handleSetActiveStats("Dynamic")}
              className={`text-[16px] ${
                activeStats === "Dynamic"
                  ? "text-white bg-gradient-to-br from-[#007bff] to-[#3F00FF]"
                  : "text-[#505050] bg-gray-100 border-gray-100"
              } font-normal py-1 px-4 rounded-[28px] cursor-pointer`}
            >
              Dynamic
            </div>
          </div>
        </div>

        {activeStats === "Dynamic" ? (
          <div className="flex phone:flex-wrap justify-start gap-8">
            <div className="w-[58%] h-[fit-content] pt-2">
              <CasesPerMonthFilter
                toast={toast}
                getLogs={getLogs}
                logs={logs}
                students={students}
              />
            </div>
            <div className="w-[42%] h-[fit-content] pt-2">
              <StatisticsBoxes
                logs={logs}
                getLogs={getLogs}
                students={students}
              />
            </div>
          </div>
        ) : (
          <div className="flex phone:flex-wrap justify-start gap-8">
            <div className="w-[100%] h-[fit-content] mt-2">
              <YearlyStatistics logs={logs} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsTable;
