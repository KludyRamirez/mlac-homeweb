import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import { toast } from "react-toastify";
import { ResponsiveDrawer } from "../SideBar/SideBar";
import axios from "axios";
import CreateScheduleForm from "./CreateScheduleForm";
import AllSchedule from "../AllSchedule/AllSchedule";
import {
  BsAspectRatio,
  BsBarChart,
  BsCalendar2MonthFill,
  BsChatSquareQuoteFill,
  BsCloudHaze2,
  BsCloudMoonFill,
  BsFloppy2,
  BsCursorFill,
  BsKanbanFill,
  BsLifePreserver,
  BsMegaphoneFill,
  BsPenFill,
  BsPencil,
  BsRecycle,
  BsRepeat,
} from "react-icons/bs";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  justifyContent: "center",
});

const CreateScheduleContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  backgroundColor: "#f5f3eb",
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
  padding: "50px 80px 0px 80px",
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
  letterSpacing: "0.2px",
  fontWeight: "600",
  fontSize: "16px",
  display: "flex",
  padding: "10px 16px",
  alignItems: "center",
  gap: "12px",
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
    "8:00 AM - 9:00 AM",
    "9:00 AM - 10:00 AM",
    "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 NN",
    "12:00 NN - 1:00 PM",
    "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM",
    "3:00 PM - 4:00 PM",
    "4:00 PM - 5:00 PM",
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
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleStudentTypeChange = (e) => {
    setValues({ ...values, studentType: e.target.value });
  };

  const handleParentChange = (e) => {
    e.preventDefault();
    const parentName = e.target.value;
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
                      width: "70%",
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
                        fontWeight: "500",
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
                          color: "#606060",
                        }}
                      >
                        Editable
                      </span>
                      <BsPencil style={{ color: "#606060" }} />
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
                        fontWeight: "500",
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
                          color: "#606060",
                        }}
                      >
                        Flexible
                      </span>
                      <BsAspectRatio
                        style={{
                          color: "#606060",
                        }}
                      />
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
                        fontWeight: "500",
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
                          color: "#606060",
                        }}
                      >
                        Recurring
                      </span>
                      <BsRepeat
                        style={{
                          color: "#606060",
                        }}
                      />
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
                        fontWeight: "500",
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
                          color: "#606060",
                        }}
                      >
                        Reusable
                      </span>
                      <BsRecycle
                        style={{
                          color: "#606060",
                        }}
                      />
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      width: "30%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <DobotCon>
                      <BsBarChart
                        style={{
                          fontSize: "22px",
                          marginTop: "-2px",
                        }}
                      />
                      <span>Statistics</span>
                    </DobotCon>
                    <DobotCon>
                      <BsCloudHaze2
                        style={{
                          fontSize: "24px",
                          marginTop: "-2px",
                        }}
                      />
                      <span>Weather</span>
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
                        height: "204px",
                        padding: "20px 30px 20px 30px",
                        background: "#f7f7f7",
                        borderRadius: "24px",
                        outline: "1px solid #c0c0c0",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            width: "76%",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "32px",
                              color: "#606060",
                              fontWeight: "600",
                            }}
                          >
                            How editable?
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#606060",
                              fontWeight: "500",
                            }}
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book.
                          </div>
                        </div>
                        <div
                          style={{
                            width: "200px",
                            height: "204px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsKanbanFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsPenFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsMegaphoneFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsFloppy2
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCursorFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsLifePreserver
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCalendar2MonthFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsChatSquareQuoteFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCloudMoonFill
                              style={{
                                fontSize: "32px",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeInfo === "Flexible" && (
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
                        height: "204px",
                        padding: "20px 30px 20px 30px",
                        background: "#f7f7f7",
                        borderRadius: "24px",
                        outline: "1px solid #c0c0c0",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            width: "76%",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "32px",
                              color: "#606060",
                              fontWeight: "600",
                            }}
                          >
                            How flexible?
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#606060",
                              fontWeight: "500",
                            }}
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book.
                          </div>
                        </div>
                        <div
                          style={{
                            width: "200px",
                            height: "204px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsKanbanFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsPenFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsMegaphoneFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsFloppy2
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCursorFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsLifePreserver
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCalendar2MonthFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsChatSquareQuoteFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCloudMoonFill
                              style={{
                                fontSize: "32px",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeInfo === "Recurring" && (
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
                        height: "204px",
                        padding: "20px 30px 20px 30px",
                        background: "#f7f7f7",
                        borderRadius: "24px",
                        outline: "1px solid #c0c0c0",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            width: "76%",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "32px",
                              color: "#606060",
                              fontWeight: "600",
                            }}
                          >
                            How recurring?
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#606060",
                              fontWeight: "500",
                            }}
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book.
                          </div>
                        </div>
                        <div
                          style={{
                            width: "200px",
                            height: "204px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsKanbanFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsPenFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsMegaphoneFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsFloppy2
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCursorFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsLifePreserver
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCalendar2MonthFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsChatSquareQuoteFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCloudMoonFill
                              style={{
                                fontSize: "32px",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeInfo === "Reusable" && (
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
                        height: "204px",
                        padding: "20px 30px 20px 30px",
                        background: "#f7f7f7",
                        borderRadius: "24px",
                        outline: "1px solid #c0c0c0",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            width: "76%",
                            height: "200px",
                          }}
                        >
                          <div
                            style={{
                              fontSize: "32px",
                              color: "#606060",
                              fontWeight: "600",
                            }}
                          >
                            How reusable?
                          </div>
                          <div
                            style={{
                              fontSize: "18px",
                              color: "#606060",
                              fontWeight: "500",
                            }}
                          >
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book. when an
                            unknown printer took a galley of type and scrambled
                            it to make a type specimen book.
                          </div>
                        </div>
                        <div
                          style={{
                            width: "200px",
                            height: "204px",
                            display: "flex",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            gap: "10px",
                          }}
                        >
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsKanbanFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsPenFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsMegaphoneFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsFloppy2
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCursorFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsLifePreserver
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCalendar2MonthFill
                              style={{
                                fontSize: "30px",
                                color: "white",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "57px",
                              height: "56px",
                              background: "transparent",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                              outline: "1px solid rgba(0, 0, 0, 0.3)",
                            }}
                          >
                            <BsChatSquareQuoteFill
                              style={{
                                fontSize: "30px",
                                color: "rgba(0, 0, 0, 0.3)",
                              }}
                            />
                          </div>
                          <div
                            style={{
                              width: "58px",
                              height: "58px",
                              background: "rgba(0, 0, 0, 0.3)",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              borderRadius: "12px",
                            }}
                          >
                            <BsCloudMoonFill
                              style={{
                                fontSize: "32px",
                                color: "white",
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    height: "260px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "30%",
                      height: "100%",
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        width: "47%",
                        height: "47%",
                        border: "1px solid ",
                        borderRadius: "18px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "47%",
                        height: "47%",
                        border: "1px solid ",
                        borderRadius: "18px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "47%",
                        height: "47%",
                        border: "1px solid ",
                        borderRadius: "18px",
                      }}
                    ></div>
                    <div
                      style={{
                        width: "47%",
                        height: "47%",
                        border: "1px solid ",
                        borderRadius: "18px",
                      }}
                    ></div>
                  </div>
                  <div
                    style={{
                      width: "68%",
                      height: "100%",
                      border: "1px solid blue",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div style={{ padding: "20px" }}>kljkluu</div>
                  </div>
                </div>
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
