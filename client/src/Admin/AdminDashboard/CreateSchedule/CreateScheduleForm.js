import React from "react";
import { styled } from "@mui/system";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Tilt from "react-parallax-tilt";
import {
  BsClock,
  BsHourglassSplit,
  BsKeyboard,
  BsMoon,
  BsPencil,
  BsPeople,
  BsPersonArmsUp,
  BsPersonCircle,
  BsQuestionCircle,
} from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  borderRadius: "10px",
  background: "#f7f7f7",
  outline: "1px solid #c0c0c0",
  padding: "40px 40px 44px 40px",
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
  fontFamily: "Poppins, sans-serif",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  width: "94px",
  height: "48px",
  background: "#fff",
  borderRadius: "46px",
  cursor: "pointer",
  color: "#606060",
  fontSize: "16px",
  fontWeight: "600",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  outline: "1px solid rgba(0, 0, 0, 0.16)",

  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.16s ease-in-out",
  "&:hover": {
    transform: "translateY(1px)",
    background: "radial-gradient(100% 100% at 0% 0, #07bbff 0, #007bff 100%)",
    color: "white",
    outline: "none",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const NextRoundButton = styled("button")({
  fontFamily: "Poppins, sans-serif",
  color: "white",
  padding: "0",
  border: "none",
  background: "#9f9f9f",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "110px",
  height: "48px",
  borderRadius: "100px",
  cursor: "pointer",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.4s ease-in-out",
  "&:hover": {
    transform: "translateY(1px)",
    background: "#8f8f8f",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const NextDisabledButton = styled("button")({
  fontFamily: "Poppins, sans-serif",
  padding: "0",
  color: "#606060",
  background: "#fff",
  border: "none",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "110px",
  height: "48px",
  borderRadius: "48px",
  cursor: "pointer",
  outline: "1px solid rgba(0, 0, 0, 0.26)",
});

const InputFields = styled("input")({
  width: "100%",
  background: "#fff",
  border: "none",
  borderRadius: "10px",
  height: "54px",
  padding: "0px 16px 0px 16px",
  fontSize: "16px",
  fontWeight: "500",
  color: "#303030",
  position: "relative",
  fontFamily: "Poppins, sans-serif",
  outline: "1px solid rgba(0, 0, 0, 0.1)",

  "&:focus": {
    outline: "1px solid #606060",
    border: "none",
    background: "#fff",
  },
  "&::placeholder": {
    color: "rgba(0, 0, 0, 0.4)",
    fontSize: "12px",
    fontWeight: "500",
  },
});

const CustomSelect = styled("select")`
  cursor: pointer;
  width: 100%;
  background: #fff;
  border: none;
  border-radius: 10px;
  height: 54px;
  padding: 0px 16px 0px 16px;
  font-size: 16px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  color: #303030;
  appearance: none; /* Removes default dropdown arrow */
  outline: 1px solid rgba(0, 0, 0, 0.1);

  &:focus {
    outline: 1px solid #606060;
    border: none;
  }

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const InputTitles = styled("div")({
  width: "100%",
  height: "20px",
  fontSize: "16px",
  color: "#303030",
  fontWeight: "600",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
});

const RoleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const RoleTitle = styled("div")({
  margin: "0px",
  padding: "32px 4px 37px 0",
  fontSize: "48px",
  fontWeight: "700",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",
});

const CreateScheduleForm = ({
  handleSubmit,
  handleChange,
  handleParentChange,
  values,
  handleStudentTypeChange,
  handlePicChange,
  maxLength,
}) => {
  const {
    nameOfStudent,
    days,
    day,
    parent,
    parents,
    schedType,
    studentTypes,
    studentType,
    timings,
    timing,
    profilePic,
  } = values;

  return (
    <>
      <Flexer>
        <div
          style={{
            color: "#606060",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            fontSize: "42px",
            fontWeight: "600",
            marginLeft: "-4px",
            marginTop: "-6px",
          }}
        >
          Create schedule
        </div>

        <FormContainer>
          <InputTitles sx={{ paddingTop: "22px" }}>
            Photo{" "}
            <BsPersonArmsUp style={{ fontSize: "16px", color: "#8f8f8f" }} />
          </InputTitles>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={profilePic}
            onChange={handlePicChange}
            sx={{ paddingTop: "18px" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "20px",
                marginLeft: "12px",
              }}
            >
              <label htmlFor="stark" style={{ cursor: "pointer" }}>
                <FormControlLabel
                  value="https://res.cloudinary.com/dni1vtbsv/image/upload/v1707566600/gakpqdtqmnyv4pp5uv2l.webp"
                  control={<Radio id="stark" style={{ display: "none" }} />}
                  label={
                    <img
                      src="https://res.cloudinary.com/dni1vtbsv/image/upload/v1707566600/gakpqdtqmnyv4pp5uv2l.webp"
                      alt="Stark"
                      style={{
                        outline:
                          profilePic ===
                          "https://res.cloudinary.com/dni1vtbsv/image/upload/v1707566600/gakpqdtqmnyv4pp5uv2l.webp"
                            ? "2px solid #606060"
                            : "none",
                        width: "74px",
                        height: "74px",
                        borderRadius: "50%",
                      }}
                    />
                  }
                />
              </label>
              <label htmlFor="stark" style={{ cursor: "pointer" }}>
                <FormControlLabel
                  value="https://res.cloudinary.com/dni1vtbsv/image/upload/v1707565823/gcdo7cp8fewjhovxol8n.webp"
                  control={<Radio id="stark" style={{ display: "none" }} />}
                  label={
                    <img
                      src="https://res.cloudinary.com/dni1vtbsv/image/upload/v1707565823/gcdo7cp8fewjhovxol8n.webp"
                      alt="Stark"
                      style={{
                        outline:
                          profilePic ===
                          "https://res.cloudinary.com/dni1vtbsv/image/upload/v1707565823/gcdo7cp8fewjhovxol8n.webp"
                            ? "2px solid #606060"
                            : "none",
                        width: "74px",
                        height: "74px",
                        borderRadius: "50%",
                      }}
                    />
                  }
                />
              </label>
              <label htmlFor="stark" style={{ cursor: "pointer" }}>
                <FormControlLabel
                  value="https://res.cloudinary.com/dni1vtbsv/image/upload/v1707566600/zqpjk4brscwi4voxopce.webp"
                  control={<Radio id="stark" style={{ display: "none" }} />}
                  label={
                    <img
                      src="https://res.cloudinary.com/dni1vtbsv/image/upload/v1707566600/zqpjk4brscwi4voxopce.webp"
                      alt="Stark"
                      style={{
                        outline:
                          profilePic ===
                          "https://res.cloudinary.com/dni1vtbsv/image/upload/v1707566600/zqpjk4brscwi4voxopce.webp"
                            ? "2px solid #606060"
                            : "none",
                        width: "74px",
                        height: "74px",
                        borderRadius: "50%",
                      }}
                    />
                  }
                />
              </label>
            </div>
          </RadioGroup>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              gap: "12px",
              width: "100%",
              paddingTop: "18px",
            }}
          >
            <InputTitles>
              Name <BsPencil style={{ fontSize: "16px", color: "#8f8f8f" }} />
            </InputTitles>

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
                maxLength={maxLength}
                autoComplete="off"
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
              width: "100%",
              paddingTop: "28px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                width: "50%",
              }}
            >
              <InputTitles>
                Time <BsClock style={{ fontSize: "16px", color: "#8f8f8f" }} />
              </InputTitles>
              <CustomSelect
                name="timing"
                value={timing}
                onChange={handleChange}
              >
                <option style={{ color: "rgba(0, 123, 255, 0.4)" }}></option>
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
                gap: "12px",
                width: "50%",
              }}
            >
              <InputTitles>
                Day <BsMoon style={{ fontSize: "16px", color: "#8f8f8f" }} />
              </InputTitles>
              <CustomSelect name="day" value={day} onChange={handleChange}>
                <option style={{ color: "rgba(0, 123, 255, 0.4)" }}></option>
                {days.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
              width: "100%",
              paddingTop: "32px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                width: "50%",
              }}
            >
              <InputTitles>
                Parent
                <BsPeople style={{ fontSize: "16px", color: "#8f8f8f" }} />
              </InputTitles>
              <CustomSelect
                name="parent"
                value={parent}
                onChange={handleParentChange}
              >
                <option></option>
                {parents
                  .filter((p) => p.role !== "Administrator")
                  .map((p) => (
                    <option key={p._id} value={`${p.fullname} ${p.username}`}>
                      {p.fullname}
                    </option>
                  ))}
              </CustomSelect>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "12px",
                width: "50%",
              }}
            >
              <InputTitles>
                Type{" "}
                <BsKeyboard style={{ fontSize: "16px", color: "#8f8f8f" }} />
              </InputTitles>
              <CustomSelect
                name="studentType"
                value={studentType}
                onChange={handleStudentTypeChange}
              >
                <option style={{ color: "rgba(0, 123, 255, 0.4)" }}></option>
                {studentTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </CustomSelect>
            </div>
          </div>
        </FormContainer>

        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "48px 0 0 0",
          }}
        >
          <FilterButton>
            FAQ <BsQuestionCircle style={{ fontSize: "18px" }} />
          </FilterButton>
          {!nameOfStudent || !studentType || !schedType || !day ? (
            <NextDisabledButton>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Submit
              </span>
              <FaPlus style={{ color: "#909090", fontSize: "16px" }} />
            </NextDisabledButton>
          ) : (
            <NextRoundButton onClick={handleSubmit}>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "600",
                }}
              >
                Submit
              </span>
              <FaPlus style={{ fontSize: "16px" }} />
            </NextRoundButton>
          )}
        </div>
        <div
          style={{
            color: "#606060",
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            paddingTop: "46px",
            fontSize: "18px",
            fontWeight: "600",
          }}
        >
          Create temporary schedule?
        </div>
        <div
          style={{
            width: "25%",
            height: "2px",
            background: "#606060",
            backgroundImage: "linear-gradient(315deg, #606060 0%, #f1f1f1 74%)",
            borderRadius: "4px",
            marginTop: "12px",
          }}
        ></div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "18px",
            paddingTop: "30px",
          }}
        >
          <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
            <FilterButton>
              <span>Dyad</span>
              <BsClock style={{ fontSize: "18px" }} />
            </FilterButton>
          </Link>
          <Link to="/temp-soloschedule" style={{ textDecoration: "none" }}>
            <FilterButton>
              <span>Solo</span>
              <BsHourglassSplit style={{ fontSize: "18px" }} />
            </FilterButton>
          </Link>
        </div>
      </Flexer>
    </>
  );
};

export default CreateScheduleForm;
