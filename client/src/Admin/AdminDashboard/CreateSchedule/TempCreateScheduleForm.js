import React from "react";

import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/system";
import { StyledButton } from "../AllSchedule/AllSchedule";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const FormContainer = styled("div")({
  boxShadow:
    "rgba(0, 123, 255, 0.15) 0px 1px 0px, rgba(0, 123, 255, 0.15) 0px 8px 24px, rgba(0, 123, 255, 0.15) 0px 16px 48px",
  padding: "40px",
  backgroundColor: "#fdfdfd",
  color: "gray",
  borderRadius: "5px",
  border: "2px solid #007bff",
});

const TitleCon = styled("div")({
  display: "flex",
  gap: "20px",
  justifyContent: "space-between",
});

const FormTitle = styled("h1")({
  margin: "0px",
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  paddingBottom: "20px",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
});

const DateTimeCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
});

const DateTimeInput = styled("input")({
  borderRadius: "5px",
  width: "75%",
  borderColor: "#007bff",
  padding: "0px 10px",
  textTransform: "uppercase",
  color: "darkgray",
});

const TempCreateScheduleForm = ({
  handleSubmit,
  handleChange,
  handleNameOfStudentChange,
  values,
  handlePermanentChange,
}) => {
  // destructure
  const {
    nameOfStudents,
    nameOfStudent,
    schedTypes,
    schedType,
    permanentScheds,
    permanentSched,
    dateTime,
  } = values;

  const today = new Date().toISOString().split("T")[0];
  const minDate = today;

  return (
    <>
      <FormContainer>
        <TitleCon>
          <FormTitle>Temporary Schedule</FormTitle>
          <StyledButton>
            <HourglassTopIcon fontSize="small" />
          </StyledButton>
        </TitleCon>
        <FormControl variant="standard" sx={{ width: "50%" }}>
          <InputLabel id="demo-simple-select-standard-label">
            Student Name
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="nameOfStudent"
            value={nameOfStudent}
            onChange={handleNameOfStudentChange}
          >
            {nameOfStudents
              .filter((n) => n.isActive === false)
              .map((n) => (
                <MenuItem key={n._id} value={n.nameOfStudent}>
                  {n.nameOfStudent}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <DateTimeCon>
          <label id="date">Date:</label>
          <DateTimeInput
            id="dateTime"
            type="date"
            name="dateTime"
            min={minDate}
            value={dateTime}
            onChange={handleChange}
            style={{ fontSize: "13px", height: "40px" }}
          />
        </DateTimeCon>

        <br />
        <FormControl variant="standard" sx={{ width: "100%" }}>
          <InputLabel id="demo-simple-select-label">Schedule With:</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="permanentSched"
            value={permanentSched}
            onChange={handlePermanentChange}
          >
            {permanentScheds
              .filter((ps) => ps.isActive === true && ps.studentType === "Dyad")
              .map((ps) => (
                <MenuItem key={ps._id} value={ps._id}>
                  {ps.nameOfStudent}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
        <br />
        <br />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "40px",
          }}
        >
          <Link to="/schedule" style={{ textDecoration: "none" }}>
            <p
              style={{ fontSize: "12px", fontWeight: "600", color: "#007bff" }}
            >
              Create <br /> Permanent Schedule?
            </p>
          </Link>
          <Button
            variant="outlined"
            sx={{ fontWeight: "600" }}
            onClick={handleSubmit}
            disabled={
              !nameOfStudent || !schedType || !permanentSched || !dateTime
            }
          >
            Submit
          </Button>
        </div>
      </FormContainer>
    </>
  );
};

export default TempCreateScheduleForm;
