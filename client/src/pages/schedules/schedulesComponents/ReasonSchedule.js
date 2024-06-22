import React, { useState } from "react";
import ReasonScheduleFormModal from "./ReasonScheduleFormModal";

const ReasonSchedule = ({
  toast,
  auth,
  setLoading,
  axios,
  getSchedules,
  selectedScheduleReason,
  handleCloseModalReason,
  handlePostScheduleDate,
  attendance,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedScheduleReason);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
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
  );
};

export default ReasonSchedule;
