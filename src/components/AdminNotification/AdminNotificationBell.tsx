// import { FaBell } from "react-icons/fa";
// import { useEffect, useState } from "react";
// import { useAdminNotificationStore } from "../../lib/adminNotificationStore";
// import "./adminNotification.scss";
// import apiRequest from "../../lib/apiRequest";
// import { Link } from "react-router-dom";

// const AdminNotificationBell = () => {
//   const [open, setOpen] = useState(false);
//   const { notifications, unreadCount, fetch, markAsRead } =
//     useAdminNotificationStore();

//   useEffect(() => {
//     fetch(); // fetch on mount
//   }, [fetch]);

//   const handleClick = async (id: string) => {
//     try {
//       await apiRequest.patch(`/admin/notifications/${id}/read`);
//       markAsRead(id);
//       setOpen(false);
//     } catch (err) {
//       console.error("Failed to mark notification as read", err);
//     }
//   };

//   return (
//     <div className="adminNotification">
//       <div className="bell" onClick={() => setOpen(!open)}>
//         <FaBell />
//         {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
//       </div>
//       {open && (
//         <div className="dropdown">
//           {notifications.length === 0 ? (
//             <p>No notifications</p>
//           ) : (
//             notifications.slice(0, 5).map((n) => (
//               <Link
//                 to={
//                   n.type === "POST"
//                     ? `/admin/pending-posts`
//                     : n.type === "TESTIMONIAL"
//                     ? `/admin/pending-testimonials`
//                     : "#"
//                 }
//                 key={n.id}
//                 className={n.read ? "read" : "unread"}
//                 onClick={() => handleClick(n.id)}
//               >
//                 <strong>{n.title}</strong>
//                 <span>{n.message}</span>
//               </Link>
//             ))
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdminNotificationBell;

import { FaBell } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useAdminNotificationStore } from "../../lib/adminNotificationStore";
import "./adminNotification.scss";
import apiRequest from "../../lib/apiRequest";
import { Link } from "react-router-dom";

const AdminNotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { notifications, unreadCount, fetch, markAsRead } =
    useAdminNotificationStore();

  useEffect(() => {
    fetch(); // fetch on mount
  }, [fetch]);

  const handleClick = async (id: string) => {
    try {
      await apiRequest.patch(`/admin/notifications/${id}/read`);
      markAsRead(id);
      setOpen(false);
    } catch (err) {
      console.error("Failed to mark notification as read", err);
    }
  };

  return (
    <div className="adminNotification">
      <div className="bell" onClick={() => setOpen(!open)}>
        <FaBell />
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </div>
      {open && (
        <div className="dropdown">
          {notifications.filter((n) => !n.read).length === 0 ? (
            <p>No new notifications</p>
          ) : (
            notifications
              .filter((n) => !n.read)
              .slice(0, 5)
              .map((n) => (
                <Link
                  to={
                    n.type === "POST"
                      ? "/admin/pending-posts"
                      : n.type === "TESTIMONIAL"
                      ? "/admin/pending-testimonials"
                      : "#"
                  }
                  key={n.id}
                  className="unread"
                  onClick={() => handleClick(n.id)}
                >
                  <strong>{n.title}</strong>
                  <span>{n.message}</span>
                </Link>
              ))
          )}
        </div>
      )}
    </div>
  );
};

export default AdminNotificationBell;
