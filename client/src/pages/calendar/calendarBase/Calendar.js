import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Sidebar from "../../../externalComponents/sidebarBase/Sidebar";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate, view }) => {
  const goToBack = () => {
    onNavigate("PREV");
  };

  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToCurrent = () => {
    onNavigate("TODAY");
  };

  // Only render the toolbar for the month view
  if (view !== "month") {
    return null;
  }

  return (
    <div className="w-[100%] flex justify-between items-center pb-4">
      <span className="text-[#c5d1de] text-[18px]">{label}</span>
      <div className="flex justify-center items-center">
        <button
          className="py-1 px-3 border-[1px] border-[#c5d1de] rounded-tl-[4px] rounded-bl-[4px] bg-[#22272e] text-[#c5d1de] hover:bg-[#c5d1de] hover:text-[#22272e]"
          onClick={goToBack}
        >
          Back
        </button>
        <button
          className="py-1 px-3 border-t-[1px] border-b-[1px] border-[#c5d1de] bg-[#22272e] text-[#c5d1de] hover:bg-[#c5d1de] hover:text-[#22272e]"
          onClick={goToCurrent}
        >
          Today
        </button>
        <button
          className="py-1 px-3 border-[1px] border-[#c5d1de] rounded-tr-[4px] rounded-br-[4px] bg-[#22272e] text-[#c5d1de] hover:bg-[#c5d1de] hover:text-[#22272e]"
          onClick={goToNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

const MyCalendar = ({ auth, axios, setLoading, toast, allowedRoles }) => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    getLogs();
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
      console.error("Error fetching logs!", err);
    }
  };

  // kapag gusto mo kunin yung mga objects sa loob ng array use map function, and then sa case na to yung mga objects i mamap sya sa calendar
  // pero may custom function kapa na gusto
  // so dapat ganto gawin mo -kludy

  // mapping instead of if-else in this situation for faster log time

  const timeMapping = {
    "8:00 AM - 9:00 AM": "08:00:00",
    "9:00 AM - 10:00 AM": "09:00:00",
    "10:00 AM - 11:00 AM": "10:00:00",
    "11:00 AM - 12:00 NN": "11:00:00",
    "12:00 NN - 1:00 PM": "12:00:00",
    "1:00 PM - 2:00 PM": "13:00:00",
    "2:00 PM - 3:00 PM": "14:00:00",
    "3:00 PM - 4:00 PM": "15:00:00",
    "4:00 PM - 5:00 PM": "16:00:00",
  };

  const events = logs.map((log) => {
    const startTime = timeMapping[log.timing] || "00:00:00";
    const dateOnly = log?.date?.slice(0, 10);
    const startDateWithTime = moment(`${dateOnly}T${startTime}`);
    const endDateWithTime = startDateWithTime.clone().add(1, "hour").toDate();

    console.log(startDateWithTime.toDate(), endDateWithTime);

    return {
      title: `${log.nameOfStudent} ${log.timing}`,
      start: startDateWithTime.toDate(),
      end: endDateWithTime,
      isActive: log.isActive,
    };
  });

  const eventPropGetter = (event) => {
    const style = {
      backgroundColor: event.isActive ? "green" : "blue",
      color: "white",
      borderRadius: "4px",
      border: "none",
      padding: "4px 8px",
      width: "92%",
      marginLeft: "8px",
      marginTop: "4px",
    };
    return { style };
  };

  return (
    <div className="flex justify-start h-screen w-screen bg-[#22272e]">
      <Sidebar />
      <div className="flex justify-start w-[100%]">
        <div className="w-[100%] mt-[28px] bg-[#22272e] rounded-tl-[24px] phone:rounded-tl-[0px] px-8 phone:px-4 pt-8">
          <Calendar
            localizer={localizer}
            events={events}
            eventPropGetter={eventPropGetter}
            components={{ toolbar: CustomToolbar }}
          />
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
