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
import { HiSelector } from "react-icons/hi";
import Tilt from "react-parallax-tilt";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/system";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { BsCalendarWeek, BsHourglassSplit, BsPlus } from "react-icons/bs";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: "14px",
  background: "transparent",
  "@media (max-width: 767px)": {
    padding: "40px 20px",
    borderRadius: "20px",
    boxShadow: "none",
    borderBottomLeftRadius: "0px",
    borderBottomRightRadius: "0px",
  },
});

const FormContainer = styled("div")({
  width: "100%",
  borderRadius: "12px",

  "@media (max-width: 767px)": {
    borderRadius: "0px",
  },
});

const FilterButton = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "40px",
  height: "38px",
  background: "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)",
  boxShadow:
    "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
  borderRadius: "50%",
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
  background: "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  boxShadow:
    "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "2px",
  width: "86px",
  height: "42px",
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

const InputFieldName = styled("input")({
  width: "100%",
  background: "rgba(255, 255, 255, 0.6)",
  backdropFilter: "blur(20px)",
  WebkitBackdropFilter: "blur(20px)",
  border: "1px solid transparent",
  borderRadius: "10px",
  height: "42px",
  padding: "0px 0px 0px 12px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#122c8e",
  letterSpacing: "0.4px",
  outline: "none",
  position: "relative",

  "&:focus": {
    outline: "2px solid #122c8e",
    border: "1px solid transparent",
  },
  "&::placeholder": {
    color: "rgba(0, 123, 255, 0.4)",
    fontSize: "12px",
    fontWeight: "500",
  },
});

const CustomSelectDay = styled("select")`
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid transparent;
  border-radius: 10px;
  height: 44px;
  padding: 0px 0px 0px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #122c8e;
  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #122c8e;
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
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid transparent;
  border-radius: 10px;
  height: 44px;
  padding: 0px 0px 0px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #122c8e;

  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #122c8e;
    border: 1px solid transparent;
  }

  &::placeholder {
    color: transparent;
    font-size: 12px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const CustomSelectParent = styled("select")`
  width: 100%;
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid transparent;
  border-radius: 10px;
  height: 44px;
  padding: 0px 0px 0px 12px;
  font-size: 12px;
  font-weight: 500;
  color: #122c8e;
  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #122c8e;
    border: 1px solid white;
  }

  &::placeholder {
    color: rgba(0, 0, 0, 0.5);
    font-size: 12px;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const InputTitles = styled("div")({
  width: "100px",
  height: "20px",
  fontSize: "11px",
  margin: "0px",
  color: "#007bff",
  // backgroundColor: "blue",
  // backgroundImage:
  //   "radial-gradient(100% 100% at 0% 0, #122c8e 0, #007bff 100%)",
  // backgroundSize: "100%",
  // backgroundRepeat: "repeat",
  // WebkitBackgroundClip: "text",
  // WebkitTextFillColor: "transparent",
  // MozBackgroundClip: "text",
  // MozTextFillColor: "transparent",
  fontWeight: "700",
  letterSpacing: "0px",
  textTransform: "",
});

const FlexerRow = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "16px",
  paddingTop: "8px",
  paddingBottom: "32px",

  "@media (max-width: 767px)": {
    flexWrap: "wrap",
  },
});

const StatsCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "86px",
  height: "72px",
  borderRadius: "14px",
  padding: "10px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
});

const FormTitle = styled("div")({
  margin: "0px",
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  padding: "0px 0px 30px 0",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "24px",
  fontWeight: "700",
  letterSpacing: "-2.5px",
  paddingRight: "2.5px",

  "@media (max-width: 767px)": {},
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
      <FlexerRow>
        <Tilt>
          <StatsCard
            sx={{
              background:
                "radial-gradient(100% 100% at 0% 0, #0073ff 0, #122c8e 100%)",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
              }}
            >
              Total
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
                paddingTop: "3px",
              }}
            >
              19
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard sx={{ background: "#ff3131" }}>
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
              }}
            >
              Absent
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
                paddingTop: "3px",
              }}
            >
              7
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard
            sx={{ background: "radial-gradient(circle, #FFAA33, #0099CC)" }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
              }}
            >
              Online
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
                paddingTop: "3px",
              }}
            >
              12
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard
            sx={{
              background:
                "radial-gradient(100% 100% at 0% 0, #122c8e 0, #0070ff 100%)",
            }}
          >
            <div
              style={{
                fontSize: "16px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
              }}
            >
              Present
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
                paddingTop: "3px",
              }}
            >
              5
            </div>
          </StatsCard>
        </Tilt>
      </FlexerRow>
      <Flexer>
        <TitleCon>
          <FormTitle>Add Permanent Schedule +</FormTitle>
        </TitleCon>
        <FormContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              paddingBottom: "4px",
            }}
          >
            <InputTitles>Name*</InputTitles>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <BsPlus style={{ position: "absolute" }} />
              <InputFieldName
                name="nameOfStudent"
                value={nameOfStudent}
                onChange={handleChange}
                placeholder="Enter name"
              />
            </div>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "8px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "50%",
              }}
            >
              <InputTitles>Time*</InputTitles>
              <CustomSelectTime
                name="timing"
                value={timing}
                onChange={handleChange}
              >
                <option style={{ color: "rgba(0, 123, 255, 0.4)" }}>
                  Enter time
                </option>
                {timings.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </CustomSelectTime>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "50%",
              }}
            >
              <InputTitles>Day*</InputTitles>

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
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "8px",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "8px",
                width: "100%",
              }}
            >
              <InputTitles>Parent*</InputTitles>
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
          </div>
          <InputTitles sx={{ marginTop: "26px" }}>Type*</InputTitles>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "8px",
              width: "fit-content",
              borderRadius: "12px",
              padding: "5px 2px 5px 12px",
              background:
                "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
              // boxShadow:
              //   "rgba(0, 123, 255, 0.06) 0px 4px 6px -1px, rgba(0, 0, 0, 0.1) 0px 2px 4px -1px",
            }}
          >
            <div>
              <FormGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={studentType}
                onChange={handleStudentTypeChange}
                sx={{
                  padding: "0",
                  background: "transparent",
                  borderRadius: "12px",
                  width: "100%",
                }}
              >
                {studentTypes.map((st) => (
                  <FormControlLabel
                    key={st}
                    value={st}
                    checked={studentType === st}
                    control={
                      <Radio
                        sx={{
                          color: "white",
                          "& .MuiSvgIcon-root": {
                            fontSize: 20,
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
                          fontWeight: "600",
                          letterSpacing: "0.2px",
                          color: "white",
                        }}
                      >
                        {st}
                      </span>
                    }
                  />
                ))}
              </FormGroup>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "42px 0 0 0",
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
                    style={{ fontSize: "18px", color: "white" }}
                  />
                </FilterButton>
              </Link>
              <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
                <FilterButton>
                  <BsHourglassSplit
                    style={{ fontSize: "18px", color: "white" }}
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
              <BsPlus style={{ fontSize: "18px", color: "white" }} />
              <div
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "white",
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
