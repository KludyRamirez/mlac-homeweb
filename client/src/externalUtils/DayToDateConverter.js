import { default as axios } from "../api";

const handlePostScheduleDate = async (e, schedule, auth, toast) => {
  e.preventDefault();

  if (!auth.userDetails.token) {
    console.error("Authentication token not found.");
    return;
  }

  const today = new Date();
  const dayOfWeek = today.getDay();

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const targetDayIndex = daysOfWeek.indexOf(schedule.day);

  if (targetDayIndex === -1) {
    console.error("Invalid schedule day.");
    return;
  }

  const offset = (targetDayIndex + 7 - dayOfWeek) % 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + offset);

  try {
    const res = await axios.post(
      `/api/past-schedule`,
      { date: targetDate, schedule },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      }
    );
    toast.success(res?.data?.message);
  } catch (err) {
    toast.error(err?.response?.data);
  }
};

export default handlePostScheduleDate;
