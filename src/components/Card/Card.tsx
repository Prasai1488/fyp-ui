import { Link, useNavigate } from "react-router-dom";
import "./card.scss";
import apiRequest from "../../lib/apiRequest";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { PostItem } from "../../types/PropertyTypes";
import { useConfirmDialogStore } from "../../lib/useConfirmDialogStore";
import { useToastStore } from "../../lib/useToastStore";

interface CardProps {
  item: PostItem;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const navigate = useNavigate();
  const auth = useContext(AuthContext);
  const { openDialog } = useConfirmDialogStore();
  const { setToast } = useToastStore();
  const currentUser = auth?.user;

  const handleEdit = () => {
    navigate(`/edit/${item.id}`);
  };

  const handleDelete = () => {
    openDialog(
      "Delete Post",
      "Are you sure you want to delete this post? This action cannot be undone.",
      async () => {
        try {
          await apiRequest.delete(`/posts/delete/${item.id}`);
          setToast({
            message: "Property deleted successfully!",
            type: "success",
          });
          window.location.reload();
        } catch (err) {
          console.error("Failed to delete post", err);
          setToast({ message: "Failed to delete post.", type: "error" });
        }
      }
    );
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
          <img src="../../../public copy/pin.png" alt="Location" />
          <span>{item.address}</span>
        </p>
        <p className="price">Rs. {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="../../../public copy/size.png" alt="Size" />
              <span>
                {item.postDetail?.size
                  ? `${item.postDetail.size} sqft`
                  : "Size not available"}
              </span>
            </div>
            <div className="feature">
              <img src="../../../public copy/status.png" alt="Status" />
              <span>
                {item.postDetail?.propertyStatus || "Status not available"}
              </span>
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
