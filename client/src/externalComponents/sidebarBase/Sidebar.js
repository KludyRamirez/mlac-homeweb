import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import {
  BsCalendar4,
  BsCalendar4Event,
  BsCalendar4Range,
  BsCalendar4Week,
  BsCalendarDate,
  BsCalendarDateFill,
  BsCalendarEventFill,
  BsCalendarFill,
  BsCalendarRangeFill,
  BsCalendarWeekFill,
  BsChevronDown,
  BsChevronUp,
  BsGear,
  BsGearFill,
  BsHourglass,
  BsHourglassSplit,
  BsPeople,
  BsPeopleFill,
  BsPerson,
  BsPersonFill,
  BsPieChart,
  BsPieChartFill,
} from "react-icons/bs";
import { logoutUtil } from "../../pages/auth/login/loginUtils/logoutUtil";
import { IoReceipt, IoReceiptOutline } from "react-icons/io5";
import avatar from "../../images/drac.png";

const AppNavBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  width: { sm: "calc(100% - 40px)" },
  ml: { sm: "40px" },
  height: "40px",
});

const SidebarOptions = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  listStyle: "none",
  overflow: "hidden",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "transform",
  color: "#c5d1de",
  padding: "11px 13px",
  fontSize: "24px",
  width: "100%",
  cursor: "pointer",

  "&:hover": {
    transform: "translateY(-1px)",
    background: "#2d333b",
    borderRadius: "6px",
    color: "white",
  },
  "&:active": {
    transform: "translateY(1px)",
  },
});

const RouteCon = styled("div")({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  gap: "16px",
  cursor: "pointer",
  width: "100%",
});

