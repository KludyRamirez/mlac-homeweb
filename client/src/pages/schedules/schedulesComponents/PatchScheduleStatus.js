import React, { useState } from "react";
import PatchScheduleStatusFormModal from "./PatchScheduleStatusFormModal";

const PatchScheduleStatus = ({
  toast,
  auth,
  setLoading,
  axios,
  getSchedules,
  selectedSchedulePatch,
  handleCloseModalPatch,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedSchedulePatch);

  const statusOfSchedules = [
    "Pending",
    "Investigation",
    "Evaluation",
    "Undertaking",
    "Dismissed",
    "Categorization",
    "Show Cause",
    "Referral",
    "Hearing",
    "Decision",
    "Appeal",
    "Implementation",
    "Schedule Solved",
  ];

  const handlePatchSchedule = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/caseStatus/${selectedSchedulePatch._id}`,
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
      handleCloseModalPatch();
      getSchedules();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { value } = e.target;

    let formattedValue = value;
    const currentDate = new Date();

    setUpdatedValues({
      ...updatedValues,
      statusOfSchedule: formattedValue,
      dismissalDate: currentDate,
    });
  };

  const handleAppealChange = (e) => {
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
      <PatchScheduleStatusFormModal
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handlePatchSchedule={handlePatchSchedule}
        handleCloseModalPatch={handleCloseModalPatch}
        statusOfSchedules={statusOfSchedules}
        handleAppealChange={handleAppealChange}
      />
    </>
  );
};

export default PatchScheduleStatus;
