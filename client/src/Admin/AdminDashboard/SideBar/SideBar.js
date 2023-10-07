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

const HorizontalNavBar = styled("div")({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  color: "#007bff",
  width: "100%",
});

const AppNavBar = styled(AppBar)({
  background: "white",
  boxShadow: "none",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  width: { sm: `calc(100% - ${drawerWidth}px)` },
  ml: { sm: `${drawerWidth}px` },
});

const IconContainer = styled("div")(({ theme }) => ({
  backgroundImage:
    "radial-gradient(100% 100% at 100% 0, #FFFFFF, #FFFFFF  100%)",
  border: 0,
  borderRadius: "20px",
  padding: "10px",
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
      <Toolbar />
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
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
              style={{ textDecoration: "none", color: "#5A5A5A" }}
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
        <List>
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
                      "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
                  }}
                >
                  <LogoutOutlined sx={{ color: "white" }} fontSize="small" />
                </div>
              </ListItemIcon>
              <div
                style={{
                  color: "#007bff",
                  fontWeight: "400",
                  fontSize: "14px",
                }}
              >
                Sign Out
              </div>
            </ListItemButton>
          </ListItem>
        </List>
      </div>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppNavBar position="fixed">
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" }, color: "#007bff" }}
          >
            <MenuIcon />
          </IconButton>
          <HorizontalNavBar>
            <IconContainer>
              <NotificationsActiveOutlinedIcon
                fontSize="small"
                sx={{ color: "#007bff" }}
              />
            </IconContainer>
          </HorizontalNavBar>
        </Toolbar>
      </AppNavBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
