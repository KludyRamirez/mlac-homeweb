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
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import { AiOutlineLogout } from "react-icons/ai";
import { CgMenuLeft } from "react-icons/cg";
import {
  BsCalendar4,
  BsCalendar4Range,
  BsCalendarFill,
  BsCalendarRangeFill,
  BsGear,
  BsGearFill,
  BsHourglass,
  BsHourglassSplit,
  BsPeople,
  BsPeopleFill,
  BsPersonSquare,
  BsPieChart,
  BsPieChartFill,
} from "react-icons/bs";
import { logoutUtil } from "../../pages/auth/login/loginUtils/logoutUtil";

const AppNavBar = styled(AppBar)({
  background: "transparent",
  boxShadow: "none",
  width: { sm: "calc(100% - 40px)" },
  ml: { sm: "40px" },
  height: "80px",
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
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "6px",
    border: "1px solid rgba(0, 0, 0, 0.16)",
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
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

  const auth = useSelector(authSelector);

  const { pathname } = useLocation();

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
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
                      <BsCalendarRangeFill
                        className={
                          activeItem === "/timetable" ? "icon-active" : ""
                        }
                      />
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
                      <BsPieChartFill
                        className={
                          activeItem === "/statistics" ? "icon-active" : ""
                        }
                      />
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
            <div className="w-full">
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
                    <RouteCon>
                      <BsCalendarFill
                        className={
                          activeItem === "/schedules" ? "icon-active" : ""
                        }
                      />
                      <p className="text-[18px]">Schedules</p>
                    </RouteCon>
                  </SidebarOptions>
                ) : (
                  <SidebarOptions>
                    <RouteCon>
                      <BsCalendar4 />
                      <p className="text-[18px]">Schedules</p>
                    </RouteCon>
                  </SidebarOptions>
                )}
              </Link>
            </div>
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
                      <BsPeopleFill
                        className={
                          activeItem === "/student" ? "icon-active" : ""
                        }
                      />
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
                        <BsPersonSquare
                          className={
                            activeItem === "/users" ? "icon-active" : ""
                          }
                        />
                        <p className="text-[18px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  ) : (
                    <SidebarOptions>
                      <RouteCon>
                        <BsPersonSquare />
                        <p className="text-[18px]">Users</p>
                      </RouteCon>
                    </SidebarOptions>
                  )}
                </Link>
              </div>
            ) : null}

            {auth?.userDetails?.role === "Administrator" ? (
              <div className="w-full">
                <Link to="/notification">
                  {activeItem === "/notification" ? (
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
                        <BsHourglassSplit
                          className={
                            activeItem === "/notification" ? "icon-active" : ""
                          }
                        />
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
          <div className="flex flex-col justify-start items-start gap-[12px] w-full p-[20px]">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              {auth?.userDetails?.role === "Administrator" ? (
                <div className="w-full">
                  <Link to="/settings">
                    {activeItem === "/settings" ? (
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
                          <BsGearFill
                            className={
                              activeItem === "/settings" ? "icon-active" : ""
                            }
                          />
                          <p className="text-[18px]">Settings</p>
                        </RouteCon>
                      </SidebarOptions>
                    ) : (
                      <SidebarOptions>
                        <RouteCon>
                          <BsGear />
                          <p className="text-[18px]">Settings</p>
                        </RouteCon>
                      </SidebarOptions>
                    )}
                  </Link>
                </div>
              ) : null}
            </div>
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div className="w-full">
                <SidebarOptions
                  onClick={logoutUtil}
                  sx={{
                    background: "rgba(0, 0, 0, 0.04)",
                    borderRadius: "6px",
                    boxShadow: "none",
                    "&:hover": {
                      transform: "translateY(-1px)",
                      background: "#FF4433",
                      color: "white",
                      border: "none",
                    },
                    "&:active": { transform: "translateY(1px)" },
                  }}
                >
                  <RouteCon>
                    <AiOutlineLogout />
                    <p className="text-[18px]">Sign Out</p>
                  </RouteCon>
                </SidebarOptions>
              </div>
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
        <div className="flex h-[100%] justify-between items-center">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              padding: "0",
            }}
          >
            <IconButton
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: "white",
              }}
            >
              <CgMenuLeft />
            </IconButton>
          </Toolbar>
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
