import "./layout.scss";
import Navbar from "../../components/Navbar/Navbar";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Toast from "../../components/Notification/Toast";
import ConfirmDialog from "../../components/ConfirmDialog/ConfirmDialog"; // ✅ import here

function Layout() {
  return (
    <div className="layout">
      <div className="navbar">
        <Navbar />
      </div>
      <Toast />
      <ConfirmDialog /> {/* ✅ globally available */}
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
        <Toast />
        <ConfirmDialog /> {/* ✅ include here as well */}
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
  }
}

export { Layout, RequireAuth };
