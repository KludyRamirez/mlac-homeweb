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

  const handleReasonSchedule = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/scheduleReason/${selectedScheduleReason._id}`,
        updatedValues,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error("Failed to update schedule reason");
    } finally {
      await handlePostScheduleDate(
        updatedValues,
        auth,
        toast,
        axios,
        getSchedules,
        attendance
      );
      setUpdatedValues({});
      handleCloseModalReason();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

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
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handleReasonSchedule={handleReasonSchedule}
        handleCloseModalReason={handleCloseModalReason}
      />
    </>
  );
};

export default ReasonSchedule;
