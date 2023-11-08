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
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BsCalendarWeek, BsHourglassSplit, BsPlus } from "react-icons/bs";

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginTop: "20px",
});

const FormContainer = styled("div")({
  width: "400px",
  padding: "20px",
  // background:
  //   "radial-gradient(at bottom left, rgba(204, 251, 241, 0.15) 6%, rgba(255, 255, 255, 0.15) 47.6%, rgba(7, 187, 255, 0.20) 87.8%)",
  borderRadius: "10px",
  "@media (max-width: 1366px)": {
    boxShadow: "none",
    border: "none",
    padding: "30px 20px",
    borderRadius: "0px",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  paddingBottom: "14px",
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

const FilterButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "38px",
  height: "36px",
  background: "rgba(7, 187, 255, 0.1)",
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 1px",
  borderRadius: "10px",
  cursor: "pointer",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const FilterRealButton = styled("button")({
  padding: "0",
  border: "none",
  background: "rgba(7, 187, 255, 0.1)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
  width: "76px",
  height: "36px",
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 1px",
  borderRadius: "8px",
  cursor: "pointer",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(-1px)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const InputFieldName = styled("input")({
  width: "280px",
  background: "rgba(7, 187, 255, 0.04)",
  border: "1px solid rgba(0, 123, 255, 0.1)",
  borderRadius: "8px",
  padding: "12px",
  fontSize: "12px",
  fontWeight: "600",
  color: "black",
  letterSpacing: "0.4px",

  "&:focus": {
    outline: "2px solid #5468ff",
    border: "1px solid transparent",
  },
  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "12px",
    fontWeight: "500",
  },
  "@media (max-width: 767px)": {
    width: "100%",
  },
});

const CustomSelectDay = styled("select")`
  width: 240px;
  background: rgba(7, 187, 255, 0.04);
  border: 1px solid rgba(0, 123, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #5468ff;
  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #5468ff;
    border: 1px solid transparent;
  }

  &::placeholder {
    color: rgba(0, 123, 255, 0.4),
    font-size: 12px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const CustomSelectTime = styled("select")`
  width: 140px;
  background: rgba(7, 187, 255, 0.04);
  border: 1px solid rgba(0, 123, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #5468ff;

  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #5468ff;
    border: 1px solid transparent;
  }

  &::placeholder {
    color: rgba(0, 123, 255, 0.6);
    font-size: 12px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const CustomSelectParent = styled("select")`
  width: 360px;
  background: rgba(7, 187, 255, 0.04);
  border: 1px solid rgba(0, 123, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  font-size: 12px;
  font-weight: 500;

  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #5468ff;
    border: 1px solid transparent;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
    font-size: 12px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

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
      <Flexer>
        <TitleCon>
          <FormTitle>Create Schedule</FormTitle>
        </TitleCon>
        <FormContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              paddingBottom: "6px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#122c8e",
                letterSpacing: "0.2px",
              }}
            >
              Name*
            </div>
            <InputFieldName
              name="nameOfStudent"
              value={nameOfStudent}
              onChange={handleChange}
              placeholder="Enter name"
            />
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                paddingBottom: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#122c8e",
                  letterSpacing: "0.2px",
                }}
              >
                Day*
              </div>

              <CustomSelectDay name="day" value={day} onChange={handleChange}>
                {days.map((d) => (
                  <option
                    style={{ fontSize: "12px", fontWeight: "600" }}
                    key={d}
                    value={d}
                  >
                    {d}
                  </option>
                ))}
              </CustomSelectDay>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                paddingBottom: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "#122c8e",
                  letterSpacing: "0.2px",
                }}
              >
                Time*
              </div>
              <CustomSelectTime
                name="timing"
                value={timing}
                onChange={handleChange}
              >
                {timings.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </CustomSelectTime>
            </div>
          </div>
          <br />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              paddingBottom: "6px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#122c8e",
                letterSpacing: "0.2px",
              }}
            >
              Parent*
            </div>
            <CustomSelectParent
              name="parent"
              value={parent}
              onChange={handleParentChange}
            >
              {parents
                .filter((p) => p.role === "Administrator")
                .map((p) => (
                  <option key={p._id} value={`${p.fullname} ${p.username}`}>
                    {p.fullname}
                  </option>
                ))}
            </CustomSelectParent>
          </div>
          <br />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              paddingBottom: "6px",
            }}
          >
            <div
              style={{
                fontSize: "11px",
                fontWeight: "700",
                color: "#122c8e",
                letterSpacing: "0.2px",
              }}
            >
              Type*
            </div>

            <FormGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={studentType}
              onChange={handleStudentTypeChange}
              sx={{
                marginBottom: "-8px",
                padding: "2px 0px 2px 12px",
                background: "#5468ff",
                borderRadius: "8px",
              }}
            >
              {studentTypes.map((st) => (
                <FormControlLabel
                  sx={{
                    color: "white",
                  }}
                  key={st}
                  value={st}
                  checked={studentType === st}
                  control={
                    <Radio
                      sx={{
                        color: "#122c8e",
                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                        },
                        "&.Mui-checked": {
                          color: "white",
                        },
                      }}
                    />
                  }
                  label={
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {st}
                    </span>
                  }
                />
              ))}
            </FormGroup>
          </div>
          <br />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              height: "40px",
              padding: "16px 0 0 0",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
                <FilterButton>
                  <BsCalendarWeek
                    style={{ fontSize: "18px", color: "#122c8e" }}
                  />
                </FilterButton>
              </Link>
              <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
                <FilterButton>
                  <BsHourglassSplit
                    style={{ fontSize: "18px", color: "#122c8e" }}
                  />
                </FilterButton>
              </Link>
            </div>
            <FilterRealButton
              onClick={handleSubmit}
              disabled={
                !nameOfStudent || !studentType || !schedType || !day || !parent
              }
            >
              <BsPlus style={{ fontSize: "16px", color: "#122c8e" }} />
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "#122c8e",
                  paddingRight: "4px",
                }}
              >
                Submit
              </div>
            </FilterRealButton>
          </div>
        </FormContainer>
      </Flexer>
    </>
  );
};

export default CreateScheduleForm;
