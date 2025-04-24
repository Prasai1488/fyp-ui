import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminPosts.scss";
import { useToastStore } from "../../lib/useToastStore";

interface PendingPost {
  id: string;
  title: string;
  city: string;
  type: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const AdminPendingPosts = () => {
  const [posts, setPosts] = useState<PendingPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setToast } = useToastStore();

  const fetchPendingPosts = async () => {
    setLoading(true);
    try {
      const res = await apiRequest.get("/admin/posts?status=PENDING");
      setPosts(res.data.data);
    } catch (err) {
      setError("Failed to fetch pending posts.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingPosts();
  }, []);

  const handleApprove = async (postId: string) => {
    try {
      await apiRequest.patch(`/admin/approve-post/${postId}`);
      setToast({ message: "Post approved successfully.", type: "success" });
      fetchPendingPosts();
    } catch (err) {
      setToast({ message: "Failed to approve post.", type: "error" });
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await apiRequest.patch(`/admin/reject-post/${postId}`);
      setToast({ message: "Post rejected successfully.", type: "info" });
      fetchPendingPosts();
    } catch (err) {
      setToast({ message: "Failed to reject post.", type: "error" });
    }
  };

  return (
    <div className="adminPosts">
      <h1>Pending Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : posts.length === 0 ? (
        <p>No pending posts.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>User</th>
              <th>City</th>
              <th>Type</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.user?.username}</td>
                <td>{post.city}</td>
                <td>{post.type}</td>
                <td>{post.status}</td>
                <td>{new Date(post.createdAt).toLocaleDateString()}</td>
                <td className="pendingActions">
                  <button className="approve" onClick={() => handleApprove(post.id)}>Approve</button>
                  <button className="reject" onClick={() => handleReject(post.id)}>Reject</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPendingPosts;
