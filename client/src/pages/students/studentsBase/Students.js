import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StudentsFilter from "../studentsComponents/StudentsFilter";
import CreateStudent from "../studentsComponents/CreateStudent";

const Students = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [students, setStudents] = useState([]);
  const [cases, setCases] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getStudents();
    getCases();
    getUsers();
  }, []);

  const getStudents = async () => {
    try {
      if (!auth?.userDetails?.token) {
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
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setCases(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
    }
  };

  const getUsers = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/user`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start h-screen w-screen bg-[#22272e]">
        <Sidebar />
        <div className="flex justify-start w-[100%]">
          <div className="w-full bg-[#22272e] mt-[28px] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <CreateStudent
              getStudents={getStudents}
              users={users}
              allowedRoles={allowedRoles}
              auth={auth}
              toast={toast}
              setLoading={setLoading}
              axios={axios}
            />
            <StudentsFilter
              auth={auth}
              toast={toast}
              setLoading={setLoading}
              axios={axios}
              students={students}
              cases={cases}
              getStudents={getStudents}
              users={users}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Students;
