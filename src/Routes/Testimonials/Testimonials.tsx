import React, { useEffect, useState, useContext } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { FaStar, FaTrashAlt } from "react-icons/fa";
import "./testimonials.scss";

type User = {
  id: string;
  username: string;
};

type Testimonial = {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
};

type ApiResponse = {
  testimonials: Testimonial[];
  currentPage: number;
  totalPages: number;
};

const Testimonials: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext)!;
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchTestimonials = async (page: number) => {
    try {
      const res = await apiRequest.get<ApiResponse>(
        `/testimonials/get-approved-testimonials?page=${page}&limit=5`
      );
      setTestimonials(res.data.testimonials);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTestimonials(currentPage);
  }, [currentPage]);

  const handleDelete = async (testimonialId: string) => {
    try {
      await apiRequest.delete(
        `/testimonials/delete-testimonials/${testimonialId}`
      );
      setTestimonials(
        testimonials.filter((testimonial) => testimonial.id !== testimonialId)
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="testimonials">
      <h1>Testimonials</h1>
      <p className="subtitle">
        Hear what our users have to say about <strong>GorkhaHomes</strong>.
      </p>

      {currentUser && (
        <Link to="/add-testimonial" className="add-review">
          Add Review
        </Link>
      )}
      <div className="testimonial-list">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-item">
            <div className="testimonial-header">
              <p>
                <strong>Rating:</strong>
              </p>
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const starNumber = index + 1;
                  return (
                    <FaStar
                      key={index}
                      className={
                        starNumber <= testimonial.rating ? "on" : "off"
                      }
                    />
                  );
                })}
              </div>
            </div>
            <p>
              <strong>Comment:</strong> {testimonial.comment}
            </p>
            <p>
              <strong>From:</strong> {testimonial.user.username}
            </p>
            <p>
              <strong>Created at:</strong>{" "}
              {new Date(testimonial.createdAt).toLocaleDateString()}
            </p>
            {currentUser && currentUser.id === testimonial.user.id && (
              <FaTrashAlt
                className="delete-icon"
                onClick={() => handleDelete(testimonial.id)}
              />
            )}
          </div>
        ))}
      </div>
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
