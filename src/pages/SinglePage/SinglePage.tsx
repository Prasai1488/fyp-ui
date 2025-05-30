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

  const formatDistance = (distance: number | string | undefined): string => {
    if (!distance) return "N/A";
    const dist = typeof distance === "string" ? parseInt(distance) : distance;
    return dist > 999 ? `${(dist / 1000).toFixed(1)}km` : `${dist}m`;
  };

  const isLandProperty = post.property?.toLowerCase() === "land";

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
                  alt="User avatar"
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
            {post.postDetail?.propertyCode && (
              <div className="feature">
                <img src="/icons/code.png" alt="Property Code" />
                <div className="featureText">
                  <span>Property Code</span>
                  <p>{post.postDetail.propertyCode}</p>
                </div>
              </div>
            )}
            {post.postDetail?.plotNumber && (
              <div className="feature">
                <img src="/icons/plot.png" alt="Plot Number" />
                <div className="featureText">
                  <span>Plot Number</span>
                  <p>{post.postDetail.plotNumber}</p>
                </div>
              </div>
            )}
            {post.postDetail?.collection && (
              <div className="feature">
                <img src="/icons/collection.png" alt="Collection" />
                <div className="featureText">
                  <span>Collection</span>
                  <p>{post.postDetail.collection}</p>
                </div>
              </div>
            )}
          </div>

          <p className="title">Property Specifications</p>
          <div className="listVertical">
            {post.postDetail?.totalArea && (
              <div className="feature">
                <img src="/icons/area.png" alt="Total Area" />
                <div className="featureText">
                  <span>Total Area</span>
                  <p>{post.postDetail.totalArea} sqft</p>
                </div>
              </div>
            )}
            {post.postDetail?.buildUpArea && !isLandProperty && (
              <div className="feature">
                <img src="/icons/buildup.png" alt="Built-up Area" />
                <div className="featureText">
                  <span>Built-up Area</span>
                  <p>{post.postDetail.buildUpArea} sqft</p>
                </div>
              </div>
            )}
            {post.postDetail?.dimension && (
              <div className="feature">
                <img src="/icons/dimension.png" alt="Dimension" />
                <div className="featureText">
                  <span>Dimension</span>
                  <p>{post.postDetail.dimension}</p>
                </div>
              </div>
            )}
            {post.postDetail?.roadType && (
              <div className="feature">
                <img src="/icons/road.png" alt="Road Type" />
                <div className="featureText">
                  <span>Road Type</span>
                  <p>{post.postDetail.roadType}</p>
                </div>
              </div>
            )}
            {post.postDetail?.propertyFace && (
              <div className="feature">
                <img src="/icons/face.png" alt="Property Face" />
                <div className="featureText">
                  <span>Property Face</span>
                  <p>{post.postDetail.propertyFace}</p>
                </div>
              </div>
            )}
            {post.postDetail?.roadAccess && (
              <div className="feature">
                <img src="/icons/road-access.png" alt="Road Access" />
                <div className="featureText">
                  <span>Road Access</span>
                  <p>{post.postDetail.roadAccess} feet</p>
                </div>
              </div>
            )}
            {post.postDetail?.builtYear && !isLandProperty && (
              <div className="feature">
                <img src="/icons/year.png" alt="Built Year" />
                <div className="featureText">
                  <span>Built Year</span>
                  <p>{post.postDetail.builtYear}</p>
                </div>
              </div>
            )}
            {post.postDetail?.totalFloors && !isLandProperty && (
              <div className="feature">
                <img src="/icons/floors.png" alt="Total Floors" />
                <div className="featureText">
                  <span>Total Floors</span>
                  <p>{post.postDetail.totalFloors}</p>
                </div>
              </div>
            )}
          </div>

          <p className="title">Sizes</p>
          <div className="sizes">
            <div className="size">
              <img src="../../../public copy/size.png" alt="" />
              <span>{post.postDetail?.size} sqft</span>
            </div>
            {!isLandProperty && (
              <>
                <div className="size">
                  <img src="../../../public copy/bed.png" alt="" />
                  <span>{post.bedroom} beds</span>
                </div>
                <div className="size">
                  <img src="../../../public copy/bath.png" alt="" />
                  <span>{post.bathroom} bathroom</span>
                </div>
              </>
            )}
          </div>

          {!isLandProperty && (
            <>
              <p className="title">Property Features</p>
              <div className="listVertical">
                {post.postDetail?.kitchen && (
                  <div className="feature">
                    <img src="/icons/kitchen.png" alt="Kitchen" />
                    <div className="featureText">
                      <span>Kitchens</span>
                      <p>{post.postDetail.kitchen}</p>
                    </div>
                  </div>
                )}
                {post.postDetail?.livingRoom && (
                  <div className="feature">
                    <img src="/icons/livingroom.png" alt="Living Room" />
                    <div className="featureText">
                      <span>Living Rooms</span>
                      <p>{post.postDetail.livingRoom}</p>
                    </div>
                  </div>
                )}
                {post.postDetail?.parking && (
                  <div className="feature">
                    <img src="/icons/parking.png" alt="Parking" />
                    <div className="featureText">
                      <span>Parking Spaces</span>
                      <p>{post.postDetail.parking}</p>
                    </div>
                  </div>
                )}
                {post.postDetail?.furnishing && (
                  <div className="feature">
                    <img src="/icons/furnishing.png" alt="Furnishing" />
                    <div className="featureText">
                      <span>Furnishing</span>
                      <p>{post.postDetail.furnishing}</p>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {post.postDetail?.amenities &&
            post.postDetail.amenities.length > 0 && (
              <>
                <p className="title">Amenities</p>
                <div className="listVertical">
                  {post.postDetail.amenities.map((amenity, index) => (
                    <div key={index} className="feature">
                      <img src="/icons/amenity.png" alt="Amenity" />
                      <div className="featureText">
                        <span>{amenity}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

          <p className="title">Nearby Places</p>
          {/* <div className="listHorizontal">
            <div className="feature">
              <img src="../../../public copy/school.png" alt="" />
              <div className="featureText">
                <span>School</span>
                <p>{formatDistance(post.postDetail?.school)} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="../../../public copy/pet.png" alt="" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{formatDistance(post.postDetail?.bus)} away</p>
              </div>
            </div>
            <div className="feature">
              <img src="../../../public copy/fee.png" alt="" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{formatDistance(post.postDetail?.restaurant)} away</p>
              </div>
            </div>
          </div> */}

          {/* Additional Nearby Places */}
          <div className="listVertical">
            {post.postDetail?.hospital && (
              <div className="feature">
                <img src="/icons/hospital.png" alt="Hospital" />
                <div className="featureText">
                  <span>Hospital</span>
                  <p>{formatDistance(post.postDetail.hospital)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.airport && (
              <div className="feature">
                <img src="/icons/airport.png" alt="Airport" />
                <div className="featureText">
                  <span>Airport</span>
                  <p>{formatDistance(post.postDetail.airport)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.pharmacy && (
              <div className="feature">
                <img src="/icons/pharmacy.png" alt="Pharmacy" />
                <div className="featureText">
                  <span>Pharmacy</span>
                  <p>{formatDistance(post.postDetail.pharmacy)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.bhatbhateni && (
              <div className="feature">
                <img src="/icons/bhatbhateni.png" alt="Bhatbhateni" />
                <div className="featureText">
                  <span>Bhatbhateni</span>
                  <p>{formatDistance(post.postDetail.bhatbhateni)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.college && (
              <div className="feature">
                <img src="/icons/college.png" alt="College" />
                <div className="featureText">
                  <span>College</span>
                  <p>{formatDistance(post.postDetail.college)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.gym && (
              <div className="feature">
                <img src="/icons/gym.png" alt="Gym" />
                <div className="featureText">
                  <span>Gym</span>
                  <p>{formatDistance(post.postDetail.gym)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.publicTransport && (
              <div className="feature">
                <img src="/icons/transport.png" alt="Public Transport" />
                <div className="featureText">
                  <span>Public Transport</span>
                  <p>{formatDistance(post.postDetail.publicTransport)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.policeStation && (
              <div className="feature">
                <img src="/icons/police.png" alt="Police Station" />
                <div className="featureText">
                  <span>Police Station</span>
                  <p>{formatDistance(post.postDetail.policeStation)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.pashupatinath && (
              <div className="feature">
                <img src="/icons/temple.png" alt="Pashupatinath" />
                <div className="featureText">
                  <span>Pashupatinath</span>
                  <p>{formatDistance(post.postDetail.pashupatinath)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.boudhanath && (
              <div className="feature">
                <img src="/icons/stupa.png" alt="Boudhanath" />
                <div className="featureText">
                  <span>Boudhanath</span>
                  <p>{formatDistance(post.postDetail.boudhanath)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.atm && (
              <div className="feature">
                <img src="/icons/atm.png" alt="ATM" />
                <div className="featureText">
                  <span>ATM</span>
                  <p>{formatDistance(post.postDetail.atm)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.hotel && (
              <div className="feature">
                <img src="/icons/hotel.png" alt="Hotel" />
                <div className="featureText">
                  <span>Hotel</span>
                  <p>{formatDistance(post.postDetail.hotel)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.nearbyRestaurant && (
              <div className="feature">
                <img src="/icons/restaurant.png" alt="Nearby Restaurant" />
                <div className="featureText">
                  <span>Nearby Restaurant</span>
                  <p>{formatDistance(post.postDetail.nearbyRestaurant)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.banquet && (
              <div className="feature">
                <img src="/icons/banquet.png" alt="Banquet" />
                <div className="featureText">
                  <span>Banquet</span>
                  <p>{formatDistance(post.postDetail.banquet)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.wardOffice && (
              <div className="feature">
                <img src="/icons/office.png" alt="Ward Office" />
                <div className="featureText">
                  <span>Ward Office</span>
                  <p>{formatDistance(post.postDetail.wardOffice)} away</p>
                </div>
              </div>
            )}
            {post.postDetail?.ringRoad && (
              <div className="feature">
                <img src="/icons/ringroad.png" alt="Ring Road" />
                <div className="featureText">
                  <span>Ring Road</span>
                  <p>{formatDistance(post.postDetail.ringRoad)} away</p>
                </div>
              </div>
            )}
          </div>

          {post.postDetail?.landmark && (
            <>
              <p className="title">Landmark</p>
              <div className="feature">
                <img src="/icons/landmark.png" alt="Landmark" />
                <div className="featureText">
                  <span>Nearby Landmark</span>
                  <p>{post.postDetail.landmark}</p>
                </div>
              </div>
            </>
          )}

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
