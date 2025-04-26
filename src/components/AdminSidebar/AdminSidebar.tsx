import { NavLink, useNavigate } from "react-router-dom";
import "./adminSidebar.scss";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardCheck,
  FaBan,
  FaEdit,
  FaSignOutAlt,
  FaClock,
  FaQuoteRight,
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
      <div className="sidebarHeader">
        <h2>Admin Panel</h2>
      </div>
      <nav className="sidebarNav">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaTachometerAlt />
          </div>
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaUsers />
          </div>
          <span>Users</span>
        </NavLink>
        <NavLink
          to="/admin/posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaClipboardCheck />
          </div>
          <span>All Posts</span>
        </NavLink>
        <NavLink
          to="/admin/pending-posts"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaClock />
          </div>
          <span>Pending Posts</span>
        </NavLink>

        <div className="sidebarDivider"></div>

        <NavLink
          to="/admin/pending-testimonials"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaEdit />
          </div>
          <span>Pending Testimonials</span>
        </NavLink>
        <NavLink
          to="/admin/testimonials"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaQuoteRight />
          </div>
          <span>All Testimonials</span>
        </NavLink>

        <div className="sidebarDivider"></div>

        <NavLink
          to="/admin/suspended"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="iconWrapper">
            <FaBan />
          </div>
          <span>Suspended Users</span>
        </NavLink>
      </nav>

      <div className="sidebarFooter">
        <button onClick={handleLogout} className="logoutBtn">
          <div className="iconWrapper">
            <FaSignOutAlt />
          </div>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
