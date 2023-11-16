import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch, useSelector } from "react-redux";
import { createSelector } from "reselect";
import FriendSidebar from "../../../Dashboard/FriendSidebar/FriendSidebar";

import { GoComment, GoSquirrel } from "react-icons/go";

import {
  SlUserFollow,
  SlEvent,
  SlGrid,
  SlChart,
  SlFolderAlt,
  SlUserFemale,
} from "react-icons/sl";

import { CgMenuLeft } from "react-icons/cg";
import { BsDice3 } from "react-icons/bs";

const drawerWidth = 240;

const AppNavBar = styled(AppBar)({
  background: "transparent",

  boxShadow: "none",
  width: { sm: "calc(100% - 240px)" },
  ml: { sm: "240px" },
  height: "36px",
  zIndex: "1",
});

const FatBar = styled("div")({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  width: "68%",
  background: "rgba(7, 187, 255, 0.1)",
  "@media (max-width: 767px)": {
    borderRight: "none",
  },
});

const RouteCon = styled("div")({
  margin: "6px 0",
  display: "flex",
  alignItems: "center",
  borderRadius: "8px",
  cursor: "pointer",
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  willChange: "box-shadow, transform",
  "&:focus": {
    boxShadow: "rgba(0, 123, 255, 0.1) 0px 4px 12px",
  },
  "&:hover": {
    boxShadow: "rgba(0, 123, 255, 0.1) 0px 4px 12px",
    transform: "translateY(-3px)",
  },
  "&:active": {
    boxShadow: "rgba(0, 123, 255, 0.1) 0px 4px 12px",
    transform: "translateY(3px)",
  },
});

const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [showOtherOptions, setShowOtherOptions] = useState(false);

  const auth = useSelector(authSelector);

  const toggleDiv = () => {
    setShowOtherOptions(!showOtherOptions);
  };

  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    setActiveItem(pathname);
  }, [pathname]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  const drawer = (
    <>
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
            width: "36%",
            background: "white",
            gap: "12px",
            paddingRight: "1px",
          }}
        >
          <Toolbar>
            <GoSquirrel
              style={{ fontSize: "30px", color: "green", padding: "31px 0" }}
            />
          </Toolbar>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/timetable">
              {activeItem === "/timetable" ? (
                <RouteCon>
                  <SlGrid
                    className={activeItem === "/timetable" ? "icon-active" : ""}
                    style={{ fontSize: "18px" }}
                  />
                </RouteCon>
              ) : (
                <RouteCon>
                  <SlGrid
                    style={{
                      color: "#122c8e",
                      padding: "10px",
                      fontSize: "18px",
                    }}
                  />
                </RouteCon>
              )}
            </Link>
          </div>
          <div
            style={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/children">
              {activeItem === "/children" ? (
                <RouteCon>
                  <SlUserFemale
                    className={activeItem === "/children" ? "icon-active" : ""}
                    style={{ fontSize: "18px" }}
                  />
                </RouteCon>
              ) : (
                <RouteCon>
                  <SlUserFemale
                    style={{
                      color: "#122c8e",
                      padding: "10px",
                      fontSize: "18px",
                    }}
                  />
                </RouteCon>
              )}
            </Link>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/chat">
              {activeItem === "/chat" ? (
                <RouteCon>
                  <GoComment
                    className={activeItem === "/chat" ? "icon-active" : ""}
                    style={{
                      fontSize: "18px",
                    }}
                  />
                </RouteCon>
              ) : (
                <RouteCon>
                  <GoComment
                    style={{
                      color: "#122c8e",
                      padding: "10px",
                      fontSize: "18px",
                    }}
                  />
                </RouteCon>
              )}
            </Link>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Link to="/logs">
              {activeItem === "/logs" ? (
                <RouteCon>
                  <SlChart
                    className={activeItem === "/logs" ? "icon-active" : ""}
                    style={{ fontSize: "18px" }}
                  />
                </RouteCon>
              ) : (
                <RouteCon>
                  <SlChart
                    style={{
                      color: "#122c8e",
                      padding: "10px",
                      fontSize: "18px",
                    }}
                  />
                </RouteCon>
              )}
            </Link>
          </div>
          {auth && auth.userDetails.role === "Administrator" && (
            <>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    padding: "10px",
                    color: "#122c8e",
                    fontWeight: "600",
                    letterSpacing: "0.4px",
                  }}
                >
                  Admin
                </span>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/user">
                  {activeItem === "/user" ? (
                    <RouteCon>
                      <SlUserFollow
                        className={activeItem === "/user" ? "icon-active" : ""}
                        style={{ fontSize: "18px" }}
                      />
                    </RouteCon>
                  ) : (
                    <RouteCon>
                      <SlUserFollow
                        style={{
                          color: "#122c8e",
                          padding: "10px",
                          fontSize: "18px",
                        }}
                      />
                    </RouteCon>
                  )}
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/schedule">
                  {activeItem === "/schedule" ? (
                    <RouteCon>
                      <SlEvent
                        className={
                          activeItem === "/schedule" ? "icon-active" : ""
                        }
                        style={{ fontSize: "18px" }}
                      />
                    </RouteCon>
                  ) : (
                    <RouteCon>
                      <SlEvent
                        style={{
                          color: "#122c8e",
                          padding: "10px",
                          fontSize: "18px",
                        }}
                      />
                    </RouteCon>
                  )}
                </Link>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Link to="/waitlist">
                  {activeItem === "/waitlist" ? (
                    <RouteCon>
                      <SlFolderAlt
                        className={
                          activeItem === "/waitlist" ? "icon-active" : ""
                        }
                        style={{ fontSize: "18px" }}
                      />
                    </RouteCon>
                  ) : (
                    <RouteCon>
                      <SlFolderAlt
                        style={{
                          color: "#122c8e",
                          padding: "10px",
                          fontSize: "18px",
                        }}
                      />
                    </RouteCon>
                  )}
                </Link>
              </div>
            </>
          )}
        </div>
        <FatBar>{/* <FriendSidebar /> */}</FatBar>
      </div>
    </>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar>
        <Toolbar
          sx={{
            minHeight: "0px",
            display: "flex",
            justifyContent: "space-between",
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
      </AppNavBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
              boxShadow:
                "rgba(7,187,255, 0.06) 0px 1px 2px 0px, rgba(7,187,255, 0.06) 0px 1px 2px 0px",
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
              width: drawerWidth,
              border: "none",
              boxShadow:
                "rgba(7,187,255, 0.06) 0px 1px 2px 0px, rgba(7,187,255, 0.06) 0px 1px 2px 0px",
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

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export { ResponsiveDrawer };
