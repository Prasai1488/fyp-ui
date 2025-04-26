import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import AdminHeader from "../../components/AdminHeader/AdminHeader";
import "./adminLayout.scss";
import Toast from "../../components/Notification/Toast";

const AdminLayout = () => {
  return (
    <div className="adminLayout">
      <AdminSidebar />
      <div className="adminContent">
        <AdminHeader /> {/* ✅ Top bar added here */}
        <Toast />
        <main className="adminMain">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
