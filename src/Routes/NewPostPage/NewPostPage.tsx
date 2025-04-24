import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/UploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { useToastStore } from "../../lib/useToastStore";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const { setToast } = useToastStore();

  const [error, setError] = useState("");
  const [descError, setDescError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const rawInputs = Object.fromEntries(formData.entries());

    const postData = {
      title: rawInputs.title?.toString().trim(),
      price: parseFloat(rawInputs.price as string),
      address: rawInputs.address?.toString().trim(),
      city: rawInputs.city?.toString().trim(),
      bedroom: parseInt(rawInputs.bedroom as string),
      bathroom: parseInt(rawInputs.bathroom as string),
      type: rawInputs.type?.toString().trim(),
      property: rawInputs.property?.toString().trim(),
      latitude: parseFloat(rawInputs.latitude as string),
      longitude: parseFloat(rawInputs.longitude as string),
      images: images,
    };

    const div = document.createElement("div");
    div.innerHTML = value;
    const processedValue = (div.textContent || div.innerText || "").trim();

    if (processedValue.length > 1000) {
      setDescError("Description cannot exceed 1000 characters.");
      return;
    } else {
      setDescError("");
    }

    const postDetail = {
      desc: processedValue,
      utilities: rawInputs.utilities?.toString().trim(),
      pet: rawInputs.pet?.toString().trim(),
      income: rawInputs.income?.toString().trim(),
      size: isNaN(parseInt(rawInputs.size as string))
        ? undefined
        : parseInt(rawInputs.size as string),
      school: isNaN(parseInt(rawInputs.school as string))
        ? undefined
        : parseInt(rawInputs.school as string),
      bus: isNaN(parseInt(rawInputs.bus as string))
        ? undefined
        : parseInt(rawInputs.bus as string),
      restaurant: isNaN(parseInt(rawInputs.restaurant as string))
        ? undefined
        : parseInt(rawInputs.restaurant as string),
      propertyStatus: rawInputs.propertyStatus?.toString().trim(),
    };

    try {
      console.log("Submitting payload:", { postData, postDetail });

      const res = await apiRequest.post("/posts/create-property", {
        ...postData,
        postDetail,
      });

      setToast({
        message: "Your post is under review. You’ll be notified if rejected.",
        type: "success",
      });

      //   navigate("/" + res.data.id);
      navigate("/profile");
    } catch (err: any) {
      console.error(err);
      console.log(err.response?.data);
      setError("Failed to submit post. Please try again.");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Post</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input
                id="price"
                name="price"
                type="number"
                min="1"
                max="5000000"
              />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
              {descError && <span className="error">{descError}</span>}
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedroom Number</label>
              <input min={0} id="bedroom" name="bedroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathroom Number</label>
              <input min={0} id="bathroom" name="bathroom" type="number" />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select name="type">
                <option value="rent" defaultChecked>
                  Rent
                </option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="type">Property</label>
              <select name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>

                <option value="land">Land</option>
              </select>
            </div>

            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select name="pet">
                <option value="allowed">Allowed</option>
                <option value="not allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input
                id="income"
                name="income"
                type="text"
                placeholder="Income Policy"
              />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input min={0} id="size" name="size" type="number" />
            </div>
            <div className="item">
              <label htmlFor="school">School nearby(in meter)</label>
              <input min={0} id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus station nearby(in meter)</label>
              <input min={0} id="bus" name="bus" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurants nearby(in meter)</label>
              <input min={0} id="restaurant" name="restaurant" type="number" />
            </div>

            <div className="item">
              <label htmlFor="propertyStatus">Property Status</label>
              <select name="propertyStatus">
                <option value="Available">Available</option>
                <option value="Booked">Booked</option>
                <option value="SoldOut">Sold Out</option>
              </select>
            </div>

            <button className="sendButton">Add</button>
            {error && <span>error</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "lamadev",
            uploadPreset: "estate",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
