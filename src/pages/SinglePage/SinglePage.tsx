import "./singlePage.scss";
import Slider from "../../components/Slider/Slider";
import Map from "../../components/Map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";
import { PostItem } from "../../types/PropertyTypes";
import { useToastStore } from "../../lib/useToastStore";

const SinglePage: React.FC = () => {
  const post = useLoaderData() as PostItem;
  const [saved, setSaved] = useState<boolean>(post.isSaved ?? false);
  const { user: currentUser } = useContext(AuthContext)!;
  const { setToast } = useToastStore();

  const navigate = useNavigate();

  const handleSave = async () => {
    if (!currentUser) {
      setToast({
        message: "You need to login first to save this property.",
        type: "info",
      });
      return;
    }

    const newSavedState = !saved;
    setSaved(newSavedState);

    try {
      await apiRequest.post("/user/save", { postId: post.id });

      if (newSavedState) {
        setToast({
          message: "Property saved successfully!",
          type: "success",
        });
      }
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev); // revert on failure
      setToast({
        message: "Failed to save property. Please try again.",
        type: "error",
      });
    }
  };

  const handleMessage = async () => {
    if (!currentUser) {
      setToast({
        message: "Please login to send a message to the seller.",
        type: "info",
      });
      return;
    }

    const receiverId = post.user?.id;
    if (!receiverId) {
      console.error("Receiver ID is undefined", post);
      return;
    }

    try {
      await apiRequest.post("/chats", { receiverId });
      navigate("/profile");
    } catch (err) {
      console.error("Failed to send message", err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="../../../public copy/pin.png" alt="" />
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img
                  src={post.user?.avatar || "/noavatar.jpg"}
                  alt="USer avatar"
                />
                <span>{post.user?.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail?.desc || ""),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <img src="../../../public copy/utility.png" alt="" />
              <div className="featureText">
                <span>Utilities</span>
                {post.postDetail?.utilities === "owner" ? (
                  <p>Owner is responsible</p>
                ) : (
                  <p>Tenant is responsible</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="../../../public copy/pet.png" alt="" />
              <div className="featureText">
                <span>Pet Policy</span>
                {post.postDetail?.pet === "allowed" ? (
                  <p>Pets Allowed</p>
                ) : (
                  <p>Pets not Allowed</p>
                )}
              </div>
            </div>
            <div className="feature">
              <img src="../../../public copy/fee.png" alt="" />
              <div className="featureText">
                <span>Income Policy</span>
                <p>{post.postDetail?.income}</p>
              </div>
            </div>
            <div className="feature">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5u61Ich2-HvGRBe3hj043ILiPKh6HlmGrw&s"
                alt=""
              />

              <div className="featureText">
                <span>Property Status</span>
                <p>{post.postDetail?.propertyStatus}</p>
              </div>
            </div>
          </div>
          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="../../../public copy/size.png" alt="" />
              <span>{post.postDetail?.size} sqft</span>
            </div>
            <div className="size">
              <img src="../../../public copy/bed.png" alt="" />
              <span>{post.bedroom} beds</span>
            </div>
            <div className="size">
              <img src="../../../public copy/bath.png" alt="" />
              <span>{post.bathroom} bathroom</span>
            </div>
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="../../../public copy/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail?.school
                    ? post.postDetail.school > 999
                      ? post.postDetail.school / 1000 + "km"
                      : post.postDetail.school + "m"
                    : "N/A"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="../../../public copy/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>
                  {post.postDetail?.bus
                    ? `${post.postDetail.bus}m away`
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="../../../public copy/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>
                  {post.postDetail?.restaurant
                    ? `${post.postDetail.restaurant}m away`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
            <button onClick={handleMessage}>
              <img src="../../../public copy/chat.png" alt="" />
              Send a Message
            </button>
            <button
              onClick={handleSave}
              style={{
                backgroundColor: saved ? "#fece51" : "white",
              }}
            >
              <img src="../../../public copy/save.png" alt="" />
              {saved ? "Place Saved" : "Save the Place"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
