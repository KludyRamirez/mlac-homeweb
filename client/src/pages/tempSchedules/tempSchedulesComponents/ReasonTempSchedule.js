import React, { useState } from "react";
import ReasonTempScheduleFormModal from "./ReasonTempScheduleFormModal";

const ReasonTempSchedule = ({
  toast,
  auth,
  setLoading,
  axios,
  getTempSchedules,
  selectedTempScheduleReason,
  handleTempCloseModalReason,
  attendance,
}) => {
  const [updatedValues, setUpdatedValues] = useState(
    selectedTempScheduleReason
  );

  const handleSubmitTempLogs = async () => {
    try {
      const res = await axios.post(
        `/api/logs`,
        { attendance, ...updatedValues },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      toast.success(res?.data?.message);
      getTempSchedules();
    } catch (err) {
      toast.error("An error occurred while adding logs");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <ReasonTempScheduleFormModal
      auth={auth}
      toast={toast}
      setLoading={setLoading}
      axios={axios}
      getTempSchedules={getTempSchedules}
      updatedValues={updatedValues}
      setUpdatedValues={setUpdatedValues}
      handleChange={handleChange}
      handleTempCloseModalReason={handleTempCloseModalReason}
      handleSubmitTempLogs={handleSubmitTempLogs}
    />
  );
};

export default ReasonTempSchedule;
