import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createSelector } from "reselect";
import toast, { Toaster } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import {
  checkIndicator,
  setStoreNotifications,
} from "./store/actions/NotificationActions";

import Students from "./pages/students/studentsBase/Students";
import Login from "./pages/auth/login/loginBase/Login";
import Register from "./pages/auth/register/registerBase/Register";
import Statistics from "./pages/statistics/statisticsBase/Statistics";
import History from "./pages/history/historyBase/History";
import StudentProfile from "./pages/studentsProfile/studentsProfileBase/StudentProfile";
import Settings from "./pages/settings/settingsBase/Settings";
import AccountSettings from "./pages/accountSettings/accountSettingsBase/AccountSettings";
import SecureRoles from "./externalUtils/SecureRoles";
import Error403 from "./externalComponents/Errors/Error403";
import Forgot from "./pages/auth/forgot/forgotBase/Forgot";
import Reset from "./pages/auth/reset/resetBase/Reset";
import Loading from "./externalUtils/Loading";
import PersistLogin from "./externalUtils/PersistLogin";

import { default as axios } from "./api";
import Schedules from "./pages/schedules/schedulesBase/Schedules";
import TempSchedules from "./pages/tempSchedules/tempSchedulesBase/TempSchedules";
import TempSolo from "./pages/tempSolo/tempSoloBase/TempSolo";
import Logs from "./pages/logs/logsBase/Logs";

export const getNotification = async (auth) =>
  await axios.get(`/api/notification`, {
    withCredentials: true,
    headers: {
      Authorization: `Bearer ${auth?.userDetails?.token}`,
    },
  });

// Selectors
const selectAuth = (state) => state.auth;
const authSelector = createSelector([selectAuth], (auth) => auth);

const AppRoutes = ({ auth, setLoading, toast, axios }) => {
  const [notif, setNotif] = useState([]);

  const dispatch = useDispatch();
  const indicator = useSelector((state) => state.notifications.indicator);

  const getNotifications = async () => {
    try {
      getNotification(auth).then((c) => {
        const notifications = c?.data?.notifications;
        setNotif(notifications);
        dispatch(checkIndicator(notifications));
      });
    } catch (err) {
      console.error("Error fetching notifications!", err);
    }
  };

  const getNotificationsBell = async () => {
    try {
      getNotification(auth).then((c) => {
        const notifications = c?.data?.notifications;
        setNotif(notifications);
      });
    } catch (err) {
      console.error("Error fetching notifications!", err);
    }
  };

  useEffect(() => {
    console.log(indicator);
  }, [indicator]);

  return (
    <Routes>
      <Route
        path="*"
        element={
          auth?.userDetails?.token ? (
            <Statistics auth={auth} setLoading={setLoading} toast={toast} />
          ) : (
            <Login setLoading={setLoading} toast={toast} />
          )
        }
      />
      <Route path="/error" element={<Error403 />} />
      <Route
        path="/forgot"
        element={<Forgot setLoading={setLoading} toast={toast} axios={axios} />}
      />
      <Route
        path="/reset-password/:id/:token"
        element={<Reset setLoading={setLoading} toast={toast} axios={axios} />}
      />

      {/* Persist Login Routes */}
      <Route element={<PersistLogin auth={auth} />}>
        <Route
          path="/"
          element={
            auth?.userDetails?.token ? (
              <Statistics auth={auth} setLoading={setLoading} toast={toast} />
            ) : (
              <Login setLoading={setLoading} toast={toast} />
            )
          }
        />

        <Route
          path="/account"
          element={
            <AccountSettings
              auth={auth}
              setLoading={setLoading}
              toast={toast}
              axios={axios}
              allowedRoles={["Administrator", "Parent", "Student"]}
            />
          }
        />

        {/* Admin and Parent Routes */}
        <Route
          element={
            <SecureRoles
              auth={auth}
              allowedRoles={["Administrator", "Parent"]}
            />
          }
        >
          <Route
            path="/schedules"
            element={
              <Schedules
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
                notif={notif}
                getNotifications={getNotifications}
                indicator={indicator}
              />
            }
          />
          <Route
            path="/temp-schedules"
            element={
              <TempSchedules
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
          <Route
            path="/temp-solo"
            element={
              <TempSolo
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
          <Route
            path="/students"
            element={
              <Students
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
          <Route
            path="/profile/:id"
            element={
              <StudentProfile
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
          <Route
            path="/statistics"
            element={
              <Statistics
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator", "Parent"]}
              />
            }
          />
          <Route
            path="/chats"
            element={
              <Statistics
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator", "Parent"]}
              />
            }
          />
          <Route
            path="/logs"
            element={
              <Logs
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
        </Route>

        {/* Admin Only Routes */}
        <Route
          element={<SecureRoles auth={auth} allowedRoles={["Administrator"]} />}
        >
          <Route
            path="/users"
            element={
              <Register
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
          <Route
            path="/settings"
            element={
              <Settings
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
          <Route
            path="/history"
            element={
              <History
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />

          <Route
            path="/logs"
            element={
              <Register
                auth={auth}
                setLoading={setLoading}
                toast={toast}
                axios={axios}
                allowedRoles={["Administrator"]}
              />
            }
          />
        </Route>
      </Route>
    </Routes>
  );
};

function App() {
  const [loading, setLoading] = useState(false);
  const auth = useSelector(authSelector);

  if (!auth) {
    return <Loading />;
  }

  return (
    <>
      <Toaster
        position="bottom-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            fontWeight: "600",
            textAlign: "center",
            border: "1px solid #606060",
            backgroundColor: "white",
          },
        }}
      />
      <Router>
        {loading ? (
          <Loading />
        ) : (
          <AppRoutes
            auth={auth}
            setLoading={setLoading}
            toast={toast}
            axios={axios}
          />
        )}
      </Router>
    </>
  );
}

export default App;
