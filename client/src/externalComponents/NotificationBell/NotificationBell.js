import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaBell, FaRegBell } from "react-icons/fa6";
import {
  checkIndicator,
  setStoreNotifications,
} from "../../store/actions/NotificationActions";
import { getNotification } from "../../App";

function NotificationBell({ notif, auth }) {
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const notifRef = useRef(null);

  const indicator = useSelector((state) => state.notifications.indicator);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setIsNotifOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleGetRealTimeNotifClick = async () => {
    fetchNotifications();
    setIsNotifOpen(true);
    dispatch(setStoreNotifications(notif));
    dispatch(checkIndicator([]));
  };

  const fetchNotifications = async () => {
    try {
      const res = await getNotification(auth);
      setNotifications(res?.data?.notifications);
    } catch (error) {
      console.error("Error fetching notifications!", error);
    }
  };

  const latestNotif = notifications[notifications.length - 1];
  const now = new Date();
  const createdAt = new Date(latestNotif?.createdAt);
  const elapsedTime = Math?.floor((now - createdAt) / 60000);

  const pastNotifs = notifications?.slice(0, -1);

  return (
    <>
      <div className="relative">
        {isNotifOpen && (
          <>
            <div className="absolute top-[46px] left-[-9px] w-[40px] h-[40px] bg-[#c5d1de] transform rotate-[45deg]"></div>
            <div
              ref={notifRef}
              className={`flex flex-col p-6 gap-3 absolute top-[50px] left-[-40px] w-[380px] ${
                notif && notif?.length >= 4 ? "h-[582px]" : "h-[fit-content]"
              } rounded-[10px] bg-gradient-to-t from-[#ffffff] to-[#c5d1de]`}
            >
              <div className="text-[26px] text-[#2d333b] font-bold">
                Notifications
              </div>
              <div className="flex justify-start items-center gap-2">
                <div className="py-2 px-4 w-[fit-content] border-[1px] border-[#2d333b] text-[#2d333b] rounded-[48px]">
                  All
                </div>
                <div className="py-2 px-4 w-[fit-content] border-[1px] border-[#2d333b] text-[#2d333b] rounded-[48px]">
                  Unread
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 mt-2">
                <div className="text-[#2d333b] text-[18px] font-bold">
                  Newest
                </div>
                <div
                  key={latestNotif?._id}
                  className="w-[100%] flex justify-start items-center gap-3"
                >
                  <div className="flex justify-center items-center w-[68px] h-[68px] rounded-[100px] bg-gradient-to-b from-[#c5d1de] to-[#22272e] border-[1px] text-[#ffffff] text-[24px] font-bold">
                    {latestNotif?.sender?.firstName?.slice(0, 1)}
                    {latestNotif?.sender?.surName?.slice(0, 1)}
                  </div>
                  <div className="w-[75%] flex flex-col items-start justify-center gap-1 text-[#2d333b]">
                    <div>{latestNotif?.message}</div>
                    {elapsedTime < 60 ? (
                      <div>{elapsedTime}m</div>
                    ) : (
                      <div>An hour ago</div>
                    )}
                  </div>
                </div>
              </div>
              <div
                className={`flex flex-col items-start gap-4 mt-2 ${
                  notifications && notifications?.length >= 4
                    ? "overflow-y-auto h-[282px]"
                    : ""
                }`}
              >
                <div className="text-[#2d333b] text-[18px] font-bold">
                  Earlier
                </div>
                {pastNotifs
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((n) => {
                    const now = new Date();
                    const createdAt = new Date(n?.createdAt);
                    const elapsedTime = Math.floor((now - createdAt) / 60000);

                    return (
                      <div
                        key={n?._id}
                        className="w-[100%] flex justify-start items-center gap-3"
                      >
                        <div className="flex justify-center items-center w-[68px] h-[68px] rounded-[100px] bg-gradient-to-b from-[#c5d1de] to-[#22272e] border-[1px] text-[#ffffff] text-[24px] font-bold">
                          {n?.sender?.firstName?.slice(0, 1)}
                          {n?.sender?.surName?.slice(0, 1)}
                        </div>
                        <div className="w-[75%] flex flex-col items-start justify-center gap-1 text-[#2d333b]">
                          <div>{n?.message}</div>
                          {elapsedTime < 60 ? (
                            <div>{elapsedTime}m</div>
                          ) : (
                            <div>An hour ago</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </>
        )}

        <div className="relative">
          {indicator === true ? (
            <div className="absolute top-[-6px] left-[12px] w-[16px] h-[16px] rounded-[50%] bg-[#ff3131]"></div>
          ) : null}

          {isNotifOpen === false ? (
            <FaRegBell
              onClick={handleGetRealTimeNotifClick}
              className="text-[22px] text-[white] cursor-pointer"
            />
          ) : (
            <FaBell
              onClick={() => setIsNotifOpen(false)}
              className="text-[22px] text-[white] cursor-pointer"
            />
          )}
        </div>
      </div>
    </>
  );
}

export default NotificationBell;
