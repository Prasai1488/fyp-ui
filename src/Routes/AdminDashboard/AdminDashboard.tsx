import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./adminDashboard.scss";

interface AdminStats {
  totalUsers: number;
  activeUsers: number;
  newUsersThisWeek: number;
  totalPosts: number;
  approvedPosts: number;
  pendingPosts: number;
  rejectedPosts: number;
  postsThisMonth: number;
  popularCities: { city: string; count: number }[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await apiRequest.get("/admin/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to load admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="adminDashboard">Loading dashboard...</div>;

  return (
    <div className="adminDashboard">
      <div className="dashboardHeader">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="cardsContainer">
        <div className="card">
          <div className="icon">👤</div>
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="card">
          <div className="icon">🟢</div>
          <h2>{stats.activeUsers}</h2>
          <p>Active Users</p>
        </div>
        <div className="card">
          <div className="icon">📝</div>
          <h2>{stats.totalPosts}</h2>
          <p>Total Posts</p>
        </div>
        <div className="card">
          <div className="icon">✅</div>
          <h2>{stats.approvedPosts}</h2>
          <p>Approved</p>
        </div>
        <div className="card">
          <div className="icon">⏳</div>
          <h2>{stats.pendingPosts}</h2>
          <p>Pending</p>
        </div>
        <div className="card">
          <div className="icon">❌</div>
          <h2>{stats.rejectedPosts}</h2>
          <p>Rejected</p>
        </div>
        <div className="card">
          <div className="icon">📅</div>
          <h2>{stats.postsThisMonth}</h2>
          <p>Posts This Month</p>
        </div>
        <div className="card">
          <div className="icon">🆕</div>
          <h2>{stats.newUsersThisWeek}</h2>
          <p>New Users This Week</p>
        </div>
      </div>

      <div className="chartSection">
        <h2>Top 5 Cities by Posts</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={stats.popularCities}>
            <XAxis dataKey="city" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" fill="#5D5FEF" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdminDashboard;
