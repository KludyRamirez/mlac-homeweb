import React from "react";
import Radio from "@mui/material/Radio";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import FormControlLabel from "@mui/material/FormControlLabel";
import {
  Button,
  FormControl,
  FormGroup,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
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

const CreateScheduleForm = ({
  handleSubmit,
  handleChange,
  handleParentChange,
  values,
  handleStudentTypeChange,
  selectedParent,
  parents,
}) => {
  // destructure
  const {
    nameOfStudent,
    days,
    day,
    parent,
    schedTypes,
    schedType,
    studentTypes,
    studentType,
    timings,
    timing,
  } = values;

  return (
    <>
      <FormContainer>
        <TitleCon>
          <FormTitle>Update Schedule</FormTitle>
          <StyledButton>
            <EditCalendarIcon />
          </StyledButton>
        </TitleCon>
        <FormControl
          sx={{
            border: "2px solid #007bff",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <TextField
            id="standard-basic"
            label="Student Name"
            variant="standard"
            name="nameOfStudent"
            value={nameOfStudent}
            onChange={handleChange}
          ></TextField>
        </FormControl>
        <br />
        <br />
        <FormControl variant="standard" sx={{ minWidth: "400px" }}>
          <InputLabel id="demo-simple-select-standard-label">
            Day of Schedule
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="day"
            value={day}
            onChange={handleChange}
          >
            {days.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl variant="standard" sx={{ minWidth: "400px" }}>
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
        <FormControl variant="standard" sx={{ minWidth: "300px" }}>
          <InputLabel id="demo-simple-select-label">Parent</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="parent"
            value={selectedParent ? selectedParent : parent}
            onChange={handleParentChange}
          >
            {parents.map((p) => (
              <MenuItem key={p._id} value={p._id}>
                {p.firstname} {p.lastname}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />
        <br />
        <FormControl
          sx={{
            border: "2px solid #007bff",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div style={{ fontSize: "13px", fontWeight: "500" }}>
            Student Type
          </div>
          <FormGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={studentType}
            onChange={handleStudentTypeChange}
          >
            {studentTypes.map((st) => (
              <FormControlLabel
                key={st}
                value={st}
                checked={studentType === st}
                control={<Radio />}
                label={st}
              />
            ))}
          </FormGroup>
        </FormControl>
        <br />
        <br />
        <Button
          variant="outlined"
          sx={{ fontWeight: "600" }}
          onClick={handleSubmit}
          disabled={
            !nameOfStudent || !studentType || !schedType || !day || !parent
          }
        >
          Submit
        </Button>
      </FormContainer>
    </>
  );
};

export default CreateScheduleForm;
