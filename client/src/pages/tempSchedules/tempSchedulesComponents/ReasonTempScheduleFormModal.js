import React, { useState } from "react";
import ReasonScheduleFormModal from "./ReasonScheduleFormModal";

const ReasonTempSchedule = ({
  toast,
  auth,
  setLoading,
  axios,
  getSchedules,
  selectedScheduleReason,
  handleCloseModalReason,
  attendance,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedScheduleReason);

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    let formattedValue = value;

    setUpdatedValues({
      ...updatedValues,
      [name]: formattedValue,
    });
  };

  return (
    <>
      <ReasonScheduleFormModal
        auth={auth}
        toast={toast}
        setLoading={setLoading}
        axios={axios}
        getSchedules={getSchedules}
        attendance={attendance}
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handleCloseModalReason={handleCloseModalReason}
        handlePostScheduleDate={handlePostScheduleDate}
      />
    </>
  );
};

export default ReasonTempSchedule;
