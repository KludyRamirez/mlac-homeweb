import React from "react";
import { Chart } from "react-google-charts";

export function StudentsPerYearPieChart({ students }) {
  const studentTypeLabels = ["Dyad", "Solo"];
  const studentTypeIndex = ["Dyad", "Solo"].map(
    (type) => students.filter((s) => s?.studentType === type).length
  );

  const data = [
    ["Task", "Students"],
    ...studentTypeLabels.map((label, index) => [
      label,
      studentTypeIndex[index],
    ]),
  ];

  const options = {
    is3D: true,
    backgroundColor: "transparent",
    legend: {
      textStyle: {
        color: "#c5d1de",
      },
    },
  };

  return (
    <div className="flex flex-col border-[1px] border-[#2d333b] rounded-[8px]">
      <div className="flex justify-start items-center w-[100%] h-[50px] bg-gradient-to-r from-[#2d333b] to-[#22272e] px-4 rounded-tl-[6px] rounded-tr-[6px] text-[#c5d1de]">
        Students
      </div>
      <Chart
        chartType="PieChart"
        data={data}
        options={options}
        width={"100%"}
        height={"280px"}
      />
    </div>
  );
}
