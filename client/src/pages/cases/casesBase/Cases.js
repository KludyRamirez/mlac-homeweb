import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import CreateCase from "../casesComponents/CreateCase";
import CasesFilter from "../casesComponents/CasesFilter";

const Cases = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [cases, setCases] = useState([]);
  const [students, setStudents] = useState([]);
  const [cads, setCads] = useState([]);

  useEffect(() => {
    getCases();
    getStudents();
    getCads();
  }, []);

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
      console.error("Error fetching users!", err);
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
    <>
      <div className="flex justify-start h-screen w-screen bg-[#22272e]">
        <Sidebar />
        <div className="flex justify-start w-[100%]">
          <div className="w-[100%] mt-[28px] bg-[#22272e] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <CreateCase
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              getCases={getCases}
              allowedRoles={allowedRoles}
              students={students}
              getStudents={getStudents}
            />
            <CasesFilter
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              cases={cases}
              students={students}
              getCases={getCases}
              cads={cads}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cases;
