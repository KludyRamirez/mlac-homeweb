import React, { useState } from "react";
import EditScheduleFormModal from "./EditScheduleFormModal";

const initialState = {
  studentId: "",
  nameOfStudent: "",
  parent: "",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
  day: "",
  timings: [
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 NN",
    "12:00 NN - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
  ],
  timing: "",
  isWaitlisted: "No",
};

const EditSchedule = ({
  toast,
  auth,
  setLoading,
  axios,
  students,
  getSchedules,
  selectedScheduleEdit,
  handleCloseModalEdit,
}) => {
  const [values, setValues] = useState(initialState);
  const [updatedValues, setUpdatedValues] = useState(selectedScheduleEdit);

  const handleEditSchedule = async (e) => {
    e.preventDefault();
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/schedule/${selectedScheduleEdit._id}`,
        updatedValues,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${auth?.userDetails?.token}`,
          },
        }
      );
      toast.success(res?.data?.message);
    } catch (err) {
      toast.error(err?.response?.data);
    } finally {
      setValues(initialState);
      setUpdatedValues(initialState);
      handleCloseModalEdit();
      getSchedules();
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formattedValue = value;
    setUpdatedValues({ ...updatedValues, [name]: formattedValue });
  };

  const handleStudentChange = (e) => {
    e.preventDefault();

    const selectedStudent = e.target.value;
    const selectedNameOfStudent =
      e.target.options[e.target.selectedIndex].getAttribute(
        "data-nameofstudent"
      );
    const selectedParent =
      e.target.options[e.target.selectedIndex].getAttribute("data-parent");
    setUpdatedValues({
      ...updatedValues,
      student: selectedStudent,
      nameOfStudent: selectedNameOfStudent,
      parent: selectedParent,
    });
  };

  return (
    <>
      <EditScheduleFormModal
        students={students}
        values={values}
        updatedValues={updatedValues}
        setUpdatedValues={setUpdatedValues}
        handleChange={handleChange}
        handleStudentChange={handleStudentChange}
        handleEditSchedule={handleEditSchedule}
        handleCloseModalEdit={handleCloseModalEdit}
      />
    </>
  );
};

export default EditSchedule;
