
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { SET_NOTIFICATIONS } from "../../redux/actionTypes";
import { loadUserNotifications } from "../../services/general";
import { Modal } from '../../components/Modal';

const Notifications = () => {
  const dispatch = useDispatch();
  const user = useSelector((store: any) => store.auth);
  const { notifications } = useSelector((store: any) => store.chat);

  const [openModal, setOpenModal] = useState(false);
  const [activeNotification, setActiveNotification] = useState<any>(null);

  const socket: any = useMemo(() => io("http://localhost:8080"), []);

  useEffect(() => {
    socket.emit("join_user", user._id);
    dispatch(loadUserNotifications(user._id));
  }, []);

  useEffect(() => {
    socket.on("receive_notification", (noti: any) => {
      if (user._id === noti.receiver) {
        dispatch({ type: SET_NOTIFICATIONS, payload: [...notifications, noti] });
      }
    });

    return () => {
      socket.off("receive_notification");
      socket.disconnect();
    };
  }, [notifications]);

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  };

  const openNotificationModal = (noti: any) => {
    setActiveNotification(noti);
    setOpenModal(true);
  };

  const handleMarkAsRead = async (id: string) => {
    console.log("Mark as Read triggered:", id); 
    setOpenModal(false);

    dispatch({
      type: SET_NOTIFICATIONS,
      payload: notifications.map(n => n._id === id ? { ...n, isRead: true } : n)
    });
  };

  const handleDeleteNotification = async (id: string) => {
    console.log("Delete Notification triggered:", id);
    setOpenModal(false);

    dispatch({
      type: SET_NOTIFICATIONS,
      payload: notifications.filter(n => n._id !== id)
    });
  };

  return (
    <>
      <div className="w-full h-full max-h-screen bg-[#0e0e0e] text-white p-4 rounded-xl flex flex-col">
        <h2 className="text-xl font-semibold mb-3 border-b border-gray-700 pb-2">
          Notifications
        </h2>

        <div className="flex-1 overflow-y-auto pr-1 space-y-3 no-scrollbar">

          {notifications.length === 0 && (
            <p className="text-gray-500 text-center pt-10">No notifications yet</p>
          )}

          {notifications.length > 0 &&
            notifications.map((item: any, index: number) => (
              <div
                key={index}
                onClick={() => openNotificationModal(item)}
                className="
                  bg-[#1a1a1a] p-3 rounded-lg 
                  flex justify-between items-start 
                  border border-gray-800 hover:bg-[#222] transition cursor-pointer
                "
              >
                <div className="flex flex-col gap-1 w-[85%]">
                  <p className="text-[15px] leading-tight">{item.message}</p>

                  <span className="text-[12px] text-gray-400">
                    {formatTime(item.createdAt)}
                  </span>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] px-2 py-1 bg-blue-600 rounded-full">
                    {item.type}
                  </span>

                  {!item.isRead && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                </div>
              </div>
            ))}
        </div>
      </div>

      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <div className="w-[350px] md:w-[420px] text-white">

          <h2 className="text-xl font-semibold text-center border-b pb-2 border-gray-700">
            Notification Details
          </h2>

          <div className="mt-4 space-y-3">
            <p className="text-[16px] leading-tight">{activeNotification?.message}</p>

            <span className="px-2 py-1 text-xs bg-blue-600 rounded-md">
              {activeNotification?.type}
            </span>

            <p className="text-gray-400 text-sm">
              📅 {new Date(activeNotification?.createdAt || "").toLocaleString()}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-3">
            {activeNotification?.link && (
              <button
                onClick={() => window.location.assign(activeNotification.link)}
                className="w-full bg-blue-600 hover:bg-blue-700 p-2 rounded-md cursor-pointer"
              >
                Open Related Page
              </button>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => handleMarkAsRead(activeNotification?._id)}
                className="flex-1 border p-2 rounded-md border-gray-700 hover:bg-gray-800 cursor-pointer"
              >
                Mark as Read
              </button>

              <button
                onClick={() => handleDeleteNotification(activeNotification?._id)}
                className="flex-1 bg-red-600 hover:bg-red-700 p-2 rounded-md cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Notifications;
