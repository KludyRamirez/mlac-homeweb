import React, { useState } from "react";
import PatchCaseStatusFormModal from "./PatchCaseStatusFormModal";

const PatchCaseStatus = ({
  toast,
  auth,
  setLoading,
  axios,
  getCases,
  selectedCasePatch,
  handleCloseModalPatch,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedCasePatch);

  const statusOfCases = [
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
    "Case Solved",
  ];

  const handlePatchCase = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/caseStatus/${selectedCasePatch._id}`,
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
      getCases();
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
      statusOfCase: formattedValue,
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
      <PatchCaseStatusFormModal
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handlePatchCase={handlePatchCase}
        handleCloseModalPatch={handleCloseModalPatch}
        statusOfCases={statusOfCases}
        handleAppealChange={handleAppealChange}
      />
    </>
  );
};

export default PatchCaseStatus;
