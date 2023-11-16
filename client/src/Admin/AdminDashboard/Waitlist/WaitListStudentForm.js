import React, { useState } from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";

import Tilt from "react-parallax-tilt";
import {
  BsArrowRightShort,
  BsCalendar2Plus,
  BsCalendarPlus,
  BsCalendarWeek,
  BsHourglassSplit,
  BsPlus,
  BsPlusLg,
} from "react-icons/bs";
import { FormGroup, Radio, FormControlLabel } from "@mui/material";

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
  background: "rgba(7, 187, 255, 0.3)",
  boxShadow: "rgba(0, 0, 0, 0.06) 0px 1px 1px",
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

const NextRoundButton = styled("button")({
  padding: "0",
  border: "none",
  backgroundColor: "#07bbff",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #007bff 100%)",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.1) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "84px",
  height: "38px",
  borderRadius: "12px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
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

const NextDisabledButton = styled("button")({
  padding: "0",
  background: "white",
  border: "none",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 123, 255, 0.1) 0px 1px 2px 0px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "84px",
  height: "38px",
  borderRadius: "12px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
});

const InputFields = styled("input")({
  width: "100%",
  background: "rgba(7, 187, 255, 0.2)",
  border: "1px solid white",
  borderRadius: "10px",
  height: "42px",
  padding: "0px 0px 0px 12px",
  fontSize: "11px",
  fontWeight: "600",
  color: "#343434",
  letterSpacing: "0.2px",
  outline: "none",
  position: "relative",

  "&:focus": {
    outline: "2px solid #228B22",
    border: "1px solid rgba(7, 187, 255, 0.2)",
  },
  "&::placeholder": {
    color: "#343434",
    fontSize: "11px",
    fontWeight: "600",
    fontFamily: "Poppins, sans-serif",
  },
});

const CustomSelect = styled("select")`
  width: 100%;
  background: rgba(7, 187, 255, 0.2);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid white;
  border-radius: 10px;
  height: 44px;
  padding: 0px 0px 0px 12px;
  font-size: 11px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  color: #343434;
  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #228b22;
    border: 1px solid rgba(7, 187, 255, 0.2);
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const InputTitles = styled("div")({
  width: "100px",
  height: "20px",
  fontSize: "12px",
  margin: "0px",
  color: "#122c8e",
  fontWeight: "700",
  letterSpacing: "0px",
  textTransform: "",
});

const FlexerRow = styled("div")({
  display: "flex",
  justifyContent: "center",
  gap: "16px",

  "@media (max-width: 767px)": {
    flexWrap: "wrap",
  },
});

const StatsCard = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  width: "136px",
  height: "112px",
  overflow: "hidden",
  borderRadius: "10px",
  padding: "0px 12px",
  gap: "4px",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 5px 10px -2px, rgba(0, 0, 0, 0.05) 0px 2px 4px -1px",
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
  gap: "4px",
  paddingTop: "10px",
});

const RoleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const RoleTitle = styled("div")({
  margin: "0px",
  backgroundColor: "blue",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  padding: "32px 0 37px 0",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "48px",
  fontWeight: "700",
  letterSpacing: "-2.5px",
  marginLeft: "-3.5px",

  "@media (max-width: 767px)": {},
});

const WaitListStudentForm = ({
  handleSubmit,
  handleChange,
  handleStudentTypeChange,
  handleWaitList,
  values,
}) => {
  // destructure
  const {
    nameOfStudent,
    days,
    day,
    studentTypes,
    studentType,
    timings,
    timing,
    schedType,
  } = values;

  const handleActivate = (e) => {
    handleWaitList();
    handleSubmit(e);
  };

  return (
    <>
      <Flexer>
        <TitleCon>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "red",
            }}
          ></div>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#007bff",
            }}
          ></div>
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "orange",
            }}
          ></div>
        </TitleCon>

        <RoleCon>
          <RoleTitle>Student</RoleTitle>
        </RoleCon>
        <FormContainer>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "8px",
              width: "100%",
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
              <InputFields
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
              gap: "12px",
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
              <CustomSelect
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
              </CustomSelect>
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
              <CustomSelect name="day" value={day} onChange={handleChange}>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </div>
          <InputTitles sx={{ marginTop: "25px" }}>Type*</InputTitles>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              marginTop: "10px",
              width: "fit-content",
              borderRadius: "10px",
              padding: "3px 2px 3px 12px",
              background: "rgba(7, 187, 255, 0.3)",
            }}
          >
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
                        color: "#007bff",

                        "& .MuiSvgIcon-root": {
                          fontSize: 18,
                          fontWeight: "400",
                        },
                        "&.Mui-checked": {
                          color: "#007bff",
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
                        color: "#343434",
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {st}
                    </span>
                  }
                />
              ))}
            </FormGroup>
          </div>
        </FormContainer>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "40px 0 0 0",
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

          {!nameOfStudent || !studentType || !schedType || !day ? (
            <NextDisabledButton>
              <BsPlus style={{ color: "#007bff", fontSize: "18px" }} />
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "#007bff",
                  paddingRight: "4px",
                }}
              >
                Submit
              </span>
            </NextDisabledButton>
          ) : (
            <NextRoundButton onClick={handleActivate}>
              <BsPlus style={{ color: "white", fontSize: "18px" }} />
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "12px",
                  color: "white",
                  paddingRight: "4px",
                }}
              >
                Submit
              </span>
            </NextRoundButton>
          )}
        </div>
      </Flexer>
    </>
  );
};

export default WaitListStudentForm;
