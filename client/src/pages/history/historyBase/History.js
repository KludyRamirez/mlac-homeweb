import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import HistoryFilter from "../historyComponents/HistoryFilter";

const History = ({ auth, axios, setLoading, toast, allowedRoles }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistory();
  }, []);

  const getHistory = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const url = `/api/notification`;
      const res = await axios.get(url, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setHistory(res.data);
    } catch (err) {
      console.error("Error fetching users!", err);
    }
  };

  return (
    <>
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-full h-screen flex justify-start bg-[#007bff]">
          <div className="w-full bg-[#fefefe] mt-[80px] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
            <HistoryFilter
              auth={auth}
              axios={axios}
              toast={toast}
              setLoading={setLoading}
              history={history}
              getHistory={getHistory}
              allowedRoles={allowedRoles}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default History;
