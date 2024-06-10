import React from "react";
import { Chart } from "react-google-charts";

export function StudentsPerYearPieChart({ cases }) {
  const yearLabels = ["1st Year", "2nd Year", "3rd Year", "4th Year"];
  const casesPerYear = [1, 2, 3, 4].map(
    (year) => cases.filter((c) => c?.student?.year === year).length
  );

  const data = [
    ["Task", "Cases per year"],
    ...yearLabels.map((label, index) => [label, casesPerYear[index]]),
  ];

  const options = {
    is3D: true,
    backgroundColor: "transparent",
  };

  return (
    <div className="mt-[-4px]">
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
