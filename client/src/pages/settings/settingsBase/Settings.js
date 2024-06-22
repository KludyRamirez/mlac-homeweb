import React, { useState, useEffect } from "react";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";
import CreateCollegesAndDepartments from "../collegesComponents/CreateCollegesAndDepartments";
import CollegesAndDepartmentsFilter from "../collegesComponents/CollegesAndDepartmentsFilter";

const Settings = ({ auth, toast, setLoading, axios }) => {
  const [cads, setCads] = useState([]);

  useEffect(() => {
    getCads();
  }, []);

  const getCads = async () => {
    try {
      if (!auth?.userDetails?.token) {
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
      <div className="flex justify-start">
        <Sidebar />
        <div className="w-[100%] flex justify-start bg-[#007bff]">
          <div className="w-[100%] bg-[#fefefe] rounded-tl-[24px] phone:rounded-tl-[0px] mt-[80px] px-8 phone:px-4 pt-8">
            <CreateCollegesAndDepartments
              auth={auth}
              axios={axios}
              toast={toast}
              setLoading={setLoading}
              cads={cads}
              getCads={getCads}
            />
            <CollegesAndDepartmentsFilter
              cads={cads}
              getCads={getCads}
              auth={auth}
              axios={axios}
              toast={toast}
              setLoading={setLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
