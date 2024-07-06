import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import StatisticsTable from "./StatisticsTable";

const Statistics = ({ auth, toast, axios, setLoading }) => {
  const [logs, setLogs] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    getLogs();

    getStudents();
  }, []);

  const getLogs = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/log`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });
      setLogs(res?.data?.logs);
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
            <StatisticsTable
              toast={toast}
              setLoading={setLoading}
              getLogs={getLogs}
              logs={logs}
              students={students}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Statistics;
