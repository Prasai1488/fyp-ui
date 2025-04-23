import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostItem } from "../../types/PropertyTypes";

interface CardProps {
  item: PostItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const currentUser = auth?.user;

  const handleEdit = () => {
    navigate(`/edit/${item.id}`);
  };

  const handleDelete = async () => {
    try {
      await apiRequest.delete(`/posts/${item.id}`);
      window.location.reload();
    } catch (err) {
      console.error("Failed to delete post", err);
    }
  };

  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images[0]} alt="Post thumbnail" />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location" />
          <span>{item.address}</span>
        </p>
        <p className="price">Rs. {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/size.png" alt="Size" />
              <span>
                {item.postDetail?.size ? `${item.postDetail.size} sqft` : "Size not available"}
              </span>
            </div>
            <div className="feature">
              <img src="/status.png" alt="Status" />
              <span>{item.postDetail?.propertyStatus || "Status not available"}</span>
            </div>
          </div>
          <div className="icons">
            {currentUser && currentUser.id === item.userId && (
              <>
                <button className="icon" onClick={handleEdit}>
                  <img
                    src="https://cdn3.iconfinder.com/data/icons/feather-5/24/edit-512.png"
                    alt="Edit"
                  />
                </button>
                <button className="icon" onClick={handleDelete}>
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvQ8KY2jPdcbKF3O-3yLkr452rUd4TN8Uaxg&s"
                    alt="Delete"
                  />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;


