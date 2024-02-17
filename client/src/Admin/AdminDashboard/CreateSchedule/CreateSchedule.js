import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import CreateScheduleForm from "./CreateScheduleForm";
import AllSchedule from "../AllSchedule/AllSchedule";
import { RiChatSmile3Line } from "react-icons/ri";
import { IoStatsChart } from "react-icons/io5";
import {
  BsAspectRatio,
  BsBarChart,
  BsBarChartFill,
  BsBarChartLine,
  BsPencil,
  BsRecycle,
  BsRepeat,
  BsRobot,
} from "react-icons/bs";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f5f3eb",
});

const CreateScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  "@media (max-width: 767px)": {
    overflow: "hidden",
    overflowY: "scroll",
    padding: "4px",
  },
});

const Flexer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  width: "100%",
  flexWrap: "wrap",
  padding: "60px 60px 0px 60px",

  "@media (max-width: 767px)": {
    padding: "0px 8px 0px 8px",
  },
});

const FormCon1 = styled("div")({
  width: "34%",
  "@media (max-width: 767px)": {
    width: "100%",
  },
});

const FormCon2 = styled("div")({
  width: "60.5%",
  display: "flex",
  justifyContent: "center",

  "@media (max-width: 767px)": {
    width: "100%",
  },
});

const DobotCon = styled("div")({
  fontWeight: "600",
  fontSize: "18px",
  display: "flex",
  padding: "10px 14px",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  outline: "1px solid #909090",
  color: "#606060",
  borderRadius: "30px",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  transition:
    "box-shadow .15s, transform .15s, width 0.2s ease-in, height 0.2s ease-in, color 0.16s ease-in-out",
  "@media (max-width: 767px)": {},
  "&:hover": {
    transform: "translateY(1px)",
    backgroundImage:
      "radial-gradient(100% 100% at 0% 0, #07bbff 0, #007bff 100%)",
    color: "white",
    outline: "none",
  },
  "&:active": {
    transform: "translateY(3px)",
  },
});

