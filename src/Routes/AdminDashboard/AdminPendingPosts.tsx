import { useEffect, useState } from "react";
import apiRequest from "../../lib/apiRequest";
import "./adminPosts.scss";
import { useToastStore } from "../../lib/useToastStore";
import { PostItem } from "../../types/PropertyTypes"; // adjust path if needed

const AdminPendingPosts = () => {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [showModal, setShowModal] = useState(false);

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
      setShowModal(false);
    } catch (err) {
      setToast({ message: "Failed to approve post.", type: "error" });
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await apiRequest.patch(`/admin/reject-post/${postId}`);
      setToast({ message: "Post rejected successfully.", type: "info" });
      fetchPendingPosts();
      setShowModal(false);
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
                  <button
                    onClick={() => {
                      setSelectedPost(post);
                      setShowModal(true);
                    }}
                  >
                    View
                  </button>
                  <button
                    className="approve"
                    onClick={() => handleApprove(post.id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject"
                    onClick={() => handleReject(post.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      {showModal && selectedPost && (
        <div className="modalOverlay" onClick={() => setShowModal(false)}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedPost.title}</h2>
            <p>
              <strong>Price:</strong> Rs.{selectedPost.price}
            </p>
            <p>
              <strong>Address:</strong> {selectedPost.address}
            </p>
            <p>
              <strong>City:</strong> {selectedPost.city}
            </p>
            <p>
              <strong>Type:</strong> {selectedPost.type}
            </p>
            <p>
              <strong>Property Type:</strong> {selectedPost.property}
            </p>
            <p>
              <strong>Bedroom:</strong> {selectedPost.bedroom}
            </p>
            <p>
              <strong>Bathroom:</strong> {selectedPost.bathroom}
            </p>

            {/* Post Detail Part */}
            {selectedPost.postDetail && (
              <>
                <p>
                  <strong>Description:</strong> {selectedPost.postDetail.desc}
                </p>
                <p>
                  <strong>Utilities:</strong>{" "}
                  {selectedPost.postDetail.utilities}
                </p>
                <p>
                  <strong>Pet Allowed:</strong> {selectedPost.postDetail.pet}
                </p>
                <p>
                  <strong>Minimum Income:</strong>{" "}
                  {selectedPost.postDetail.income}
                </p>
                <p>
                  <strong>Nearby Schools:</strong>{" "}
                  {selectedPost.postDetail.school} m
                </p>
                <p>
                  <strong>Nearby Bus Stops:</strong>{" "}
                  {selectedPost.postDetail.bus} m
                </p>
                <p>
                  <strong>Nearby Restaurants:</strong>{" "}
                  {selectedPost.postDetail.restaurant} m
                </p>
                <p>
                  <strong>Property Status:</strong>{" "}
                  {selectedPost.postDetail.propertyStatus}
                </p>
              </>
            )}
            {/* Images */}
            {selectedPost.images && selectedPost.images.length > 0 && (
              <div className="imageGallery">
                {selectedPost.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={`Property Image ${index + 1}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "6px",
                      margin: "5px",
                    }}
                  />
                ))}
              </div>
            )}

            {/* User Info */}
            {selectedPost.user && (
              <>
                <p>
                  <strong>Posted by:</strong> {selectedPost.user.username}
                </p>
                {selectedPost.user.avatar && (
                  <img
                    src={selectedPost.user.avatar}
                    alt="User Avatar"
                    width="50"
                    height="50"
                  />
                )}
              </>
            )}

            <div className="modalActions">
              <button
                className="approve"
                onClick={() => handleApprove(selectedPost.id)}
              >
                Approve
              </button>
              <button
                className="reject"
                onClick={() => handleReject(selectedPost.id)}
              >
                Reject
              </button>
              <button className="close" onClick={() => setShowModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPendingPosts;
