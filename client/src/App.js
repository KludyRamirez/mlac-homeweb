import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
import Timetable from "./Admin/AdminDashboard/TimeTableHome/Timetable";
import TempSoloCreateSched from "./Admin/AdminDashboard/CreateSchedule/TempSoloCreateSched";

function App() {
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
            <LoginPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/user">
            <RegisterPage />
          </Route>
          <Route exact path="/user/:id">
            <UserUpdate />
          </Route>
          <Route exact path="/schedule">
            <CreateSchedule />
          </Route>
          <Route exact path="/schedule/:id">
            <UpdateSchedule />
          </Route>
          <Route exact path="/temp-schedule">
            <TempCreateSchedule />
          </Route>
          <Route exact path="/temp-schedule-solo">
            <TempSoloCreateSched />
          </Route>
          <Route exact path="/timetable">
            <Timetable />
          </Route>
        </Switch>
      </Router>
      <AlertNotificationComponents />
    </>
  );
}

export default App;
