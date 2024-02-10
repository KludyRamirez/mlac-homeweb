import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import { createSelector } from "reselect";
import TopBar from "../AppBar/AppBar";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import { BsArrowUpShort, BsPersonFillGear } from "react-icons/bs";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundImage:
    "radial-gradient(at bottom left, rgba(255, 255, 255, 0.15) 6%, rgba(7, 187, 255, 0.20) 47.6%, rgba(204, 251, 241, 0.15) 87.8%)",

  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowX: "scroll",
    overflowY: "scroll",
    justifyContent: "flex-start",
  },
});

const AccountSettingsCon = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: "transparent",
  width: "100%",
  height: "100%",
  "@media (max-width: 767px)": {
    padding: "10px",
    marginTop: "10px",
    alignItems: "flex-start",
    overflow: "hidden",
  },
});

const TitleCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  width: "100%",
});

const FormTitle = styled("div")({
  padding: "34px 0px 20px 38px",
  fontSize: "16px",
  fontWeight: "500",
  backgroundImage:
    "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  textShadow: "none",

  "@media (max-width: 767px)": {
    fontSize: "48px",
  },
});

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "flex-start",
  gap: "12px",
  height: "inherit",
  padding: "0 40px",
});

const WeekContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  gap: "14px",
  marginLeft: "-7px",
  alignSelf: "flex-start",
  paddingTop: "30px",
}));

