import React, { useState, useEffect } from "react";
import Sidebar from "../../../../externalComponents/sidebarBase/Sidebar";
import CreateUser from "../registerComponents/CreateUser";
import UsersFilter from "../registerComponents/UsersFilter";

const Register = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [users, setUsers] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getUsers();
    getStudents();
  }, []);

  const getUsers = async () => {
    try {
      if (!auth?.userDetails?.token) {
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
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setStudents(res.data);
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
            <CreateUser
              getUsers={getUsers}
              allowedRoles={allowedRoles}
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              students={students}
            />
            <UsersFilter
              students={students}
              users={users}
              getUsers={getUsers}
              getStudents={getStudents}
              allowedRoles={allowedRoles}
              auth={auth}
              setLoading={setLoading}
              axios={axios}
              toast={toast}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
