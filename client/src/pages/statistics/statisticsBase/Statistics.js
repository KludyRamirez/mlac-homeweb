import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StatisticsTable from "./StatisticsTable";

const Statistics = ({ auth, toast, axios, setLoading }) => {
  const [cases, setCases] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getCases();
    getStudents();
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

  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <StatisticsTable
              toast={toast}
              setLoading={setLoading}
              getCases={getCases}
              cases={cases}
              students={students}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
