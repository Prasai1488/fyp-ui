import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminPosts.scss";
import { useToastStore } from "../../lib/useToastStore";

interface PendingTestimonial {
  id: string;
  rating: number;
  comment: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

const AdminPendingTestimonials = () => {
 

  const [testimonials, setTestimonials] = useState<PendingTestimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setToast } = useToastStore();

  const fetchPendingTestimonials = async () => {
    setLoading(true);
    try {
      const res = await apiRequest.get("/admin/testimonials?status=PENDING");
      setTestimonials(res.data.data);
    } catch (err) {
      setError("Failed to fetch pending testimonials.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingTestimonials();
  }, []);

  const handleApprove = async (testimonialId: string) => {
    try {
      await apiRequest.patch(`/admin/approve-testimonial/${testimonialId}`);
      setToast({
        message: "Testimonial approved successfully.",
        type: "success",
      });
      fetchPendingTestimonials();
    } catch (err) {
      setToast({ message: "Failed to approve testimonial.", type: "error" });
    }
  };

  const handleReject = async (testimonialId: string) => {
    try {
      await apiRequest.patch(`/admin/reject-testimonial/${testimonialId}`);
      setToast({ message: "Testimonial rejected successfully.", type: "info" });
      fetchPendingTestimonials();
    } catch (err) {
      setToast({ message: "Failed to reject testimonial.", type: "error" });
    }
  };

  return (
    <div className="adminPosts">
      <h1>Pending Testimonials</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : testimonials.length === 0 ? (
        <p>No pending testimonials.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Comment</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.map((t) => (
              <tr key={t.id}>
                <td>{t.user?.username}</td>
                <td>{t.comment}</td>
                <td>{t.rating}</td>
                <td>{t.status}</td>
                <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                <td className="pendingActions">
                  <button
                    className="approve"
                    onClick={() => handleApprove(t.id)}
                  >
                    Approve
                  </button>
                  <button className="reject" onClick={() => handleReject(t.id)}>
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPendingTestimonials;
