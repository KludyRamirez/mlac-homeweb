import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";

import { CgMenuLeft } from "react-icons/cg";
import Toolbar from "@mui/material/Toolbar";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const AppNavBar = styled(AppBar)({
  background: "#007bff",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  width: { sm: "calc(100% - 240px)" },
  ml: { sm: "240px" },
  height: "36px",
  zIndex: "1",
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
            width: "22%",
            background: "#007bff",
            gap: "12px",
          }}
        >
          <Toolbar>
            <BubbleChartIcon sx={{ color: "#07bbff" }} />
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
                <DashboardOutlinedIcon
                  className={activeItem === "/timetable" ? "icon-active" : ""}
                  sx={{ fontSize: "18px", fontWeight: "100" }}
                />
              ) : (
                <DashboardOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "8px",
                    fontSize: "18px",
                    fontWeight: "100",
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
                <GroupsIcon
                  className={activeItem === "/user" ? "icon-active" : ""}
                  sx={{ fontSize: "18px", fontWeight: "100" }}
                />
              ) : (
                <GroupsOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "8px",
                    fontSize: "18px",
                    fontWeight: "100",
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
                <LocalLibraryOutlinedIcon
                  className={activeItem === "/children" ? "icon-active" : ""}
                  sx={{ fontSize: "18px", fontWeight: "100" }}
                />
              ) : (
                <LocalLibraryOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "8px",
                    fontSize: "18px",
                    fontWeight: "100",
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
                <ForumOutlinedIcon
                  className={activeItem === "/chat" ? "icon-active" : ""}
                  sx={{ fontSize: "18px", fontWeight: "300" }}
                />
              ) : (
                <ForumOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "8px",
                    fontSize: "18px",
                    fontWeight: "100",
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
                <EventNoteOutlinedIcon
                  className={activeItem === "/schedule" ? "icon-active" : ""}
                  sx={{ fontSize: "18px", fontWeight: "300" }}
                />
              ) : (
                <EventNoteOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "8px",
                    fontSize: "18px",
                    fontWeight: "300",
                  }}
                />
              )}
            </Link>
          </div>
        </div>
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "78%",
            background: "rgba(7, 187, 255, 0.06)",
          }}
        ></div>
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
