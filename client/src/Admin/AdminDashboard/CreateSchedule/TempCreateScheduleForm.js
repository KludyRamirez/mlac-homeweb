import React, { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import { BsCalendarWeek, BsHourglassSplit, BsPlus } from "react-icons/bs";
import { styled } from "@mui/system";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import moment from "moment";

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
  fontFamily: "Poppins, sans-serif",

  "&:focus": {
    outline: "2px solid #228B22",
    border: "1px solid rgba(7, 187, 255, 0.2)",
  },
  "&::placeholder": {
    color: "#343434",
    fontSize: "11px",
    fontWeight: "600",
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
  paddingRight: "3.5px",

  "@media (max-width: 767px)": {},
});

// const FormTitle = styled("h1")({
//   margin: "0px",
//   backgroundColor: "blue",
//   backgroundImage:
//     "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
//   backgroundSize: "100%",
//   backgroundRepeat: "repeat",
//   paddingBottom: "20px",
//   WebkitBackgroundClip: "text",
//   WebkitTextFillColor: "transparent",
//   MozBackgroundClip: "text",
//   MozTextFillColor: "transparent",
// });

// const DateTimeCon = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   gap: "5px",
// });

// const DateTimeInput = styled("input")({
//   borderRadius: "5px",
//   width: "75%",
//   borderColor: "#007bff",
//   padding: "0px 10px",
//   textTransform: "uppercase",
//   color: "darkgray",
// });

const TempCreateScheduleForm = ({
  handleSubmit,
  handleNameOfStudentChange,
  values,
  handlePermanentChange,
  handleTempSoloDayChange,
  handleChange,
}) => {
  // destructure
  const {
    tempStudentNames,
    tempStudentName,
    schedType,
    permanentScheds,
    permanentSched,
    dateTime,
    tempSoloDay,
    timings,
    timing,
  } = values;

  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [showDiv, setShowDiv] = useState(true);

  let selectedDay = "";

  const selectedPermanentSched = permanentScheds.find(
    (ps) => ps._id === permanentSched
  );

  if (selectedPermanentSched) {
    selectedDay = selectedPermanentSched.day;
  }

  useEffect(() => {
    if (tempSoloDay === selectedDay) {
      setIsButtonEnabled(true);
    } else {
      setIsButtonEnabled(false);
    }
  }, [tempSoloDay, permanentSched]);

  const todaym = moment();
  const minDate = todaym.add(1, "days").format("YYYY-MM-DD");

  const maxDate = moment().add(6, "days");
  const maxDateISOString = maxDate.format("YYYY-MM-DD");

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
          <RoleTitle> Add Temporary</RoleTitle>
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
            <InputTitles>Name *</InputTitles>
            <CustomSelect
              name="nameOfStudent"
              value={tempStudentName}
              onChange={handleNameOfStudentChange}
            >
              <option style={{ color: "rgba(0, 123, 255, 0.4)" }}>
                Select student
              </option>
              {tempStudentNames
                .filter((n) => n.isActive === false && n.studentType === "Dyad")
                .map((n) => (
                  <option key={n._id} value={n._id}>
                    {n.nameOfStudent}
                  </option>
                ))}
            </CustomSelect>
          </div>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "10px",
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
              <InputTitles>Date *</InputTitles>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  width: "100%",
                }}
              >
                <InputFields
                  type="date"
                  name="dateTime"
                  min={minDate}
                  max={maxDateISOString}
                  value={dateTime}
                  onChange={handleTempSoloDayChange}
                />
              </div>
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
              <InputTitles>Schedule With *</InputTitles>
              <CustomSelect
                name="permanentSched"
                value={permanentSched}
                onChange={handlePermanentChange}
              >
                <option style={{ color: "rgba(0, 123, 255, 0.4)" }}>
                  Select student
                </option>
                {permanentScheds
                  .filter(
                    (ps) =>
                      ps.isActive === true &&
                      ps.studentType === "Dyad" &&
                      ps.day === tempSoloDay
                  )
                  .map((ps) => (
                    <option key={ps._id} value={ps._id}>
                      {ps.nameOfStudent} - {ps.day} [{ps.timing}]
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
            <Link to="/schedule" style={{ textDecoration: "none" }}>
              <FilterButton>
                <BsCalendarWeek
                  style={{ fontSize: "18px", color: "#122c8e" }}
                />
              </FilterButton>
            </Link>
            <Link to="/temp-soloschedule" style={{ textDecoration: "none" }}>
              <FilterButton>
                <BsHourglassSplit
                  style={{ fontSize: "18px", color: "#122c8e" }}
                />
              </FilterButton>
            </Link>
          </div>

          {!tempStudentName || !schedType || !permanentSched ? (
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
            <NextRoundButton onClick={handleSubmit}>
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "40px",
          alignItems: "center",
          gap: "24px",
          margin: "20px 0px 30px 0",
        }}
      >
        <div
          style={{
            width: "33%",
            height: "1px",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />
        <span
          style={{
            fontSize: "16px",
            color: "#122c8e",
            fontWeight: "600",
            marginTop: "-4px",
            whiteSpace: "nowrap",
          }}
        >
          Global Statistics
        </span>
        <div
          style={{
            width: "33%",
            height: "1px",
            background: "rgba(0, 0, 0, 0.1)",
          }}
        />
      </div>
      <FlexerRow>
        <Tilt>
          <StatsCard
            sx={{
              background: "#122c8e",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Total</div>
              <div>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              19
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard
            sx={{
              background: "rgba(255, 170, 51, 1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Online</div>
              <div>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              7
            </div>
          </StatsCard>
        </Tilt>
        <Tilt>
          <StatsCard
            sx={{
              background: "rgba(255, 49, 49, 1)",
            }}
          >
            <div
              style={{
                fontSize: "14px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Absent</div>
              <div>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
                color: "rgba(255, 255, 255, 1)",
                fontWeight: "600",
                alignSelf: "flex-end",
              }}
            >
              7
            </div>
          </StatsCard>
        </Tilt>
      </FlexerRow>
    </>
  );
};

export default TempCreateScheduleForm;
