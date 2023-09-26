import React from "react";

import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import { Button, FormControl, MenuItem, Select } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/system";
import { StyledButton } from "../AllSchedule/AllSchedule";

const FormContainer = styled("div")({
  boxShadow:
    "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
  padding: "40px",
  backgroundColor: "#fdfdfd",
  color: "gray",
  borderRadius: "5px",
  border: "2px solid #007bff",
});

const TitleCon = styled("div")({
  display: "flex",
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

  const currentDate = new Date();
  const minDate = currentDate.toISOString().slice(0, 16);

  return (
    <>
      <FormContainer>
        <TitleCon>
          <FormTitle>Temporary Schedule</FormTitle>
          <StyledButton>
            <EditCalendarIcon />
          </StyledButton>
        </TitleCon>
        <FormControl variant="standard" sx={{ minWidth: "200px" }}>
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
        {/* <Form.Group>
          <Form.Label className="fw-bold pb-1 pt-2">Date Time</Form.Label>
          <Form.Control
            type="datetime-local"
            name="dateTime"
            min={minDate}
            value={dateTime}
            onChange={handleChange}
            style={{ fontSize: "13px", height: "40px" }}
          />
        </Form.Group> */}
        <br />
        <br />
        <FormControl variant="standard" sx={{ minWidth: "400px" }}>
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
      </FormContainer>
    </>
  );
};

export default TempCreateScheduleForm;