const initialState = {
  nameOfStudent: "",
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  day: "",
  parents: [],
  parent: "",
  schedTypes: ["Permanent"],
  schedType: "Permanent",
  studentTypes: ["Solo", "Dyad"],
  studentType: "",
  timings: [
    "8 AM to 9 AM",
    "9 AM to 10 AM",
    "10 AM to 11 AM",
    "11 AM to 12 NN",
    "1 PM to 2 PM",
    "2 PM to 3 PM",
    "3 PM to 4 PM",
    "4 PM to 5 PM",
  ],
  timing: "",
  notifLocator: "",
  isWaitlisteds: ["No"],
  isWaitlisted: "No",
  profilePic: "",
};

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const CreateSchedule = () => {
  const [values, setValues] = useState(initialState);
  const [inputValue, setInputValue] = useState("");
  const [activeInfo, setActiveInfo] = useState("Editable");

  const handleInfoChange = (info) => {
    setActiveInfo(info);
  };

  const auth = useSelector(authSelector);

  const maxLength = 50;

  useEffect(() => {
    getParents();
  }, []);

  const getParents = async () => {
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.get(`${process.env.REACT_APP_API}/user`, {
        headers: {
          Authorization: `Bearer ${auth.userDetails.token}`,
        },
      });
      setValues({ ...values, parents: res.data });
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!auth.userDetails.token) {
        console.error("Authentication token not found.");
        return;
      }
      const res = await axios.post(
        `${process.env.REACT_APP_API}/schedule`,
        values,
        {
          headers: {
            Authorization: `Bearer ${auth.userDetails.token}`,
          },
        }
      );
      toast.success(`Schedule created!`);
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data);
      } else {
        toast.error("Error.");
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.value.length <= maxLength) {
      setInputValue(e.target.value);
    }

    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleStudentTypeChange = (e) => {
    setValues({ ...values, studentType: e.target.value });
  };

  const handleParentChange = (e) => {
    e.preventDefault();
    const parentName = e.target.value;
    console.log(parentName);
    setValues({
      ...values,
      parent: parentName,
    });
  };

  const handlePicChange = (e) => {
    setValues({ ...values, profilePic: e.target.value });
  };

  return (
    <Wrapper>
      <ResponsiveDrawer />
      <CreateScheduleContainer>
        <Flexer>
          <FormCon2>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                fontFamily: "Poppins, sans-serif",
              }}
            >
              <div>
                <div
                  style={{
                    backgroundImage:
                      "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
                    backgroundSize: "100%",
                    backgroundRepeat: "repeat",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    MozBackgroundClip: "text",
                    MozTextFillColor: "transparent",
                    textShadow: "none",
                    marginLeft: "-5px",
                    letterSpacing: "-3px",
                    fontSize: "78px",
                    fontWeight: "600",
                    color: "#606060",
                  }}
                >
                  Permanent
                </div>
                <div
                  style={{
                    fontSize: "32px",
                    fontWeight: "500",
                    letterSpacing: "-1.4px",
                    backgroundImage:
                      "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
                    backgroundSize: "100%",
                    backgroundRepeat: "repeat",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    MozBackgroundClip: "text",
                    MozTextFillColor: "transparent",
                    textShadow: "none",
                  }}
                >
                  Schedule
                </div>

                <div
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    fontFamily: "Arial, sans-serif",
                    letterSpacing: "1px",
                    paddingTop: "40px",
                  }}
                >
                  A schedule where it is..
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    width: "100%",
                    marginTop: "14px",
                    gap: "64px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "24px",
                      background: "transparent",
                      borderRadius: "10px",
                    }}
                  >
                    <div
                      onClick={() => handleInfoChange("Editable")}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "18px",
                        fontWeight: "700",
                        outline:
                          activeInfo === "Editable"
                            ? "1px solid #909090"
                            : "none",
                        padding: "10px",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          backgroundImage:
                            "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
                          backgroundSize: "100%",
                          backgroundRepeat: "repeat",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          MozBackgroundClip: "text",
                          MozTextFillColor: "transparent",
                          textShadow: "none",
                        }}
                      >
                        Editable
                      </span>
                      <BsPencil />
                    </div>
                    <div
                      onClick={() => handleInfoChange("Flexible")}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "18px",
                        fontWeight: "700",
                        outline:
                          activeInfo === "Flexible"
                            ? "1px solid #909090"
                            : "none",
                        padding: "10px",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          backgroundImage:
                            "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
                          backgroundSize: "100%",
                          backgroundRepeat: "repeat",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          MozBackgroundClip: "text",
                          MozTextFillColor: "transparent",
                          textShadow: "none",
                        }}
                      >
                        Flexible
                      </span>
                      <BsAspectRatio />
                    </div>
                    <div
                      onClick={() => handleInfoChange("Recurring")}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "18px",
                        fontWeight: "700",
                        outline:
                          activeInfo === "Recurring"
                            ? "1px solid #909090"
                            : "none",
                        padding: "10px",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          backgroundImage:
                            "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
                          backgroundSize: "100%",
                          backgroundRepeat: "repeat",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          MozBackgroundClip: "text",
                          MozTextFillColor: "transparent",
                          textShadow: "none",
                        }}
                      >
                        Recurring
                      </span>
                      <BsRepeat />
                    </div>
                    <div
                      onClick={() => handleInfoChange("Reusable")}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "12px",
                        fontSize: "18px",
                        fontWeight: "700",
                        outline:
                          activeInfo === "Reusable"
                            ? "1px solid #909090"
                            : "none",
                        padding: "10px",
                        borderRadius: "30px",
                        cursor: "pointer",
                      }}
                    >
                      <span
                        style={{
                          backgroundImage:
                            "radial-gradient(100% 100% at 0% 0, #007bff 0, #122c8e 100%)",
                          backgroundSize: "100%",
                          backgroundRepeat: "repeat",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          MozBackgroundClip: "text",
                          MozTextFillColor: "transparent",
                          textShadow: "none",
                        }}
                      >
                        Reusable
                      </span>
                      <BsRecycle />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <DobotCon>
                      <span>Statistics</span>
                      <BsBarChart style={{ fontSize: "20px" }} />
                    </DobotCon>
                    <DobotCon>
                      <span>Dobot</span>
                      <RiChatSmile3Line style={{ fontSize: "24px" }} />
                    </DobotCon>
                  </div>
                </div>
                {activeInfo === "Editable" && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: "20px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "200px",
                        padding: "10px",
                        background: "#f7f7f7",
                        borderRadius: "10px",
                        outline: "1px solid #c0c0c0",
                      }}
                    >
                      kludy ramirez
                    </div>
                  </div>
                )}
                <div
                  style={{
                    color: "#606060",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-start",
                    paddingTop: "54px",
                    fontSize: "18px",
                    fontWeight: "600",
                  }}
                >
                  New students
                </div>
                <div
                  style={{
                    width: "14.8%",
                    height: "2px",
                    background: "#606060",
                    backgroundImage:
                      "linear-gradient(315deg, #606060 0%, #f1f1f1 74%)",
                    borderRadius: "4px",
                    marginTop: "12px",
                  }}
                ></div>
              </div>
            </div>
          </FormCon2>
          <FormCon1>
            <CreateScheduleForm
              handleSubmit={handleSubmit}
              handleChange={handleChange}
              values={values}
              handleParentChange={handleParentChange}
              handleStudentTypeChange={handleStudentTypeChange}
              handlePicChange={handlePicChange}
              maxLength={maxLength}
            />
          </FormCon1>
        </Flexer>
      </CreateScheduleContainer>
    </Wrapper>
  );
};

export default CreateSchedule;
