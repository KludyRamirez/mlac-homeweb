import * as React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import HomeIcon from "@mui/icons-material/Home";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const drawerWidth = 240;

const AppNavBar = styled(AppBar)({
  background: "#007bff",
  boxShadow:
    "rgba(0, 0, 0, 0.1) 0px 1px 2px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px",
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
  height: "40px",
});

const IconContainer = styled("div")(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.1)",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)",
  border: 0,
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

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

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
      {/* <Toolbar /> */}
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          // border: "1px solid black",
        }}
      >
        <List>
          {[
            {
              text: (
                <div
                  style={{
                    color: "#007bff",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Home
                </div>
              ),
              icon: <HomeIcon sx={{ color: "white" }} fontSize="small" />,
              path: "/timetable",
            },
            {
              text: (
                <div
                  style={{
                    color: "#007bff",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Schedule
                </div>
              ),
              icon: <EventNoteIcon sx={{ color: "white" }} fontSize="small" />,
              path: "/schedule",
            },
            {
              text: (
                <div
                  style={{
                    color: "#007bff",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  User
                </div>
              ),
              icon: (
                <AccountCircleIcon sx={{ color: "white" }} fontSize="small" />
              ),
              path: "/user",
            },
            {
              text: (
                <div
                  style={{
                    color: "#007bff",
                    fontWeight: "400",
                    fontSize: "14px",
                  }}
                >
                  Logs
                </div>
              ),
              icon: (
                <StickyNote2Icon sx={{ color: "white" }} fontSize="small" />
              ),
              path: "/logs",
            },
            // Add more items with icons and paths here
          ].map((item, index) => (
            <Link
              to={item.path}
              style={{
                textDecoration: "none",
                color: "#5A5A5A",
              }}
            >
              <ListItem key={item.text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <div
                      style={{
                        borderRadius: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "6px",
                        boxShadow:
                          "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 0px 0",
                        backgroundImage:
                          "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
                      }}
                    >
                      {item.icon}
                    </div>
                  </ListItemIcon>
                  <ListItemText>{item.text}</ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
        {/* <List>
          <ListItem onClick={handleLogout} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <div
                  style={{
                    borderRadius: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "6px",
                    boxShadow:
                      "rgba(45, 35, 66, .4) 0 2px 4px, rgba(45, 35, 66, .3) 0 7px 13px -3px, rgba(58, 65, 111, .5) 0 0px 0",
                    backgroundImage:
                      "radial-gradient(100% 100% at 100% 0, #f9f9f9 0, gray 100%)",
                  }}
                >
                  <LogoutOutlined sx={{ color: "white" }} fontSize="small" />
                </div>
              </ListItemIcon>
              <div
                style={{
                  color: "#FF3131",
                  fontWeight: "600",
                  fontSize: "14px",
                }}
              >
                Sign Out
              </div>
            </ListItemButton>
          </ListItem>
        </List> */}
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar position="fixed">
        <div
          sx={{
            border: "1px solid black",
            position: "relative",
            display: "flex",
          }}
        >
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#007bff" }}
          >
            <MenuIcon />
          </IconButton>
          {/* <HorizontalNavBar>
            <IconContainer>
              <NotificationsActiveOutlinedIcon
                fontSize="small"
                sx={{ color: "#007bff" }}
              />
            </IconContainer>
          </HorizontalNavBar> */}
        </div>
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
