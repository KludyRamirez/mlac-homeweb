import React, { useState, useEffect } from "react";

import { Button, FormControl, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/system";
import { StyledButton } from "../AllSchedule/AllSchedule";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { format, addDays } from "date-fns";
import moment from "moment";

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

const IndTempCreateScheduleForm = ({
  handleSubmit,
  handleNameOfStudentChange,
  values,
  handleChange,
  handleTempSoloDayChange,
}) => {
  // destructure
  const {
    tempStudentNames,
    tempStudentName,
    schedType,
    dateTime,
    tempSoloDay,
    timings,
    timing,
  } = values;

  const [showDiv, setShowDiv] = useState(true);

  const todaym = moment();
  const minDate = todaym.add(1, "days").format("YYYY-MM-DD");

  const maxDate = moment().add(6, "days");
  const maxDateISOString = maxDate.format("YYYY-MM-DD");

  const toggleDiv = () => {
    setShowDiv(!showDiv);
  };

  return (
    <>
      <FormContainer>
        <TitleCon>
          <FormTitle>Temporary Schedule</FormTitle>
          <StyledButton onClick={toggleDiv}>
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
            value={tempStudentName}
            onChange={handleNameOfStudentChange}
          >
            {tempStudentNames
              .filter((n) => n.isActive === false && n.studentType === "Dyad")
              .map((n) => (
                <MenuItem key={n._id} value={n._id}>
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
            max={maxDateISOString}
            value={dateTime}
            onChange={handleTempSoloDayChange}
            style={{ fontSize: "13px", height: "40px" }}
          />
        </DateTimeCon>

        <br />

        <FormControl variant="standard" sx={{ width: "90%" }}>
          <InputLabel id="demo-simple-select-label">Timings</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="timing"
            value={timing}
            onChange={handleChange}
          >
            {timings.map((t) => (
              <MenuItem key={t} value={t}>
                {t}
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
          <Link to="/temp-schedule-solo" style={{ textDecoration: "none" }}>
            <p
              style={{ fontSize: "12px", fontWeight: "600", color: "#007bff" }}
            >
              Create Temporary <br /> Schedule for Solo Students?
            </p>
          </Link>
          {showDiv ? (
            <Button
              variant="outlined"
              sx={{ fontWeight: "600" }}
              onClick={handleSubmit}
              disabled={!tempStudentName || !schedType || !timing || !dateTime}
            >
              Submit
            </Button>
          ) : (
            <Button
              variant="outlined"
              sx={{ fontWeight: "600" }}
              onClick={handleSubmit}
              disabled={!tempStudentName || !schedType || !timing || !dateTime}
            >
              Submit
            </Button>
          )}
        </div>
      </FormContainer>
    </>
  );
};

export default IndTempCreateScheduleForm;
