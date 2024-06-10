import React, { useState } from "react";
import RemarksScheduleFormModal from "./RemarksScheduleFormModal";

const RemarksSchedule = ({
  toast,
  auth,
  setLoading,
  axios,
  getSchedules,
  selectedScheduleRemarks,
  handleCloseModalRemarks,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedScheduleRemarks);

  const handleRemarksSchedule = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/caseRemarks/${selectedScheduleRemarks._id}`,
        updatedValues,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setUpdatedValues({});
      handleCloseModalRemarks();
      getSchedules();
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
      <RemarksScheduleFormModal
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handleRemarksSchedule={handleRemarksSchedule}
        handleCloseModalRemarks={handleCloseModalRemarks}
      />
    </>
  );
};

export default RemarksSchedule;
