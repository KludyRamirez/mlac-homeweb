import React, { useState, useEffect } from "react";

const TimeBar = ({ scheduleDate }) => {
  // time limit
  const [timePercentage, setTimePercentage] = useState(100);
  const [daysRemaining, setDaysRemaining] = useState(0);

  useEffect(() => {
    if (scheduleDate) {
      const calculateTimeRemaining = () => {
        const today = new Date();
        const dateScheduleDate = new Date(scheduleDate);
        const difference = Math.ceil(
          (dateScheduleDate - today) / (1000 * 60 * 60 * 24)
        );

        const totalDays = 6;

        let remainingPercentage = ((totalDays - difference) / totalDays) * 100;

        if (remainingPercentage < 0) {
          remainingPercentage = 0;
        } else if (remainingPercentage > 100) {
          remainingPercentage = 100;
        }

        setDaysRemaining(difference >= 0 ? difference : 0);
        setTimePercentage(remainingPercentage);
      };

      const interval = setInterval(calculateTimeRemaining, 1000);

      calculateTimeRemaining();

      return () => clearInterval(interval);
    }
  }, [scheduleDate]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "2px",
        marginTop: "-2px",
      }}
    >
      <div style={{ fontSize: "12px", letterSpacing: "0.2px" }}>
        {daysRemaining === 0 ? (
          <span style={{ fontWeight: "600", letterSpacing: "0.6px" }}>
            Deleting..
          </span>
        ) : (
          <div>
            <span style={{ fontWeight: "600", letterSpacing: "0.6px" }}>
              {daysRemaining}d
            </span>{" "}
            left
          </div>
        )}
      </div>
      <div
        style={{
          width: "100px",
          background:
            "linear-gradient(to right, rgb(254, 240, 138), rgb(251, 207, 232), rgb(244, 114, 182))",
          height: "8px",
          transform: "scaleX(-1)",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: `${timePercentage}%`,
            backgroundColor: "#ededed",
            height: "8px",
            borderTopLeftRadius: "10px",
            borderBottomLeftRadius: "10px",
            transition: "width 1s linear",
            marginLeft: "-1px",
          }}
        />
      </div>
    </div>
  );
};

export default TimeBar;
