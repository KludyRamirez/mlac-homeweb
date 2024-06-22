import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import TempSoloFilter from "../tempSoloComponents/TempSoloFilter";
import CreateTempSolo from "../tempSoloComponents/CreateTempSolo";

const TempSolo = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [schedules, setSchedules] = useState([]);
  const [tempSoloSchedules, setTempSoloSchedules] = useState([]);

  useEffect(() => {
    getTempSoloSchedules();
    getSchedules();
  }, []);

  const getTempSoloSchedules = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/temp-solo`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setTempSoloSchedules(res?.data?.tempSoloSchedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
    }
  };

  const getSchedules = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/schedule`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setSchedules(res?.data?.schedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start h-screen w-screen bg-[#22272e]">
        <Sidebar />
        <div className="flex justify-start w-[100%]">
          <div className="w-[100%] mt-[28px] bg-[#22272e] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <CreateTempSolo
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              getTempSoloSchedules={getTempSoloSchedules}
              allowedRoles={allowedRoles}
              schedules={schedules}
              tempSoloSchedules={tempSoloSchedules}
            />
            <TempSoloFilter
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              schedules={schedules}
              tempSoloSchedules={tempSoloSchedules}
              getTempSoloSchedules={getTempSoloSchedules}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TempSolo;
