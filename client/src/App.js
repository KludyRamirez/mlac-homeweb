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
import RegisterPage from "./authPages/RegisterPage/RegisterPage";

//admin

import "./App.css";
import UserUpdate from "./Admin/AdminDashboard/UserPages/UserUpdate";
import CreateSchedule from "./Admin/AdminDashboard/CreateSchedule/CreateSchedule";
import TempCreateSchedule from "./Admin/AdminDashboard/CreateSchedule/TempCreateSchedule";
import TempSoloCreateSched from "./Admin/AdminDashboard/CreateSchedule/TempSoloCreateSched";
import ParentSortSchedule from "./Admin/AdminDashboard/AllSchedule/ParentSortSchedule";
import AllTimetable from "./Admin/AdminDashboard/TimeTableHome/AllTimetable";
import Logs from "./Admin/AdminDashboard/Logs/Logs";
import EditSchedule from "./Admin/AdminDashboard/UpdateSchedule/EditSchedule";
import WaitList from "./Admin/AdminDashboard/Waitlist/WaitList";
import CreateProgRequest from "./Admin/AdminDashboard/ProgRequest/CreateProgRequest";
import AccountSettings from "./Admin/AdminDashboard/AccountSettings/AccountSettings";
import AlertNotification from "./shared/components/AlertNotification";
import Dashboard from "./Dashboard/Dashboard";
import PasswordReset from "./Admin/AdminDashboard/AccountSettings/PasswordReset";

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
          <Route exact path="/chat">
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
            <EditSchedule />
          </Route>
          <Route exact path="/temp-schedule">
            <TempCreateSchedule />
          </Route>
          <Route exact path="/temp-soloschedule">
            <TempSoloCreateSched />
          </Route>
          <Route exact path="/timetable">
            <AllTimetable />
          </Route>
          <Route exact path="/children">
            <ParentSortSchedule />
          </Route>
          <Route exact path="/waitlist">
            <WaitList />
          </Route>
          <Route exact path="/logs">
            <Logs />
          </Route>
          <Route exact path="/report">
            <CreateProgRequest />
          </Route>
          <Route exact path="/account">
            <AccountSettings />
          </Route>
          <Route exact path="/reset-password">
            <PasswordReset />
          </Route>
        </Switch>
      </Router>
      <AlertNotification />
    </>
  );
}

export default App;
