import React, { useEffect, useRef, useMemo } from "react";
import Chart from "chart.js/auto";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Define the React component
const CasesPerMonthBarChart = ({ schedules }) => {
  const chartContainer = useRef(null);

  const schedulesByMonth = {};

  months.forEach((month, index) => {
    const monthSchedules = schedules?.filter((s) => {
      const dateParts = new Date(s?.date)
        .toLocaleDateString("en-PH", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })
        .split(" ");
      return dateParts[0] === month;
    });

    schedulesByMonth[month] = monthSchedules?.length;
  });

  const data = useMemo(() => {
    return {
      labels: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      datasets: [
        {
          label: "Schedules",
          data: months?.map((month) => schedulesByMonth[month]),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
          ],
        },
      ],
    };
  }, [schedulesByMonth]);

  const config = useMemo(() => {
    return {
      type: "bar",
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    };
  }, [data]);

  useEffect(() => {
    const ctx = chartContainer.current.getContext("2d");
    const chart = new Chart(ctx, config);

    return () => {
      chart.destroy();
    };
  }, [config]);

  return (
    <div className="px-4 py-3 border-[1px] border-[#2b333b] rounded-[8px]">
      <canvas ref={chartContainer} />
    </div>
  );
};

export default CasesPerMonthBarChart;
