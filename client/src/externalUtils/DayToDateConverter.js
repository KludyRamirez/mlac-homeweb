const handlePostScheduleDate = async (
  updatedValues,
  auth,
  toast,
  axios,
  getSchedules,
  attendance
) => {
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
  const targetDayIndex = daysOfWeek.indexOf(updatedValues.day);

  if (targetDayIndex === -1) {
    console.error("Invalid schedule day.");
    return;
  }

  const offset = (targetDayIndex + 7 - dayOfWeek) % 7;
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + offset);

  try {
    const res = await axios.post(
      `/api/logs`,
      { date: targetDate, attendance, ...updatedValues },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${auth?.userDetails?.token}`,
        },
      }
    );

    if (attendance === "Present") {
      toast.success(res?.data?.message);
    }

    getSchedules();
  } catch (err) {
    toast.error("An error occurred while adding logs");
  }
};

export default handlePostScheduleDate;
