import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { io } from "socket.io-client";

import LoginPage from "./authPages/LoginPage/LoginPage";
import Dashboard from "./Dashboard/Dashboard";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import AlertNotificationComponents from "./shared/components/AlertNotificationComponents";

//admin

import "./App.css";
import UserUpdate from "./Admin/AdminDashboard/FunctionPages/UserUpdate";
import CreateSchedule from "./Admin/AdminDashboard/CreateSchedule/CreateSchedule";
import UpdateSchedule from "./Admin/AdminDashboard/UpdateSchedule/UpdateSchedule";
import TempCreateSchedule from "./Admin/AdminDashboard/CreateSchedule/TempCreateSchedule";
import TempSoloCreateSched from "./Admin/AdminDashboard/CreateSchedule/TempSoloCreateSched";
import ParentSortSchedule from "./Admin/AdminDashboard/AllSchedule/ParentSortSchedule";
import AllTimetable from "./Admin/AdminDashboard/TimeTableHome/AllTimetable";

function App() {
  const [userNotif, setUserNotif] = useState("");
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    socket?.emit("newUser", userNotif);
    console.log(userNotif);
  }, [socket, userNotif]);

  return (
    <>
      <Router>
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <LoginPage setUserNotif={setUserNotif} />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard socket={socket} />
          </Route>
          <Route exact path="/user">
            <RegisterPage socket={socket} />
          </Route>
          <Route exact path="/user/:id">
            <UserUpdate socket={socket} />
          </Route>
          <Route exact path="/schedule">
            <CreateSchedule socket={socket} />
          </Route>
          <Route exact path="/schedule/:id">
            <UpdateSchedule socket={socket} />
          </Route>
          <Route exact path="/temp-schedule">
            <TempCreateSchedule socket={socket} />
          </Route>
          <Route exact path="/temp-schedule-solo">
            <TempSoloCreateSched socket={socket} />
          </Route>
          <Route exact path="/timetable">
            <AllTimetable userNotif={userNotif} socket={socket} />
          </Route>
          <Route exact path="/children">
            <ParentSortSchedule socket={socket} />
          </Route>
        </Switch>
      </Router>
      <AlertNotificationComponents />
    </>
  );
}

export default App;
