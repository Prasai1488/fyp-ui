import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminPosts.scss";
import { useToastStore } from "../../lib/useToastStore";

interface User {
  id: string;
  username: string;
}

interface Testimonial {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
}

interface ApiResponse {
  testimonials: Testimonial[];
  currentPage: number;
  totalPages: number;
}

const AdminGetTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { setToast } = useToastStore();

  const fetchApprovedTestimonials = async (page: number) => {
    setLoading(true);
    try {
      const res = await apiRequest.get<ApiResponse>(`/testimonials/get-approved-testimonials?page=${page}&limit=5`);
      setTestimonials(res.data.testimonials);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      setError("Failed to fetch approved testimonials.");
      setToast({ message: "Error fetching approved testimonials.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovedTestimonials(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="adminPosts">
      <h1>All Approved Testimonials</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : testimonials.length === 0 ? (
        <p>No approved testimonials found.</p>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Comment</th>
                <th>Rating</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((t) => (
                <tr key={t.id}>
                  <td>{t.user.username}</td>
                  <td>{t.comment}</td>
                  <td>{t.rating} out of 5</td>
                  <td>{new Date(t.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminGetTestimonials;
