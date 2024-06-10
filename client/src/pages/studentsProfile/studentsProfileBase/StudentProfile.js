import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsProfileTable from "../studentsProfileComponents/StudentsProfileTable";

const StudentProfile = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [student, setStudent] = useState("");
  const [students, setStudents] = useState([]);
  const [cases, setCases] = useState([]);
  const [cads, setCads] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    getOneStudent();
    getStudents();
    getCases();
    getCads();
  }, []);

  const getOneStudent = async () => {
    if (!auth?.userDetails?.token) {
      console.error("Authentication token not found.");
      return;
    }
    try {
      const res = await axios.get(`/api/student/${id}`, {
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setStudent(res.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const getStudents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/student`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
    }
  };

  const getCases = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/case`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setCases(res.data);
    } catch (err) {
      console.error("Error fetching cases!", err);
    }
  };

  const getCads = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/cad`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setCads(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
    }
  };

  return (
    <div className="flex justify-start">
      <Sidebar />
      <div className="w-full h-[100%] flex justify-start bg-[#007bff]">
        <div className="w-full h-[100%] bg-[#fefefe] mt-[80px] rounded-tl-[24px] phone:rounded-tl-[0px] mt-[80px] px-8 phone:px-4 pt-8">
          <StudentsProfileTable
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
            student={student}
            students={students}
            cases={cases}
            getCases={getCases}
            getOneStudent={getOneStudent}
            getStudents={getStudents}
            cads={cads}
            allowedRoles={allowedRoles}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
