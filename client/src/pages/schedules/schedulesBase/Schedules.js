import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import CreateSchedule from "../schedulesComponents/CreateSchedule";
import SchedulesFilter from "../schedulesComponents/SchedulesFilter";

const Schedules = ({
  auth,
  setLoading,
  toast,
  axios,
  allowedRoles,
  notif,
  getNotifications,
  indicator,
  setIndicator,
}) => {
  const [students, setStudents] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    getSchedules();
    getStudents();
  }, []);

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

      setSchedules(res.data.schedules);
    } catch (err) {
      console.error("Error fetching schedules!", err);
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
      console.error("Error fetching students!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start h-screen w-screen bg-[#22272e]">
        <Sidebar />
        <div className="flex justify-start w-[100%]">
          <div className="w-[100%] mt-[28px] bg-[#22272e] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <CreateSchedule
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              getSchedules={getSchedules}
              allowedRoles={allowedRoles}
              students={students}
              notif={notif}
              getNotifications={getNotifications}
              indicator={indicator}
              setIndicator={setIndicator}
            />
            <SchedulesFilter
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              schedules={schedules}
              students={students}
              getSchedules={getSchedules}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Schedules;
