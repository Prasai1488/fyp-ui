import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminUsers.scss";

interface AdminUser {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  role: "USER" | "ADMIN";
  active: boolean;
  createdAt: string;
  _count: {
    posts: number;
  };
}

const AdminUsers = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await apiRequest.get(`/admin/users?page=${page}&limit=10`);
        setUsers(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [page]);

  return (
    <div className="adminUsers">
      <h1>All Users</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Posts</th>
              <th>Joined</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.avatar || "/noavatar.jpg"} alt="avatar" className="avatar" />
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.active ? "Active" : "Suspended"}</td>
                <td>{user._count.posts}</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
          Prev
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminUsers;
