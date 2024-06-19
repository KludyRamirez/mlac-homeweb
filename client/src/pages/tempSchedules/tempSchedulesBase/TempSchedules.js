import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import CreateTempSchedule from "../tempSchedulesComponents/CreateTempSchedule";
import TempSchedulesFilter from "../tempSchedulesComponents/TempSchedulesFilter";

const TempSchedules = ({ auth, setLoading, toast, axios, allowedRoles }) => {
  const [schedules, setSchedules] = useState([]);
  const [tempSchedules, setTempSchedules] = useState([]);

  useEffect(() => {
    getTempSchedules();
    getSchedules();
  }, []);

  const getTempSchedules = async () => {
    try {
      if (!auth?.userDetails?.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/temp-schedule`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      });

      setTempSchedules(res?.data?.tempSchedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
    }
  };

  const getSchedules = async () => {
    try {
      if (!auth.userDetails.token) {
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
            <CreateTempSchedule
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              getTempSchedules={getTempSchedules}
              allowedRoles={allowedRoles}
              schedules={schedules}
              tempSchedules={tempSchedules}
            />
            <TempSchedulesFilter
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              schedules={schedules}
              tempSchedules={tempSchedules}
              getTempSchedules={getTempSchedules}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default TempSchedules;
