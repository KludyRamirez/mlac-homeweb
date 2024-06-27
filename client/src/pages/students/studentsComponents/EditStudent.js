import React, { useState } from "react";
import EditStudentFormModal from "./EditStudentFormModal";
import { useLocation } from "react-router-dom";

const initialState = {
  studentNo: "",
  firstName: "",
  surName: "",
  studentTypes: ["Solo", "Dyad"],
  studentType: "",
  sex: "",
  parent: "",
};

const errorsInitialState = {
  studentNo: "",
  firstName: "",
  surName: "",
};

const EditStudent = ({
  auth,
  setLoading,
  axios,
  toast,
  getOneStudent,
  getStudents,
  selectedStudentEdit,
  handleCloseModalEdit,
  handleCloseModalEditStudent,
  users,
}) => {
  const [values, setValues] = useState(initialState);
  const [updatedValues, setUpdatedValues] = useState(selectedStudentEdit);
  const [errors, setErrors] = useState(errorsInitialState);

  const location = useLocation();

  const handleEditStudent = async (e) => {
    e.preventDefault();

    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }

      const res = await axios.put(
        `/api/student/${selectedStudentEdit?._id}`,
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

      if (location.pathname === "/students") {
        handleCloseModalEdit();
      } else if (location.pathname.startsWith("/profile/")) {
        handleCloseModalEditStudent();
      }
      if (location.pathname === "/students") {
        await getStudents();
      } else if (location.pathname.startsWith("/profile/")) {
        await getOneStudent();
      }
    }
  };

  // dynamic value getting and DYNAMIC use of error messages -kludy

  const handleChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;
    let newErrors = { ...errors };

    let formattedValue = value;

    if (name === "firstName" || name === "surName") {
      formattedValue =
        value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }

    setUpdatedValues({ ...updatedValues, [name]: formattedValue });

    if (name === "firstName") {
      if (value.length < 3) {
        newErrors[name] = "First name must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "First name must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else if (name === "surName") {
      if (value.length < 3) {
        newErrors[name] = "Surname must be at least 3 characters long.";
      } else if (value.length > 48) {
        newErrors[name] = "Surname must be at most 48 characters long.";
      } else {
        newErrors[name] = "";
      }
    } else {
      if (name === "studentNo") {
        if (value.length < 7) {
          newErrors[name] = "Student No. must be at least 7 characters long.";
        } else if (value.length > 7) {
          newErrors[name] = "Student No. must be at most 7 characters long.";
        } else {
          newErrors[name] = "";
        }
      }
    }
    setErrors(newErrors);
  };

  const handleParentChange = (e) => {
    e.preventDefault();
    setUpdatedValues({ ...updatedValues, parent: e.target.value });
  };

  return (
    <>
      <EditStudentFormModal
        errors={errors}
        values={values}
        updatedValues={updatedValues}
        handleChange={handleChange}
        handleParentChange={handleParentChange}
        handleCloseModalEdit={handleCloseModalEdit}
        handleCloseModalEditStudent={handleCloseModalEditStudent}
        handleEditStudent={handleEditStudent}
        users={users}
      />
    </>
  );
};

export default EditStudent;
