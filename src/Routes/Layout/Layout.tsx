import "./layout.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Toast from "../../components/Notification/Toast";

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>

      {/* ✅ Global Toast Component */}
      <Toast />

      <div className="content">
        <Outlet />
      </div>
    </div>
  );
}
function RequireAuth() {
  const { user: currentUser } = useContext(AuthContext)!;

  if (!currentUser) return <Navigate to="/login" />;
  else {
    return (
      <div className="layout">
        <div className="navbar">
          <Navbar />
        </div>
        {/* ✅ Toast added for protected routes */}
        <Toast />
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
