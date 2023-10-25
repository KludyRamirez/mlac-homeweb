import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import GroupsIcon from "@mui/icons-material/Groups";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import LocalLibraryOutlinedIcon from "@mui/icons-material/LocalLibraryOutlined";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import ForumRoundedIcon from "@mui/icons-material/ForumRounded";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import BubbleChartIcon from "@mui/icons-material/BubbleChart";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";

import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { useDispatch } from "react-redux";

import { socket } from "../../../authPages/LoginPage/LoginPage";

const drawerWidth = 240;

const IconContainer = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.4)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  borderRight: "1px solid #007bff",
  borderLeft: "1px solid #007bff",
  borderBottom: "1px solid #007bff",
  borderRadius: "20px",
  padding: "6px",
  boxSizing: "border-box",
  cursor: "pointer",
  lineHeight: 1,
  listStyle: "none",
  overflow: "hidden",
  position: "relative",
  textAlign: "left",
  textDecoration: "none",
  transition: "box-shadow .15s, transform .15s",
  userSelect: "none",
  WebkitUserSelect: "none",
  touchAction: "manipulation",
  whiteSpace: "nowrap",
  willChange: "box-shadow, transform",
  fontSize: "14px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "600",
  "&:focus": {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
  },
  "&:hover": {
    boxShadow:
      "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
    transform: "translateY(-2px)",
  },
  "&:active": {
    boxShadow: `rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px`,
    transform: "translateY(2px)",
  },
}));

const HorizontalNavBar = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "#007bff",
  width: "100%",
});

const AppNavBar = styled(AppBar)({
  background: "#007bff",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
  maxHeight: "40px",
});

function ResponsiveDrawer(props, { socket }) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [notifications, setNotifications] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  const { pathname } = useLocation();

  useEffect(() => {
    socket?.on("getNotification", (data) => {
      setNotifications((prev) => [...prev, data]);
    });
  }, [socket]);

  console.log("-------->", notifications);

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
            width: "25%",
            background: "#007bff",
            gap: "14px",
          }}
        >
          <Toolbar />
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
                  sx={{ fontSize: "20px", fontWeight: "100" }}
                />
              ) : (
                <DashboardOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "6px",
                    fontSize: "20px",
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
                  sx={{ fontSize: "20px", fontWeight: "300" }}
                />
              ) : (
                <GroupsOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "6px",
                    fontSize: "20px",
                    fontWeight: "300",
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
                  sx={{ fontSize: "20px", fontWeight: "300" }}
                />
              ) : (
                <LocalLibraryOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "6px",
                    fontSize: "20px",
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
                  sx={{ fontSize: "20px", fontWeight: "300" }}
                />
              ) : (
                <ForumOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "6px",
                    fontSize: "20px",
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
                <CalendarMonthOutlinedIcon
                  className={activeItem === "/schedule" ? "icon-active" : ""}
                  sx={{ fontSize: "20px", fontWeight: "300" }}
                />
              ) : (
                <CalendarMonthOutlinedIcon
                  sx={{
                    color: "white",
                    padding: "6px",
                    fontSize: "20px",
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
            width: "75%",
          }}
        ></div>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar position="fixed">
        <Toolbar sx={{ minHeight: "0px" }}>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "white" }}
          >
            <MenuIcon />
          </IconButton>
          <HorizontalNavBar>
            <IconContainer>
              <NotificationsNoneRoundedIcon
                fontSize="small"
                sx={{ color: "#FAFAFA" }}
              />
            </IconContainer>
          </HorizontalNavBar>
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
                "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
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
                "rgba(0, 0, 0, 0.06) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
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

export default ResponsiveDrawer;
