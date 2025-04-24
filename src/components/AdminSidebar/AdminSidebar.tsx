import { NavLink, useNavigate } from "react-router-dom";
import "./adminSidebar.scss";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardCheck,
  FaBan,
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaClock,
} from "react-icons/fa";
import { useToastStore } from "../../lib/useToastStore";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

const AdminSidebar = () => {
  const { setToast } = useToastStore();
  const { updateUser } = useContext(AuthContext)!;
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      setToast({
        message: "You have been logged out successfully.",
        type: "info",
      });
      updateUser(null);
      setTimeout(() => navigate("/"), 300);
    } catch (err) {
      console.log(err);
      setToast({ message: "Logout failed. Please try again.", type: "error" });
    }
  };

  return (
    <div className="adminSidebar">
      <h2>Admin Panel</h2>
      <nav>
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaTachometerAlt /> Dashboard
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaUsers /> Users
        </NavLink>
        <NavLink
          to="/admin/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaClipboardCheck /> All Posts
        </NavLink>
        <NavLink
          to="/admin/pending-posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaClock /> Pending Posts
        </NavLink>
        <NavLink
          to="/admin/suspended"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <FaBan /> Suspended Users
        </NavLink>
        <button onClick={handleLogout} className="logoutBtn">
          <FaSignOutAlt /> Logout
        </button>
      </nav>
    </div>
  );
};

export default AdminSidebar;
