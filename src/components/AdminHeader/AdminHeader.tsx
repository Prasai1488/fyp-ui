import { FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminNotificationBell from "../AdminNotification/AdminNotificationBell";
import "./adminHeader.scss";

const AdminHeader = () => {
  return (
    <div className="adminHeader">
      <h1 className="adminTitle">GorkhaHomes Admin</h1>
      <div className="adminHeaderRight">
        <AdminNotificationBell />
        <Link to="/admin/profile" className="profileIcon">
          <FaUserCircle />
        </Link>
      </div>
    </div>
  );
};

export default AdminHeader;
