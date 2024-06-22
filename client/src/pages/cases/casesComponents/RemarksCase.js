import React, { useState } from "react";
import RemarksCaseFormModal from "./RemarksCaseFormModal";

const RemarksCase = ({
  toast,
  auth,
  setLoading,
  axios,
  getCases,
  selectedCaseRemarks,
  handleCloseModalRemarks,
}) => {
  const [updatedValues, setUpdatedValues] = useState(selectedCaseRemarks);

  const handleRemarksCase = async (e) => {
    e.preventDefault();
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/caseRemarks/${selectedCaseRemarks._id}`,
        updatedValues,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      await toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setUpdatedValues({});
      handleCloseModalRemarks();
      getCases();
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
      <RemarksCaseFormModal
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handleRemarksCase={handleRemarksCase}
        handleCloseModalRemarks={handleCloseModalRemarks}
      />
    </>
  );
};

export default RemarksCase;
