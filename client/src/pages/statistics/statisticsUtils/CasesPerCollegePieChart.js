import React from "react";
import { Chart } from "react-google-charts";

export function CasesPerCollegePieChart({ cases }) {
  const casesData = [...cases];

  const collegeCounts = {};

  casesData.forEach((caseItem) => {
    const college = caseItem?.student?.college;
    if (collegeCounts[college]) {
      collegeCounts[college]++;
    } else {
      collegeCounts[college] = 1;
    }
  });

  const data = [["Cases", "Cases per college"]];

  for (const college in collegeCounts) {
    data.push([college, collegeCounts[college]]);
  }

  const options = {
    is3D: true,
    backgroundColor: "transparent",
  };

  return (
    <>
      <div className="flex flex-col border-[1px] border-[#2d333b] rounded-[8px] w-[50%] h-[242px] bg-gradient-to-br from-[#22272e] to-[#2d333b]">
        <div className="flex justify-start items-center w-[100%] h-[50px] bg-gradient-to-r from-[#22272e] to-[#2d333b] px-4 rounded-tl-[6px] rounded-tr-[6px] text-[#c5d1de]">
          Students
        </div>
        <Chart chartType="PieChart" data={data} options={options} />
      </div>
    </>
  );
}
