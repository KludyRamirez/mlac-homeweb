import React, { useEffect, useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

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
      title: log.nameOfStudent,
      start: startDateWithTime.toDate(),
      end: endDateWithTime,
    };
  });

  return (
    <div style={{ height: "500px" }}>
      <Calendar localizer={localizer} events={events} />
    </div>
  );
};

export default MyCalendar;
