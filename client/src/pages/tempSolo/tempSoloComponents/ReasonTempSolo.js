import React, { useState } from "react";
import ReasonTempSoloFormModal from "./ReasonTempSoloFormModal";

const ReasonTempSolo = ({
  toast,
  auth,
  setLoading,
  axios,
  getTempSoloSchedules,
  selectedTempSoloScheduleReason,
  handleTempSoloCloseModalReason,
  attendance,
}) => {
  const [updatedValues, setUpdatedValues] = useState(
    selectedTempSoloScheduleReason
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
      getTempSoloSchedules();
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
    <ReasonTempSoloFormModal
      auth={auth}
      toast={toast}
      setLoading={setLoading}
      axios={axios}
      getTempSoloSchedules={getTempSoloSchedules}
      updatedValues={updatedValues}
      setUpdatedValues={setUpdatedValues}
      handleChange={handleChange}
      handleTempSoloCloseModalReason={handleTempSoloCloseModalReason}
      handleSubmitTempLogs={handleSubmitTempLogs}
    />
  );
};

export default ReasonTempSolo;
