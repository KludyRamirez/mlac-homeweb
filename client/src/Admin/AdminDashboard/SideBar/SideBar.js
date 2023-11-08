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
import { useDispatch } from "react-redux";
import FriendSidebar from "../../../Dashboard/FriendSidebar/FriendSidebar";
import mlacLogo from "../../../images/mlac.svg";

import { GoComment, GoSquirrel } from "react-icons/go";

import { SlUserFollow, SlEvent, SlGrid, SlChart } from "react-icons/sl";

import { CgMenuLeft } from "react-icons/cg";

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
  width: "74%",
  background: "#FEFEFE",
  "@media (max-width: 767px)": {
    borderRight: "none",
  },
});

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");

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
    <div>
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
            width: "30%",
            background: "#007bff",
            gap: "12px",
          }}
        >
          <Toolbar>
            <GoSquirrel
              style={{ fontSize: "30px", color: "white", padding: "31px 0" }}
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
                <SlGrid
                  className={activeItem === "/timetable" ? "icon-active" : ""}
                  style={{ fontSize: "18px" }}
                />
              ) : (
                <SlGrid
                  style={{
                    color: "white",
                    padding: "10px",
                    fontSize: "18px",
                  }}
                />
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
                <SlChart
                  className={activeItem === "/children" ? "icon-active" : ""}
                  style={{ fontSize: "18px" }}
                />
              ) : (
                <SlChart
                  style={{
                    color: "white",
                    padding: "10px",
                    fontSize: "18px",
                  }}
                />
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
                <GoComment
                  className={activeItem === "/chat" ? "icon-active" : ""}
                  style={{
                    fontSize: "18px",

                    color: "white",
                  }}
                />
              ) : (
                <GoComment
                  style={{
                    color: "white",
                    padding: "10px",
                    fontSize: "18px",
                  }}
                />
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
            <Link to="/user">
              {activeItem === "/user" ? (
                <SlUserFollow
                  className={activeItem === "/user" ? "icon-active" : ""}
                  style={{ fontSize: "18px" }}
                />
              ) : (
                <SlUserFollow
                  style={{
                    color: "white",
                    padding: "10px",
                    fontSize: "18px",
                  }}
                />
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
                <SlEvent
                  className={activeItem === "/schedule" ? "icon-active" : ""}
                  style={{ fontSize: "18px" }}
                />
              ) : (
                <SlEvent
                  style={{
                    color: "white",
                    padding: "10px",
                    fontSize: "18px",
                  }}
                />
              )}
            </Link>
          </div>
        </div>
        <FatBar>{/* <FriendSidebar /> */}</FatBar>
      </div>
    </div>
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
