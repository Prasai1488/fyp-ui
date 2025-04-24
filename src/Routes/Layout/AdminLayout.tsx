import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";
import "./adminLayout.scss";
import Toast from "../../components/Notification/Toast";

const AdminLayout = () => {
  return (
    <div className="adminLayout">
      <AdminSidebar />
      <Toast />
      <main className="adminMain">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