const InputFields = styled("input")({
  width: "100%",
  background: "transparent",
  outline: "1px solid rgba(7, 187, 255, 0.6)",
  border: "none",
  borderRadius: "24px",
  height: "48px",
  padding: "0px 20px 0px 20px",
  fontSize: "13px",
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
    fontSize: "13px",
    fontWeight: "500",
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
  background: "rgba(255, 255, 255, 0.24)",
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

const InputTitles = styled("div")({
  width: "200px",
  height: "20px",
  fontSize: "13px",
  margin: "0px",
  color: "#122c8e",
  fontWeight: "500",
  letterSpacing: "0.4px",
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

const FormContainer = styled("div")({
  width: "100%",
  borderRadius: "12px",
  "@media (max-width: 767px)": {
    borderRadius: "0px",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AccountSettings = () => {
  const [mail, setMail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const auth = useSelector(authSelector);
  const history = useHistory();

  const maxLength = 50;

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast.error(`Password does not match!`);
      return;
    }

    if (oldPassword === newPassword) {
      toast.error(`Password already in use!`);
      return;
    }

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success("Password Changed!");
      console.log(res.data);
      history.push("/timetable");
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API}/change-email`,
        {
          mail,
        },
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success("Email Changed!");
      console.log(res.data);
      history.push("/timetable");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <AccountSettingsCon>
        <TitleCon>
          <FormTitle>
            {"<"} Settings <span style={{ fontSize: "13px" }}>/</span>{" "}
          </FormTitle>
          <FormTitle sx={{ paddingLeft: "6px", paddingRight: "0" }}>
            Account
          </FormTitle>
        </TitleCon>
        <TitleCon>
          <FormTitle
            sx={{
              paddingRight: "0",
              paddingTop: "0",
              fontSize: "32px",
              fontWeight: "500",
            }}
          >
            Account
          </FormTitle>
        </TitleCon>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "12px",
              width: "1200px",
              height: "800px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "36px",
                height: "34px",
                border: "1px solid rgba(7, 187, 255, 0.6)",
                borderRadius: "12px",
                padding: "10px",
                background: "rgba(255, 255, 255, 0.24)",
              }}
            >
              <BsPersonFillGear
                style={{ fontSize: "34px", color: "#007bff" }}
              />
            </div>
            <div
              style={{
                width: "420px",
                height: "300px",
                borderRadius: "12px",
                padding: "0 40px",
              }}
            >
              <TitleCon sx={{ display: "flex", justifyContent: "flex-end" }}>
                <FormTitle
                  sx={{
                    paddingRight: "0",
                    paddingTop: "0",
                    paddingLeft: "0",
                    fontSize: "32px",
                    fontWeight: "500",
                  }}
                >
                  Password
                </FormTitle>
              </TitleCon>
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
                  <InputTitles>Current Password *</InputTitles>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <InputFields
                      type="password"
                      name="oldPassword"
                      value={oldPassword}
                      onChange={(e) => {
                        if (e.target.value.length <= 50) {
                          setOldPassword(e.target.value);
                        }
                      }}
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
                    <InputTitles>New Password *</InputTitles>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <InputFields
                        type="password"
                        name="newPassword"
                        value={newPassword}
                        onChange={(e) => {
                          if (e.target.value.length <= 50) {
                            setNewPassword(e.target.value);
                          }
                        }}
                        maxLength={maxLength}
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
                    <InputTitles>Confirm Password *</InputTitles>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <InputFields
                        type="password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => {
                          if (e.target.value.length <= 50) {
                            setConfirmPassword(e.target.value);
                          }
                        }}
                        maxLength={maxLength}
                      />
                    </div>
                  </div>
                </div>
                <br />
                <div
                  style={{
                    paddingTop: "8px",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  {!oldPassword || !newPassword || !confirmPassword ? (
                    <NextDisabledButton>
                      <BsArrowUpShort
                        style={{ color: "#122c8e", fontSize: "24px" }}
                      />
                    </NextDisabledButton>
                  ) : (
                    <NextRoundButton onClick={handleChangePassword}>
                      <BsArrowUpShort
                        style={{ color: "white", fontSize: "24px" }}
                      />
                    </NextRoundButton>
                  )}
                </div>
                <br />
                <div
                  style={{
                    width: "80%",
                    height: "1px",
                    background: "rgba(0, 123, 255, 0.1)",
                  }}
                ></div>
                <br />
                <TitleCon sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <FormTitle
                    sx={{
                      paddingRight: "0",
                      paddingTop: "0",
                      paddingLeft: "0",
                      fontSize: "32px",
                      fontWeight: "500",
                    }}
                  >
                    Email
                  </FormTitle>
                </TitleCon>
                <form onSubmit={handleChangeEmail}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "8px",
                      width: "100%",
                    }}
                  >
                    <InputTitles>Email *</InputTitles>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        width: "100%",
                      }}
                    >
                      <InputFields
                        type="email"
                        name="mail"
                        value={mail}
                        onChange={(e) => {
                          if (e.target.value.length <= 50) {
                            setMail(e.target.value);
                          }
                        }}
                        maxLength={maxLength}
                      />
                    </div>
                  </div>
                  <br />
                  <div
                    style={{
                      paddingTop: "8px",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    {!mail ? (
                      <NextDisabledButton>
                        <BsArrowUpShort
                          style={{ color: "#122c8e", fontSize: "24px" }}
                        />
                      </NextDisabledButton>
                    ) : (
                      <NextRoundButton>
                        <BsArrowUpShort
                          style={{ color: "white", fontSize: "24px" }}
                        />
                      </NextRoundButton>
                    )}
                  </div>
                </form>
                <br />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div
                    style={{
                      width: "20%",
                      height: "4px",
                      outline: "1px solid rgba(7, 187, 255, 0.4)",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "14%",
                      height: "4px",
                      outline: "1px solid rgba(7, 187, 255, 0.4)",
                      borderRadius: "4px",
                    }}
                  ></div>
                  <div
                    style={{
                      width: "8%",
                      height: "4px",
                      outline: "1px solid rgba(7, 187, 255, 0.4)",
                      borderRadius: "4px",
                    }}
                  ></div>
                </div>
              </FormContainer>
            </div>
          </div>
        </div>
      </AccountSettingsCon>
    </Wrapper>
  );
};

export default AccountSettings;
