import React from "react";
import Radio from "@mui/material/Radio";
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
import AddchartIcon from "@mui/icons-material/Addchart";
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
  justifyContent: "space-between",
  gap: "20px",
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
}) => {
  // destructure
  const {
    nameOfStudent,
    days,
    day,
    parents,
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
          <FormTitle>Create Schedule</FormTitle>
          <StyledButton>
            <AddchartIcon />
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
        <FormControl variant="standard" sx={{ width: "100%" }}>
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
        <FormControl variant="standard" sx={{ width: "100%" }}>
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
        <FormControl variant="standard" sx={{ width: "80%" }}>
          <InputLabel id="demo-simple-select-label">Parents</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            name="parent"
            value={parent}
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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "40px",
          }}
        >
          <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
            <p
              style={{ fontSize: "12px", fontWeight: "600", color: "#007bff" }}
            >
              Create <br /> Temporary Schedule?
            </p>
          </Link>
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
        </div>
      </FormContainer>
    </>
  );
};

export default CreateScheduleForm;