export const FormTitle = styled("div")({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #07bbff 0, #1F51FF 100%)",
  backgroundSize: "100%",
  backgroundRepeat: "repeat",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  MozBackgroundClip: "text",
  MozTextFillColor: "transparent",
  fontSize: "30px",
  fontWeight: "600",
  zIndex: "2",
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

function Sidebar(props) {
  const initialScheduleMenuState =
    localStorage.getItem("isScheduleMenuOpen") === "true";

  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isScheduleMenuOpen, setIsScheduleMenuOpen] = useState(
    initialScheduleMenuState
  );

  const auth = useSelector(authSelector);

  const { pathname } = useLocation();

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleScheduleMenuToggle = () => {
    const state = !isScheduleMenuOpen;
    setIsScheduleMenuOpen(state);
    localStorage.setItem("isScheduleMenuOpen", state);
  };

  const drawer = (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            backgroundColor: "#22272e",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              gap: "8px",
              width: "100%",
              padding: "20px",
            }}
          >
            <div className="w-full flex justify-start items-center font-semibold text-white mb-[20px]">
              {/* <FormTitle>MLAC</FormTitle> */}
            </div>

            <div className="w-full">
              <Link to="/timetable">
                {activeItem === "/timetable" ? (
                  <SidebarOptions
                    sx={{
                      background:
                        "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "white",
                        border: "none",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsCalendarRangeFill />
                      <p className="text-[18px]">Timetable</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsCalendar4Range />
                      <p className="text-[18px]">Timetable</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>

            <div className="w-full">
              <Link to="/calendar">
                {activeItem === "/calendar" ? (
                  <SidebarOptions
                    sx={{
                      background:
                        "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "white",
                        border: "none",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsCalendarDateFill />
                      <p className="text-[18px]">Calendar</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsCalendarDate />
                      <p className="text-[18px]">Calendar</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>

            <div className="w-full">
              <Link to="/statistics">
                {activeItem === "/statistics" ? (
                  <SidebarOptions
                    sx={{
                      background:
                        "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "white",
                        border: "none",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPieChartFill />
                      <p className="text-[18px]">Statistics</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPieChart />
                      <p className="text-[18px]">Statistics</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>

            <div onClick={handleScheduleMenuToggle} className="w-full">
              {isScheduleMenuOpen ? (
                <SidebarOptions>
                  <RouteCon>
                    <BsCalendarFill />
                    <p className="text-[18px]">Schedules</p>
                    <BsChevronUp className="text-[18px] ml-4" />
                  </RouteCon>
                </SidebarOptions>
              ) : (
                <SidebarOptions>
                  <RouteCon>
                    <BsCalendar4 />
                    <p className="text-[18px]">Schedules</p>
                    <BsChevronDown className="text-[18px] ml-4" />
                  </RouteCon>
                </SidebarOptions>
              )}
            </div>

            {isScheduleMenuOpen ? (
              <>
                <div className="w-[100%]">
                  <Link to="/schedules">
                    {activeItem === "/schedules" ? (
                      <SidebarOptions
                        sx={{
                          background:
                            "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                          borderRadius: "6px",
                          "&:hover": {
                            transform: "translateY(0px)",
                            color: "white",
                            border: "none",
                          },
                          "&:active": { transform: "translateY(0px)" },
                        }}
                      >
                        <RouteCon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <BsCalendarRangeFill />
                          <p className="text-[18px]">Permanent</p>
                        </RouteCon>
                      </SidebarOptions>
                    ) : (
                      <SidebarOptions>
                        <RouteCon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <BsCalendar4Range />
                          <p className="text-[18px]">Permanent</p>
                        </RouteCon>
                      </SidebarOptions>
                    )}
                  </Link>
                </div>
                <div className="w-[100%]">
                  <Link to="/temp-schedules">
                    {activeItem === "/temp-schedules" ? (
                      <SidebarOptions
                        sx={{
                          background:
                            "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                          borderRadius: "6px",
                          "&:hover": {
                            transform: "translateY(0px)",
                            color: "white",
                            border: "none",
                          },
                          "&:active": { transform: "translateY(0px)" },
                        }}
                      >
                        <RouteCon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <BsCalendarWeekFill />
                          <p className="text-[18px]">Temporary</p>
                        </RouteCon>
                      </SidebarOptions>
                    ) : (
                      <SidebarOptions>
                        <RouteCon
                          sx={{ display: "flex", justifyContent: "center" }}
                        >
                          <BsCalendar4Week />
                          <p className="text-[18px]">Temporary</p>
                        </RouteCon>
                      </SidebarOptions>
                    )}
                  </Link>
                </div>
                <div className="w-[100%]">
                  <Link to="/temp-solo">
                    {activeItem === "/temp-solo" ? (
                      <SidebarOptions
                        sx={{
                          background:
                            "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                          borderRadius: "6px",
                          "&:hover": {
                            transform: "translateY(0px)",
                            color: "white",
                            border: "none",
                          },
                          "&:active": { transform: "translateY(0px)" },
                        }}
                      >
                        <RouteCon sx={{ display: "flex", marginLeft: "24px" }}>
                          <BsCalendarEventFill />
                          <p className="text-[18px]">Solo</p>
                        </RouteCon>
                      </SidebarOptions>
                    ) : (
                      <SidebarOptions>
                        <RouteCon sx={{ display: "flex", marginLeft: "24px" }}>
                          <BsCalendar4Event />
                          <p className="text-[18px]">Solo</p>
                        </RouteCon>
                      </SidebarOptions>
                    )}
                  </Link>
                </div>
              </>
            ) : null}

            <div className="w-full">
              <Link to="/students">
                {activeItem === "/students" ? (
                  <SidebarOptions
                    sx={{
                      background:
                        "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                      borderRadius: "6px",
                      "&:hover": {
                        transform: "translateY(0px)",
                        color: "white",
                        border: "none",
                      },
                      "&:active": { transform: "translateY(0px)" },
                    }}
                  >
                    <RouteCon>
                      <BsPeopleFill />
                      <p className="text-[18px]">Students</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsPeople />
                      <p className="text-[18px]">Students</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>

            {auth?.userDetails?.role === "Administrator" ? (
              <div className="w-full">
                <Link to="/users">
                  {activeItem === "/users" ? (
                    <SidebarOptions
                      sx={{
                        background:
                          "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                        borderRadius: "6px",
                        "&:hover": {
                          transform: "translateY(0px)",
                          color: "white",
                          border: "none",
                        },
                        "&:active": { transform: "translateY(0px)" },
                      }}
                    >
                      <RouteCon>
                        <BsPersonFill />
                        <p className="text-[18px] ml-[-2px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <BsPerson />
                        <p className="text-[18px] ml-[-2px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
            ) : null}

            {auth?.userDetails?.role === "Administrator" ? (
              <div className="w-full">
                <Link to="/logs">
                  {activeItem === "/logs" ? (
                    <SidebarOptions
                      sx={{
                        background:
                          "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                        borderRadius: "6px",
                        "&:hover": {
                          transform: "translateY(0px)",
                          color: "white",
                          border: "none",
                        },
                        "&:active": { transform: "translateY(0px)" },
                      }}
                    >
                      <RouteCon>
                        <IoReceipt />
                        <p className="text-[18px]">Logs</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <IoReceiptOutline />
                        <p className="text-[18px]">Logs</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
            ) : null}

            {auth?.userDetails?.role === "Administrator" ? (
              <div className="w-full">
                <Link to="/history">
                  {activeItem === "/history" ? (
                    <SidebarOptions
                      sx={{
                        background:
                          "radial-gradient(100% 100% at 100% 0, #2d333b 0, #2d333b 100%)",
                        borderRadius: "6px",
                        "&:hover": {
                          transform: "translateY(0px)",
                          color: "white",
                          border: "none",
                        },
                        "&:active": { transform: "translateY(0px)" },
                      }}
                    >
                      <RouteCon>
                        <BsHourglassSplit />
                        <p className="text-[18px]">History</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <BsHourglass />
                        <p className="text-[18px]">History</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
            ) : null}
          </div>

          <div className="flex flex-col justify-center items-center w-[100%] p-4">
            <div className="group flex justify-start items-center gap-4 w-[100%] bg-[#2d333b] border-[1px] border-[#2d333b] p-4 rounded-tl-[8px] rounded-tr-[8px]">
              <img
                src={avatar}
                alt=""
                className="w-[50px] h-[50px] transition-transform duration-300 transform group-hover:rotate-[360deg]"
              />
              <div className="flex flex-col">
                <div className="text-[#ffffff] text-[18px] font-bold hover:underline cursor-pointer">
                  {auth.userDetails.userName}
                </div>
                <div className="text-[#c5d1de] text-[14px]">
                  {auth.userDetails.role?.slice(0, 5)}
                </div>
              </div>
            </div>
            <div
              onClick={logoutUtil}
              className="group cursor-pointer bg-gradient-to-br from-[#2d333b] to-[#2d333b] flex justify-start gap-2 items-center w-[100%] border-t-[1px] border-[#22272e] rounded-bl-[8px] rounded-br-[8px] px-4 py-2  hover:from-[#ff3131] hover:to-[#ff3131] text-[#ffffff] hover:border-[#ff3131]"
            >
              <span className="text-[16px]">Sign out</span>
              <AiOutlineLogout className="text-[18px] transition-transform duration-300 transform group-hover:translate-x-2" />
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar>
        <div
          sx={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              display: { sm: "none" },
              color: "white",
              padding: "18px 14px",
              margin: "0",
            }}
          >
            <CgMenuLeft className="text-[28px]" />
          </IconButton>
        </div>
      </AppNavBar>
      <Box
        component="nav"
        sx={{
          width: { sm: "240px" },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
              border: "none",
              overflowY: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "240px",
              border: "none",
              overflowY: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Sidebar.propTypes = {
  window: PropTypes.func,
};

export default Sidebar;
