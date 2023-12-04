import React from "react";
import { styled } from "@mui/system";
import { FaPlus } from "react-icons/fa6";
import { BsCheckLg, BsClockFill, BsHourglassSplit } from "react-icons/bs";
import Tilt from "react-parallax-tilt";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

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
  gap: "8px",
  width: "88px",
  height: "40px",
  background: "#f7fff7",
  border: "1px solid rgba(0, 123, 255, 0.6)",
  borderRadius: "36px",
  cursor: "pointer",
  color: "#122c8e",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.16s ease-in-out",
  "&:hover": {
    border: "none",
    color: "white",
    transform: "translateY(-1px)",
    background: "#33f641",
    backgroundImage:
      "radial-gradient(at 16.0% 15.0%, hsl(55, 99%, 44%) 0px, transparent 50%),radial-gradient(at 12.0% 94.0%, hsl(74, 34%, 61%) 0px, transparent 50%),radial-gradient(at 98.0% 29.0%, hsl(90, 60%, 24%) 0px, transparent 50%),radial-gradient(at 1.0% 16.0%, hsl(105, 10%, 31%) 0px, transparent 50%),radial-gradient(at 28.0% 88.0%, hsl(148, 67%, 56%) 0px, transparent 50%)",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const NextRoundButton = styled("button")({
  padding: "0",
  border: "none",
  background: "#33f641",
  backgroundImage:
    "radial-gradient(at 16.0% 15.0%, hsl(55, 99%, 44%) 0px, transparent 50%),radial-gradient(at 12.0% 94.0%, hsl(74, 34%, 61%) 0px, transparent 50%),radial-gradient(at 98.0% 29.0%, hsl(90, 60%, 24%) 0px, transparent 50%),radial-gradient(at 1.0% 16.0%, hsl(105, 10%, 31%) 0px, transparent 50%),radial-gradient(at 28.0% 88.0%, hsl(148, 67%, 56%) 0px, transparent 50%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "38px",
  height: "36px",
  borderRadius: "24px",
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
  background: "transparent",
  border: "none",
  outline: "1px solid rgba(0, 123, 255, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  gap: "6px",
  width: "38px",
  height: "36px",
  borderRadius: "24px",
  cursor: "pointer",
  fontFamily: "Poppins, sans-serif",
});

const InputFields = styled("input")({
  width: "100%",
  background: "#f7fff7",
  outline: "1px solid rgba(0, 123, 255, 0.6)",
  border: "none",
  borderRadius: "24px",
  height: "44px",
  padding: "0px 0px 0px 20px",
  fontSize: "12px",
  fontWeight: "500",
  color: "#122c8e",
  letterSpacing: "0.2px",
  position: "relative",
  fontFamily: "Poppins, sans-serif",

  "&:focus": {
    outline: "2px solid #007bff",
    border: "none",
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
  background: #f7fff7;
  border: none;
  outline: 1px solid rgba(0, 123, 255, 0.6);
  border-radius: 24px;
  height: 44px;
  padding: 0px 0px 0px 20px;
  font-size: 12px;
  font-weight: 500;
  font-family: "Poppins", sans-serif;
  color: #122c8e;
  letter-spacing: 0.4px;
  appearance: none; /* Removes default dropdown arrow */

  &:focus {
    outline: 2px solid #007bff;
    border: none;
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
  letterSpacing: "0.4px",
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
    "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
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
  padding: "32px 4px 37px 0px",
  fontSize: "48px",
  fontWeight: "700",
  marginLeft: "-3.5px",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",
  letterSpacing: "-2px",
});

const UserUpdateForm = ({
  handleSubmit,
  handleInputChange,
  handleRoleChange,
  maxLength,
  values,
}) => {
  // destructure
  const { username, firstname, lastname, password, role } = values;

  const isButtonDisabled = username.length < 3 || username.length > 24;

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
          <RoleTitle>Edit User</RoleTitle>
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
            <InputTitles>Username *</InputTitles>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                width: "100%",
              }}
            >
              <InputFields
                name="username"
                value={username}
                onChange={handleInputChange}
                maxLength={maxLength}
              />
            </div>
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
              <InputTitles>Firstname *</InputTitles>
              <InputFields
                style={{ width: "91.7%" }}
                name="firstname"
                value={firstname}
                onChange={handleInputChange}
                maxLength={maxLength}
              />
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
              <InputTitles>Lastname *</InputTitles>
              <InputFields
                style={{ width: "91.7%" }}
                name="lastname"
                value={lastname}
                onChange={handleInputChange}
                maxLength={maxLength}
              />
            </div>
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
              <InputTitles>Password *</InputTitles>
              <InputFields
                style={{ width: "91.7%" }}
                // type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
              />
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
              <InputTitles>Role *</InputTitles>
              <CustomSelect
                name="role"
                value={role}
                onChange={handleRoleChange}
              >
                <option style={{ color: "rgba(0, 123, 255, 0.4)" }}></option>

                <option key="Administrator" value="Administrator">
                  Administrator
                </option>
                <option key="Administrator" value="Therapist">
                  Therapist
                </option>
                <option key="Administrator" value="Parent">
                  Parent
                </option>
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
              gap: "12px",
            }}
          >
            <Link to="/temp-schedule" style={{ textDecoration: "none" }}>
              <FilterButton sx={{ borderBottomRightRadius: "4px" }}>
                <BsClockFill style={{ fontSize: "18px" }} />
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Dyad
                </span>
              </FilterButton>
            </Link>
            <Link to="/temp-soloschedule" style={{ textDecoration: "none" }}>
              <FilterButton sx={{ borderBottomLeftRadius: "4px" }}>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                  }}
                >
                  Solo
                </span>
                <BsHourglassSplit style={{ fontSize: "18px" }} />
              </FilterButton>
            </Link>
          </div>

          {!username || !firstname || !lastname || !password ? (
            <NextDisabledButton>
              <FaPlus style={{ color: "#122c8e", fontSize: "14px" }} />
            </NextDisabledButton>
          ) : (
            <NextRoundButton onClick={handleSubmit}>
              <BsCheckLg style={{ color: "white", fontSize: "18px" }} />
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
              outline: "1px solid rgba(7, 187, 255, 0.4)",
              background: "#f0ffff",
              WebkitBackdropFilter: "blur(4px)",
              backdropFilter: "blur(4px)",
              cursor: "pointer",
              listStyle: "none",
              overflow: "hidden",
              position: "relative",
              textDecoration: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "manipulation",
              willChange: "transform",
              transition: "transform .15s",
              color: "#122c8e",
              ":hover": {
                color: "white",
                background: "#122c8e",
                outline: "1px solid #122c8e",
              },
            }}
          >
            <div
              style={{
                fontSize: "14px",

                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Total</div>
              <div style={{ marginTop: "-2px" }}>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",

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
              outline: "1px solid rgba(7, 187, 255, 0.4)",
              background: "#f0ffff",
              WebkitBackdropFilter: "blur(4px)",
              backdropFilter: "blur(4px)",
              cursor: "pointer",
              listStyle: "none",
              overflow: "hidden",
              position: "relative",
              textDecoration: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "manipulation",
              willChange: "transform",
              transition: "transform .15s",
              color: "#122c8e",
              ":hover": {
                color: "white",
                background: "#FFBF00",
                outline: "1px solid #FFBF00",
              },
            }}
          >
            <div
              style={{
                fontSize: "14px",

                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Online</div>
              <div style={{ marginTop: "-2px" }}>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",

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
              outline: "1px solid rgba(7, 187, 255, 0.4)",
              background: "#f0ffff",
              WebkitBackdropFilter: "blur(4px)",
              backdropFilter: "blur(4px)",
              cursor: "pointer",
              listStyle: "none",
              overflow: "hidden",
              position: "relative",
              textDecoration: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              touchAction: "manipulation",
              willChange: "transform",
              transition: "transform .15s",
              color: "#122c8e",
              ":hover": {
                color: "white",
                background: "#ff3131",
                outline: "#ff3131",
              },
            }}
          >
            <div
              style={{
                fontSize: "14px",
                fontWeight: "400",
                marginTop: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div>Absent</div>
              <div style={{ marginTop: "-2px" }}>Schedules</div>
            </div>
            <div
              style={{
                fontSize: "42px",
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

export default UserUpdateForm;
