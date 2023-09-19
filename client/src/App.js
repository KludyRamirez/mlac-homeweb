import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

import LoginPage from "./authPages/LoginPage/LoginPage";
import Dashboard from "./Dashboard/Dashboard";
import RegisterPage from "./authPages/RegisterPage/RegisterPage";
import AlertNotificationComponents from "./shared/components/AlertNotificationComponents";

//admin
import AllUser from "./Admin/AdminDashboard/FunctionPages/AllUser";

import "./App.css";
import UserUpdate from "./Admin/AdminDashboard/FunctionPages/UserUpdate";
import CreateSchedule from "./Admin/AdminDashboard/CreateSchedule/CreateSchedule";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/user">
            <AllUser />
          </Route>
          <Route exact path="/user/:id">
            <UserUpdate />
          </Route>
          <Route exact path="/create-sched">
            <CreateSchedule />
          </Route>
        </Switch>
      </Router>
      <AlertNotificationComponents />
    </>
  );
}

export default App;
