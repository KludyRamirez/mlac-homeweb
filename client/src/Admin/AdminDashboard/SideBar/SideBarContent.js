import React, { useState } from "react";
import { styled } from "@mui/system";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import Face4OutlinedIcon from "@mui/icons-material/Face4Outlined";
import SickOutlinedIcon from "@mui/icons-material/SickOutlined";
import AutoStoriesOutlinedIcon from "@mui/icons-material/AutoStoriesOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import logo from "../../../images/logoarrow.png";
// import { connect } from "react-redux";
// import { getActions } from "../../../store/actions/authActions";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";

const MainContainer = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "10px 0px 20px 0px",
});

const IconContainer = styled("div")(({ isActive }) => ({
  width: "33px",
  height: "33px",
  borderRadius: "30px",
  backgroundImage: isActive
    ? "#ffffff"
    : "radial-gradient(100% 100% at 100% 0, #5adaff 0, #5468ff 100%)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: isActive ? "#007bff" : "#ffffff",
  cursor: "pointer",
  border: isActive ? "2px solid #007bff" : "2px solid white",
  boxShadow: "rgba(0, 123, 255, 0.25) 0px 25px 50px -12px",
}));

const Flexer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "5px",
});

const Gapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const LogoContainer = styled("div")({
  width: "90px",
  height: "90px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const Logo = styled("img")({
  width: "100%",
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const SideBarContent = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const links = [
    { path: "/timetable", icon: <HomeOutlinedIcon fontSize="small" /> },
    { path: "/user", icon: <Face4OutlinedIcon fontSize="small" /> },
    { path: "/absentreq", icon: <SickOutlinedIcon fontSize="small" /> },
    {
      path: "/schedule",
      icon: <AutoStoriesOutlinedIcon fontSize="small" />,
    },
    {
      path: "/temp-schedule",
      icon: <EventNoteOutlinedIcon fontSize="small" />,
    },
    { path: "/absentlogs", icon: <EditCalendarIcon fontSize="small" /> },
    { path: "/admin/logs", icon: <AssessmentOutlinedIcon fontSize="small" /> },
  ];

  const [activeLink, setActiveLink] = useState("");

  const handleLinkClick = (path) => {
    setActiveLink(path);
    history.push(path);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    history.push("/login");
  };

  return (
    <MainContainer>
      <Flexer>
        <LogoContainer>
          <Logo src={logo} />
        </LogoContainer>
        <Gapper>
          {links.map((link) => (
            <IconContainer
              key={link.path}
              isActive={activeLink === link.path}
              onClick={() => handleLinkClick(link.path)}
            >
              {link.icon}
            </IconContainer>
          ))}
        </Gapper>
      </Flexer>

      <IconContainer onClick={handleLogout}>
        <LogoutOutlinedIcon fontSize="small" />
      </IconContainer>
    </MainContainer>
  );
};

export default SideBarContent;
