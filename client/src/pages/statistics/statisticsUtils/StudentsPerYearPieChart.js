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
    <div className="flex flex-col rounded-[4px] bg-gradient-to-b from-[#2d333b] to-[#22272e]">
      <div className="flex border-[1px] border-[#2d333b] justify-start items-center h-[50px] bg-gradient-to-r from-[#22272e] to-[#22272e] px-4 rounded-tl-[4px] rounded-tr-[4px] text-[#c5d1de]">
        Type of Student Percentage
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
