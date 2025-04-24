import React, { useState, useContext, FormEvent } from "react";
import apiRequest from "../../lib/apiRequest";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./addTestimonials.scss";
import { useToastStore } from "../../lib/useToastStore";

const AddTestimonial: React.FC = () => {
  const { user: currentUser } = useContext(AuthContext)!;
  const { setToast } = useToastStore();
  const [rating, setRating] = useState<number>(1);
  const [comment, setComment] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!currentUser) {
      setToast({
        message: "You must be logged in to submit a testimonial.",
        type: "error",
      });
      return;
    }

    try {
      await apiRequest.post("/testimonials/add", {
        rating,
        comment,
        userId: currentUser.id,
      });

      setToast({
        message:
          "Your feedback is under review by the admin team. Keep an eye on your email.",
        type: "success",
      });

      navigate("/testimonials");
    } catch (err: any) {
      const errMsg = err?.response?.data?.message;

      if (errMsg === "You have already submitted a testimonial") {
        setToast({
          message: "You can only post one testimonial.",
          type: "error",
        });
      } else {
        setToast({
          message:
            errMsg || "Something went wrong while submitting your testimonial.",
          type: "error",
        });
      }
    }
  };

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  return (
    <div className="add-testimonial">
      <h1>Add Testimonial</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Rating:
          <div className="star-rating">
            {[...Array(5)].map((_, index) => {
              const starIndex = index + 1;
              return (
                <button
                  type="button"
                  key={starIndex}
                  className={starIndex <= rating ? "on" : "off"}
                  onClick={() => handleRating(starIndex)}
                >
                  <FaStar className="star" />
                </button>
              );
            })}
          </div>
        </label>
        <label>
          Comment:
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTestimonial;
